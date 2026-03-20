# Portflowio — QA Report & Shipping Project Plan

**Date:** 2026-03-20
**Stack:** MERN (MongoDB · Express · React 16 · Node.js) + Okta OAuth + Filestack + Heroku

---

## Executive Summary

Portflowio is a portfolio social network. The core CRUD loop (create account, post work, follow others, like posts) is mostly wired up, but several **blocking bugs**, **security vulnerabilities**, and **infinite-loop issues** must be resolved before this is safe to ship. The sections below triage everything found and turn it into a prioritised task list.

---

## Part 1 — QA Findings

### P0 — Blockers (must fix before any public launch)

| # | Location | Issue |
|---|----------|-------|
| P0-1 | `client/src/utils/API.js:3` | Socket.IO client **always connects to `http://localhost:8080`** in production. This causes a hard failure (failed WebSocket connect) that appears as a JS error in every browser session. Either wire up Socket.IO properly or remove the import entirely. |
| P0-2 | `client/src/pages/Home/Home.js:57–127` | **Two `componentDidUpdate` methods** are defined on the same class (lines 57 and 120). JavaScript silently drops the first one. The second fires `getAllPosts` on every render inside a `setTimeout` with no guard — creating an **infinite polling loop** that hammers the database. |
| P0-3 | `client/src/pages/Profile/Profile.js:42–49` | `componentDidUpdate` calls `getPostsById` on every render inside a `setTimeout` with no change-guard — same infinite loop as P0-2. |
| P0-4 | `client/src/App.js:18–22` | Okta `client_id`, `issuer`, and `redirect_uri` are **hardcoded in source** and committed to git. These must be moved to environment variables (`.env` / Heroku config vars). |
| P0-5 | `models/user.js:9` | `password` field stored in **plain text**. While Okta handles login, any password value sent and stored is unencrypted. Either remove the field or hash it with bcrypt. |
| P0-6 | `controllers/userController.js:22–23` | `userController.create` calls `db.User.collection.insertOne(req.body)` — raw, unsanitised request body inserted directly into MongoDB. This bypasses all Mongoose validators and opens the door to NoSQL injection / field-stuffing. |

---

### P1 — High Priority (breaks features)

| # | Location | Issue |
|---|----------|-------|
| P1-1 | `routes/api/user.js:8–13` | Routes `/:email` and `/:userid` are **both GET routes on the same pattern**. Express matches them in declaration order, so `findById` is **never reachable** — every `/api/profile/:param` GET goes to `findByEmail`. The route for `findById` needs a distinct path (e.g. `/id/:userid`). |
| P1-2 | `controllers/userController.js:84,92` | `follow` and `unfollow` call `res.end()` **synchronously inside `.then()`** before the promise resolves. The correct pattern is `.then(() => res.end())`. As written the response is sent immediately, and any DB error after that crashes the server. |
| P1-3 | `client/src/components/Cards/CardElement.js:15,19,30` | Uses `class=` (HTML) instead of `className=` (JSX) on multiple `<div>` elements. React will emit warnings and Materialize CSS classes may not apply. |
| P1-4 | `client/src/pages/ProfileView/ProfileView.js:45` | `componentDidUpdate` fires `getPostsById` when `prevState !== currentstate` — **object reference comparison is always true**, meaning it fetches on every render (same infinite loop pattern). |
| P1-5 | `client/src/pages/Home/Home.js:88–113` | `getUserInfo` builds `userauthobj` from `this.state.user` **before** the `userFindByEmail` response resolves, so it always uses the default initial state. New-user creation (`userCreate`) will often send blank data. The create call should be made after the DB lookup confirms no user exists. |
| P1-6 | `client/src/pages/Profile/Profile.js:27` | Uses deprecated `componentWillMount` lifecycle. Will become an error in React 17+. Replace with `componentDidMount`. |
| P1-7 | `client/src/pages/ProfileView/ProfileView.js:28` | Same deprecated `componentWillMount` issue. |
| P1-8 | `controllers/userController.js:96–102` | `like` only updates the **User's `likes` array** — it does not call `postController.like` to increment `likeCount` on the Post. The frontend calls both API endpoints separately, but if either fails the two collections get out of sync. These should be a single atomic operation (or at minimum handled in a transaction/two-phase update on the backend). |

---

### P2 — Medium Priority (UX / reliability)

