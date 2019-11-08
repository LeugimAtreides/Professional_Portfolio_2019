import { Api } from '../lib/api/api';

export const getUserData = () => async(dispatch) => {
    const api = new Api();
    dispatch({
        type: "USER",
    });
    try {
        const user = await api.users.getUser();
        dispatch({
            type: 'USER_SUCCESS',
            user
        })
    } catch (error) {
        dispatch({
            type: 'USER_ERROR',
            error
        })
    }
}