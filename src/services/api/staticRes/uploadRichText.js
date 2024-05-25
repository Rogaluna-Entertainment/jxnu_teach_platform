import instance from '../../instance'

export const uploadRichTextAPI = (formData, token) => {
    return instance.post('/api/uploadRichText', formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};