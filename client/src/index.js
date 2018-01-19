import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


require('dotenv').load();
var http = require('http');
var path = require('path');
var AccessToken = require('twilio').AccessToken;
var ConversationsGrant = AccessToken.ConversationsGrant;
var express = require('express');
var randomUsername = require('./randos');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config.js');
 
// Create Express webapp
var app = express();
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(express.static(path.join(__dirname, 'public')));


function conversationStarted(conversation) {
    log('In an active Conversation');
    activeConversation = conversation;
    // Draw local video, if not already previewing
    if (!previewMedia) {
        ReactDOM.render(<ConversationContainer conversation={conversation} />, document.getElementById('local-conversation'));
    }
 
    // When a participant joins, draw their video on screen
    conversation.on('participantConnected', function (participant) {
        log("Participant '" + participant.identity + "' connected");
    });
 
    // When a participant disconnects, note in log
    conversation.on('participantDisconnected', function (participant) {
        log("Participant '" + participant.identity + "' disconnected");
    });
 
    // When the conversation ends, stop capturing local video
    conversation.on('disconnected', function (conversation) {
        log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");
        ReactDOM.unmountComponentAtNode(document.getElementById('local-conversation'));
        activeConversation = null;
    });




ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
