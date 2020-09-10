import * as FirebaseService from '../services/firebase';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async (/* { app, router, Vue ... } */) => {
    const firebaseConfig = {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
    };

    FirebaseService.init(firebaseConfig);

    // let userData = await FirebaseService.signInWithGoogle();
    // console.log('userData', userData);
};
