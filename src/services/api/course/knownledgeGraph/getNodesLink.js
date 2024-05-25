import instance from '../../../instance'

export const getNodesLinkAPI = (token) => {
    return instance.get('/api/getNodesLink', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};