import instance from '../../instance'

export const uploadImageAPI = (imageData, token) => {
    return instance.post('/api/uploadImage', imageData, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};