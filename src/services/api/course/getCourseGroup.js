import instance from '../../instance'

export const getCourseGroupAPI = (token) => {
    return instance.get('/api/getCourseGroup', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};