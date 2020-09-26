import apollo from '../apolloClient';
import spaceGQL from '../gql/space.gql';

export const getOne = async (getSpaceInput) => {
    let result = null;
    const response = await apollo
        .query({
            query: spaceGQL.getOne,
            fetchPolicy: 'no-cache',
            variables: {
                getSpaceInput,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.GetSpace;
    }
    return result;
};

export const getAllSpaces = async (input = null) => {
    let result = [];
    const response = await apollo
        .query({
            query: spaceGQL.getAll,
            fetchPolicy: 'no-cache',
            variables: {
                getAllSpaceInput: input,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.QuerySpaces;
    }
    return result;
};

export const updateSpace = async (updateInput) => {
    let result = null;
    const response = await apollo
        .mutate({
            mutation: spaceGQL.update,
            variables: {
                updateInput,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.UpdateSpace;
    }
    return result;
};
