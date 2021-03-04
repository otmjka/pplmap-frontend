export default {
  api: {
    baseUrl: process.env.REACT_APP_API_URL,
  },
  common: {
    defaultLocale: 'en',
    supportedLocales: ['en'],
  },

  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  },
  google: {
    webClientId: process.env.REACT_APP_GOOGLE_WEB_CLIENT_ID,
    webClientSecret: process.env.REACT_APP_GOOGLE_WEB_CLIENT_SECRET,
    mapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  },
};
