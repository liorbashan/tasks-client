import apollo from '../apolloClient';
import userGQL from '../gql/user.gql';

export const updateUser = async (updateInput) => {
    let result = null;
    const response = await apollo
        .mutate({
            mutation: userGQL.update,
            variables: {
                updateInput,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.UpdateUser;
    }
    return result;
};

export const getUser = async (getInput) => {
    let result = null;
    const response = await apollo
        .mutate({
            mutation: userGQL.getOne,
            variables: {
                getInput,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.GetUser;
    }
    return result;
};
