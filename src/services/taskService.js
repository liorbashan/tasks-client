import apollo from '../apolloClient';
import taskGQL from '../gql/task.gql';

export const getOne = async (getTaskInput) => {
    let result = null;
    const response = await apollo
        .query({
            query: taskGQL.getOne,
            fetchPolicy: 'no-cache',
            variables: {
                getTaskInput,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.GetTask;
    }
    return result;
};

export const getAll = async (getAllTasksInput) => {
    let result = [];
    const response = await apollo
        .query({
            query: taskGQL.getAll,
            fetchPolicy: 'no-cache',
            variables: {
                getAllTasksInput,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.QueryTasks;
    }
    return result;
};

export const addTask = async (addTaskInput) => {
    let result = null;
    const response = await apollo
        .mutate({
            mutation: taskGQL.add,
            variables: {
                addTaskInput,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.AddTask;
    }
    return result;
};

export const updateTask = async (updateTaskInput) => {
    let result = null;
    const response = await apollo
        .mutate({
            mutation: taskGQL.update,
            variables: {
                updateTaskInput,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.UpdateTask;
    }
    return result;
};

export const deleteTask = async (taskIdToDelete) => {
    let result = null;
    const response = await apollo
        .mutate({
            mutation: taskGQL.delete,
            variables: {
                taskIdToDelete,
            },
        })
        .catch((error) => {
            throw new Error(error);
        });
    if (response) {
        result = response.data.DeleteTask;
    }
    return result;
};
