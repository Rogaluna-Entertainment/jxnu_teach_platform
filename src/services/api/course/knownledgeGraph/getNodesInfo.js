import instance from '../../../instance'

export const getNodesInfoAPI = (token) => {
    return instance.get('/api/getNodesInfo', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};