import instance from '../../instance'

export const getVideoAPI = (filename, token) => {
    return instance.get('/api/getVideo', {
        params: { filename },
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};