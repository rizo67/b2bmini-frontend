import * as firebase from 'firebase';

//process.env.VUE_APP_VERSION = require('../../package.json').version

const firebaseConfig = {
  apiKey: process.env.VUE_APP_VERSION_FSTORE_APIKEY,
  authDomain: process.env.VUE_APP_VERSION_FSTORE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VERSION_SFTORE_DATABASEURL,
  projectId: process.env.VUE_APP_VERSION_FSTORE_PROJECTID,
  storageBucket: process.env.VUE_APP_VERSION_FSTORE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_VERSION_FSTORE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_VERSION_FSTORE_APPID
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase

