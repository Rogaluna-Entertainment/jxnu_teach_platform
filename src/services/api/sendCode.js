import instance from '../instance'

export const sendCodeAPI = (telephoneNumber) => {
    return instance.post('/api/sendCode', {
        telephoneNumber
    });
};