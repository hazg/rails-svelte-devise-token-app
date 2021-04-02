// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.


/* Import app, attach app to body element */

// import Rails from '@rails/ujs';
// Rails.start();
import Api from './store/api'
window.api = new Api({ target: document.body })
import App from './app'
import { User } from './store/user'
import { updateUserInfo } from './store/user_info'




document.addEventListener('DOMContentLoaded', async () => {

  if (User.isLoggedIn() && window.location.pathname != '/login') {
    await updateUserInfo()
  }

  const app = new App({
    target: document.body,
  });

  window.app = app;
})

// import Rails from "@rails/ujs"
// import Turbolinks from "turbolinks"
// import * as ActiveStorage from "@rails/activestorage"
// import "channels"

// Rails.start()
// Turbolinks.start()
// ActiveStorage.start()
