import instance from '../../instance'

export const deleteVideosAPI = (filenames, token) => {
    return instance.delete('/api/deleteVideos', {
        data: { filenames },
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};