import instance from '../../instance'

export const courseNavOptAPI = (courseNavRequest, token) => {
    return instance.post('/api/courseNavOpt', courseNavRequest, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};