| # | Location | Issue |
|---|----------|-------|
| P2-1 | `client/src/components/Cards/CardElement.js:41` | `props.likes.includes(props.id)` — `props.likes` is an array of MongoDB ObjectId strings, `props.id` is also a string, but ObjectId `.toString()` comparisons can fail depending on how Mongoose serialises them. Should use explicit `.toString()` normalisation on both sides. |
| P2-2 | `client/src/pages/Profile/Profile.js:66` | `loadProfileCards` checks `userposts[0] !== null` — `userposts[0]` is `undefined` when the array is empty, and `undefined !== null` is `true`, so the `.map()` will run on an empty array and return nothing (silent blank render). Use `userposts.length > 0` instead. |
| P2-3 | `client/src/pages/ProfileView/ProfileView.js:83` | Same `userposts[0] !== null` guard issue. |
| P2-4 | `client/src/pages/Profile/Profile.js:74` | `render()` checks `this.state.user !== null` but `user` is initialised as `{}` (not `null`), so the guard never triggers. Returns nothing when user hasn't loaded yet (blank white screen flash). |
| P2-5 | `server.js:28` | `useMongoClient: true` is a deprecated Mongoose option. Replace with `{ useNewUrlParser: true, useUnifiedTopology: true }`. |
| P2-6 | `client/src/components/SideNavBar/SideNavBar.js:17` | `console.log(props)` left in production code. |
| P2-7 | `client/src/pages/Home/Home.js:105` | `console.log(this.state.user._id)` left in production code. |
| P2-8 | `client/src/utils/API.js:11–13` | `userFindByEmail` and `userFindById` both call `/api/profile/:param`. Due to P1-1 (route collision), `userFindById` is broken. Needs corresponding backend route fix. |
| P2-9 | `client/src/pages/ProfileView/ProfileView.js:62` | `==` used instead of `===` for boolean check (`following == false`). |
| P2-10 | `routes/api/post.js:22–24` | `unlike` uses `PUT /like/:postid` but `userController.unlike` uses `DELETE /like/:postid`. Inconsistent HTTP verbs across the two like endpoints. |

---

### P3 — Low Priority / Code Quality

| # | Location | Issue |
|---|----------|-------|
| P3-1 | `controllers/userController.js` | Large commented-out blocks of dead code. |
| P3-2 | Multiple files | Mix of `import axios` and `import API` — `axios` is imported directly in pages that already use the `API` utility wrapper. |
| P3-3 | `client/src/App.js` | `Filestack` component imported but never used in JSX. |
| P3-4 | `server.js:7–38` | Socket.IO setup fully commented out but package still installed. Either implement it or remove the dependency. |
| P3-5 | Multiple components | Missing `key` props in some list renders, using `postImage` (non-unique) as key in others. |
| P3-6 | `client/src/pages/Home/Home.js:6` | `import Home from "../../pages/Home"` — a page importing itself. Unused. |
| P3-7 | `client/src/pages/Home/Home.js:3` | `import axios` — unused, API calls go through `API.js`. |
| P3-8 | No pagination | `findAll` returns every post with no limit. This will degrade at scale. |
| P3-9 | No auth on mutation routes | Backend `POST /api/post/`, `POST /api/profile/`, follow/unfollow, like/unlike are all unauthenticated. A user can post or like as anyone by passing any `currentuser` ID. |

---

## Part 2 — Prioritised Project Task List

### Sprint 1 — Stop the Bleeding (P0 + P1)

- [ ] **Fix infinite render loops** — Merge the two `componentDidUpdate` methods in `Home.js` into one; add proper `prevState` guards in `Home.js`, `Profile.js`, and `ProfileView.js` so API calls only fire when relevant state actually changes.
- [ ] **Remove socket.io client boot-on-load** — Remove `openSocket` call from `API.js` (or gate it behind a feature flag). Remove unused socket.io dependency if not implementing real-time.
- [ ] **Fix route collision in `/api/profile`** — Rename the `findById` route to `/api/profile/id/:userid` and update `API.js` `userFindById` call to match.
- [ ] **Fix `follow`/`unfollow` response timing** — Change `res.end()` to `.then(() => res.end())` in `userController.js`.
- [ ] **Fix `userCreate` to use validated Mongoose model** — Replace `collection.insertOne(req.body)` with `db.User.create({ ...whitelistedFields })`.
- [ ] **Move Okta config to environment variables** — Use `process.env.REACT_APP_OKTA_ISSUER`, `REACT_APP_OKTA_CLIENT_ID`, `REACT_APP_OKTA_REDIRECT_URI` in `App.js`; document required vars in README.
- [ ] **Remove or hash password field** — If password is unused (login is Okta-only), remove the field from the schema and all frontend state. If kept, add bcrypt hashing.
- [ ] **Fix `class=` → `className=` in `CardElement.js`** — Three divs use HTML attribute syntax.
- [ ] **Replace `componentWillMount` with `componentDidMount`** in `Profile.js` and `ProfileView.js`.
- [ ] **Fix `getUserInfo` async race in `Home.js`** — Move `userCreate` call into the `.then()` callback of `userFindByEmail` so it only runs after confirming the user doesn't exist.

