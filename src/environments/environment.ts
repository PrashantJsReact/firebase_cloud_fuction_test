// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cashFree: {
    url: 'https://sandbox.cashfree.com/pg/links',
    'x-client-id': '137262985dc6f60df8c89d6a5a262731', // from UI
    'x-client-secret': '71909436af48eba30ae3098d14d8c3f110e63b52', // from UI
  },
  firebaseConfig: {
    ssl: false,
    apiKey: 'AIzaSyCLxHTYYgW7tXk0htCKharyCOhiYUVZhHY',
    authDomain: 'test-corpcrs-986f3.firebaseapp.com',
    databaseURL:
      'https://test-corpcrs-986f3-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'test-corpcrs-986f3',
    storageBucket: 'test-corpcrs-986f3.appspot.com',
    messagingSenderId: '618295537291',
    appId: '1:618295537291:web:b6e270feab6fbdc2abee8e',
    measurementId: 'G-CE4EWS8TN4',
    host: 'localhost:4200',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
