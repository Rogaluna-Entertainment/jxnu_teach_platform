import instance from '../../instance'

export const deleteImagesAPI = (filenames, token) => {
    return instance.delete('/api/deleteImages', {
        data: { filenames },
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};