### Sprint 2 — Polish & Reliability (P2)

- [ ] **Fix `userposts[0] !== null` guard** — Replace with `userposts.length > 0` in `Profile.js` and `ProfileView.js`.
- [ ] **Fix blank-screen flash in `Profile.js`** — Add a loading state; change render guard from `user !== null` to `user._id`.
- [ ] **Normalise ObjectId comparisons in `LikeButton`** — Ensure `likes.map(id => id.toString()).includes(props.id.toString())`.
- [ ] **Fix Mongoose deprecation warning** — Update `mongoose.connect` options in `server.js`.
- [ ] **Standardise like HTTP verbs** — `POST /like/:postid` to add, `DELETE /like/:postid` to remove, consistently across both user and post routes.
- [ ] **Remove all `console.log` debug statements** from production components.
- [ ] **Fix `==` to `===` in `ProfileView.js:62`**.

### Sprint 3 — Missing Features for MVP

- [ ] **Atomic like operation** — Backend should update both `User.likes` and `Post.likeCount`/`Post.likedBy` in a single endpoint so they stay in sync.
- [ ] **Post delete** — Wire `postController.remove` into the routes and add a delete button in the card UI (for the post owner only).
- [ ] **Following-based feed** — Home feed should show posts from followed users when logged in; fall back to all posts for logged-out visitors.
- [ ] **Basic auth middleware on mutation routes** — Verify the Okta JWT on `POST /api/post/`, follow, like, and profile update routes so users can't act as other users.
- [ ] **Pagination / infinite scroll** — Add `limit` + `skip` (or cursor-based) pagination to `findAll` posts.

### Sprint 4 — Pre-Launch

- [ ] **Security audit** — Verify no PII is logged; confirm Okta redirect URIs are domain-locked; review all mongoose queries for injection vectors.
- [ ] **Error boundaries** — Add a React `ErrorBoundary` wrapper around the feed and profile card renders so one bad post doesn't blank the whole page.
- [ ] **Loading states** — Add skeleton loaders or spinners while posts/profile data fetch.
- [ ] **Empty state UI** — Handle "no posts yet" gracefully on Profile and ProfileView pages.
- [ ] **README update** — Document environment variables, local dev setup, seed script, and Heroku deploy steps.
- [ ] **Dependency audit** — Several packages are 7+ years old (React 16.2, Okta React 0.0.11, Mongoose 4.x). Evaluate upgrading or at minimum run `npm audit`.
- [ ] **Remove or implement Socket.IO** — Make a decision: if real-time likes are desired, implement it properly; otherwise remove `socket.io` and `socket.io-client` from both package files.

---

## Quick Reference — Key File Map

| File | What it does |
|------|-------------|
| `server.js` | Express app, MongoDB connection, static assets |
| `routes/index.js` | Mounts `/api` and `/user` routers |
| `routes/api/user.js` | `/api/profile/*` — user CRUD + like |
| `routes/api/post.js` | `/api/post/*` — post CRUD + like |
| `routes/profiles.js` | `/user/*` — follow/unfollow |
| `controllers/userController.js` | User DB operations |
| `controllers/postController.js` | Post DB operations |
| `models/user.js` | User Mongoose schema |
| `models/post.js` | Post Mongoose schema |
| `client/src/App.js` | React router + Okta Security wrapper |
| `client/src/utils/API.js` | Axios wrapper for all backend calls |
| `client/src/pages/Home/Home.js` | Authenticated home feed |
| `client/src/pages/Profile/Profile.js` | Own profile page |
| `client/src/pages/ProfileView/ProfileView.js` | View another user's profile |
| `client/src/components/Cards/CardElement.js` | Portfolio card component |
| `client/src/components/LikeButton/LikeButton.js` | Like/unlike toggle |
| `client/src/components/SideNavBar/SideNavBar.js` | Profile sidebar |
| `client/src/components/ModalPost/` | New post creation modal |
| `client/src/components/ModalProfile/` | Profile edit modal |
