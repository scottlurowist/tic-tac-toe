////////////////////////////////////////////////////////////////////////////////
// 
// events.js
//
// This file handles events raised in the app.js file which is the entry
// point for the application.
//
////////////////////////////////////////////////////////////////////////////////


const getFormFields = require('./../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./apiPromiseHandlers');


// Hadn
const onNavigateoToSignUpPage = event => {

    // Our pseudo-state machine toggles views from the home page
    // to the create account page.
    $('#home-page').hide();
    $('#sign-up-page-form').show();
}


const onNavigateToSignInPage = event => {
 
    // Our pseudo-state machine toggles views from the home page
    // to the create account page.
    $('#home-page').hide();
    $('#sign-in-page-form').show();
}


const onSignUp = event => {

    event.preventDefault();

    const form = event.target;

    // send data in AJAX request to the API
    api.signUp(getFormFields(form))
      .then(ui.onSignUpSuccess)
      .catch(ui.onSignUpFailure);
}


const onSignIn = event => {

    event.preventDefault();

    const form = event.target;

    // send data in AJAX request to the API
    api.signIn(getFormFields(form))
      .then(ui.onSignInSuccess)
      .catch(ui.onSignInFailure);
}


const onChangePasswordShowForm = event => {

    //event.preventDefault();

    $('#game-options-page-form').hide();    
    $('#change-password-page-form').show(); 
}


const onChangePassword = event => {
    
    event.preventDefault();

    const form = event.target;

    // send data in AJAX request to the API
    api.changePassword(getFormFields(form))
      .then(ui.onChangePasswordSuccess)
      .catch(ui.onChangePasswordFailure);

    $('#game-options-page-form').show();    
    $('#change-password-page-form').hide();
}

const onNewGame = event => {

    event.preventDefault();
    
    // send data in AJAX request to the API
    api.newGame()
        .then(ui.onNewGameSuccess)
        .catch(ui.onNewGameFailure);
}


const onReturnToGameOptionsFromNewGame = () => {

    $('#new-game-page-form-div').hide();  
    $('#game-options-page-form').show(); 
   
};


const onExitApp = event => {
    console.log('Entering onExit');
    event.preventDefault();

    // send data in AJAX request to the API
    api.exitApp()
      .then(ui.onExitAppSuccess)
      .catch(ui.onExitAppFailure);

    $('#game-options-page-form').hide();    
    $('#home-page').show();
}


module.exports = {
    onNavigateoToSignUpPage: onNavigateoToSignUpPage,
    onNavigateToSignInPage: onNavigateToSignInPage,
    onSignUp: onSignUp,
    onSignIn: onSignIn,
    onChangePasswordShowForm: onChangePasswordShowForm,
    onChangePassword: onChangePassword,
    onNewGame: onNewGame,
    onReturnToGameOptionsFromNewGame: onReturnToGameOptionsFromNewGame,
    onExitApp: onExitApp
}