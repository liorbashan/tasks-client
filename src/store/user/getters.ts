import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserInterface } from './state';

const tokenName = process.env.TOKEN_NAME as string;
const getters: GetterTree<UserInterface, StateInterface> = {
    getUserToken() {
        let userToken: string | null = null;
        // TODO: get from store, or from localstorage, check expiration?
    },
};

export default getters;
