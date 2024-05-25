import instance from '../../instance'

export const getImageAPI = (filename, token) => {
    return instance.get('/api/getImage', {
        params: { filename },
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};