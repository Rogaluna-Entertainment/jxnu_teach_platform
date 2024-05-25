import instance from '../../instance'

export const loginAPI = (username, password) => {
    return instance.post('/api/login', {
        username,
        password,
    });
};