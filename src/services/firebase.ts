import firebase from 'firebase/app';
import 'firebase/auth';

/**
 * Gets Firebase's auth service
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Interface} The Firebase Auth service interface
 */
export const auth = () => {
    return firebase.auth();
};

export const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const data = await firebase
        .auth()
        .signInWithPopup(provider)
        .catch((error) => {
            console.log('🤕' + error.message);
        });
    if (data) {
        const userData = data?.additionalUserInfo?.profile;
        return userData;
    }
};

/** Convenience method to initialize firebase app
 *
 * @param  {Object} config
 * @return {Object} App
 */
export const init = (config: any) => {
    return firebase.initializeApp(config);
};
