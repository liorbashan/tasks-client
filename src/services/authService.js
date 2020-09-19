import firebase from 'firebase/app';
import 'firebase/auth';
const tokenName = process.env.TOKEN_NAME;

export const auth = () => {
    return firebase.auth();
};

export const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const googleAuthResponse = await firebase
        .auth()
        .signInWithPopup(provider)
        .catch((error) => {
            console.log('🤕' + error.message);
        });
    if (googleAuthResponse) {
        const userData = googleAuthResponse?.additionalUserInfo?.profile;
        if (userData) {
            const jwt = await getJwt(`${process.env.SERVER_HOST}/auth/callback`, userData);
            localStorage.setItem(tokenName, jwt);
        }
    }
};

export const logout = () => {
    localStorage.removeItem(tokenName);
};

export const getJwt = async (url, userData) => {
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

export const init = (config) => {
    return firebase.initializeApp(config);
};
