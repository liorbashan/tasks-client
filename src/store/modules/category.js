import * as categoriesList from '../../common/category';

export default {
    namespaced: true,
    state: {
        categories: [],
    },
    mutations: {
        SET_CATEGORIES: (state, data) => {
            state.categories = data;
        },
    },
    actions: {
        FETCH_CATEGORIES: async function({ commit }) {
            let data = [];
            if (categoriesList.categoryList.length > 0) {
                data = categoriesList.categoryList;
            }
            commit('SET_CATEGORIES', data);
        },
    },
    getters: {
        GET_CATEGORIES: (state) => {
            return state.categories;
        },
    },
};
