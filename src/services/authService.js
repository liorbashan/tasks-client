import firebase from 'firebase/app';
import 'firebase/auth';
import { EventBus } from '../eventBus';
const tokenName = process.env.VUE_APP_TOKEN_NAME;

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
            EventBus.$emit('SHOW_ERROR', error.message);
        });
    if (googleAuthResponse) {
        const userData = googleAuthResponse.additionalUserInfo.profile;
        if (userData) {
            const jwt = await getJwt(`${process.env.VUE_APP_SERVER_HOST}/auth/callback`, userData).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error.message);
            });
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
    }).catch((error) => {
        throw error;
    });
    const jwt = await response.json();
    return jwt;
    // localStorage.setItem('token', jwt);
};

export const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    /* eslint-disable function-paren-newline */
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
};
export const isTokenExpired = (timestamp) => {
    const expirationDate = timestamp * 1000;
    console.log('token expiration date', new Date(expirationDate).toISOString());
    if (Date.now() >= expirationDate) {
        return true;
    }
    return false;
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem(tokenName) ? localStorage.getItem(tokenName) : null;
};

export const init = (config) => {
    return firebase.initializeApp(config);
};
