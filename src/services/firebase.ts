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

export const getJwt = async (url: string, userData: any): Promise<string> => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(userData), // body data type must match "Content-Type" header
    });
    const jwt = await response.text();
    return jwt;
    // localStorage.setItem('token', jwt);
};

/** Convenience method to initialize firebase app
 *
 * @param  {Object} config
 * @return {Object} App
 */
export const init = (config: any) => {
    return firebase.initializeApp(config);
};
