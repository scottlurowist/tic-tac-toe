////////////////////////////////////////////////////////////////////////////////
// 
// apiPromiseHandlers.js
//
// This file handles all promises returned by jQuery ajax calls in api.js.
//
////////////////////////////////////////////////////////////////////////////////

'use strict'


const store = require('./../store');
const stateMachine = require('./../pageStateMachine');
const gameScoringEngine = require('./../gameScoringEngine');


// Processes the success promise success result when a user creates an account.
const onSignUpSuccess = response => {

  $('#status-notification-message-area').text('You are now registered ' +
    response.user.email);

  stateMachine.transitionToState(stateMachine.pageStates.signInPage);
};


// Processes the success promise failure result when a user attempts
// to create an account.
const onSignUpFailure = response => {

    $('#status-notification-message-area')
      .text('Registration failed. Please try again later.');
};


// Processes the success promise success result when a user creates an account.
const onSignInSuccess = response => {

  // Save the token among other things.
  store.user = response.user;

  $('#status-notification-message-area').text('Welcome ' + response.user.email);

  stateMachine.transitionToState(stateMachine.pageStates.gameOptionsPage);  
};


// Processes the success promise failure result when a user attempts
// to create an account.
const onSignInFailure = response => {

    $('#status-notification-message-area')
      .text('Signin failed. Please try again later.');
};


// Processes the success promise success result when a user changes their password.
const onChangePasswordSuccess = response => {

  $('#status-notification-message-area')
    .text(`Password change successful ${store.user.email}`);

  stateMachine.transitionToState(stateMachine.pageStates.gameOptionsPage);        
};


// Processes the success promise failure result when a user attempts
// to change their password.
const onChangePasswordFailure = response => {

    $('#status-notification-message-area')
      .text('Password change failed. Please try again later.');
};


// Processes the success promise success result when a user creates a new game.
const onNewGameSuccess = response => {

  // TODO: Do I need to keep this in the store?
  store.currentGame = response.game;

  // Now we may start playing the game.
  gameScoringEngine.initializeGameEngine(response.game);

  stateMachine.transitionToState(stateMachine.pageStates.newGamePage); 
  
  $('#status-notification-message-area')
  .text('You have successfully created a new game ' + store.user.email);
};


// Processes the success promise failure result when a user attempts to 
// create a new game.
const onNewGameFailure = response => {

    gameScoringEngine.updateGameStatus(response.game);
    
    $('#status-notification-message-area')
      .text('Your attempt to create a new game failed. Please try again later.');
};


// Processes the success promise success result when a user updates a game.
const onUpdateGameSuccess = response => {
  
  gameScoringEngine.updateGameStatus(response.game, true);
};


// Processes the success promise failure result when a user attempts to 
// update a game.
const onUpdateGameFailure = response => {

  gameScoringEngine.updateGameStatus(response.game, false);
};


// Processes the success promise success result when a user gets a history
// of their games.
const onGetGamesSuccess = response => {
  
  const numberOfGamesPlayed = response.games.length;
  let numberOfGamesStringMessage = null;
  
  switch (numberOfGamesPlayed) {
    case 0:
      numberOfGamesStringMessage = "no games";
      break;
    case 1:
      numberOfGamesStringMessage = "one game";
      break;
    default:
      numberOfGamesStringMessage = `${numberOfGamesPlayed} games`;
      break;
  } 

  $('#status-notification-message-area')
    .text(`You have played ${numberOfGamesStringMessage} ` + store.user.email);
};


// Processes the success promise failure result when a user attempts to 
// get a history of their games.
const onGetGamesFailure = response => {
    
  $('#status-notification-message-area')
    .text('The API called to retrieve the number of games has failed ' + store.user.email);
};


// Processes the success promise success result when a user exits the application.
const onExitAppSuccess = response => {

  $('#status-notification-message-area')
    .text('You have exited the app ' + store.user.email);

    stateMachine.transitionToState(stateMachine.pageStates.homePage);      
};


// Processes the success promise failure result when a user attempts to
// exit the application.
const onExitAppFailure = response => {

    $('#status-notification-message-area')
      .text('Exiting the app failed. Please try again later.');
};


module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onNewGameSuccess,
  onNewGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onGetGamesSuccess,
  onGetGamesFailure,
  onExitAppSuccess,
  onExitAppFailure  
};