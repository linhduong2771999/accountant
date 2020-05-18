import callAPI from "../../../helpers/callAPI";

export const getUserWorkManager = () => {
    return callAPI("user", "GET", null);
}

export const getOneUserWorkManager = (id) => {
    return callAPI(`user/${id}`, "GET", null)
}

export const createTaskWorkManager = (id, task) => {
    return callAPI(`user/${id}/task/${task.taskId}`, "PUT", task);
}

export const updateTaskWorkManager = (id, task) => {
    return callAPI(`user/${id}/task/${task.taskId}`, "PUT", task);
}

export const deleteOneTaskWorkManager = (id, taskId) => {
    return callAPI(`user/${id}/task/${taskId}`, "DELETE", null);
}

export const deleteAllTaskWorkManager = (id) => {
    return callAPI(`user/${id}/task`, "DELETE", null);
}