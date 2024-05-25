import instance from '../../instance'

export const infoDetailAPI = (token) => {
    return instance.get('/api/infoDetail', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};