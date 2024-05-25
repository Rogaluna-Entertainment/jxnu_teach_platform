import instance from '../../instance'

export const uploadVideoAPI = (videoData, token) => {
    return instance.post('/api/uploadVideo', videoData, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};