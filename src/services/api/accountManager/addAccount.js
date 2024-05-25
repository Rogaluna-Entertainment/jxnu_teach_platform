import instance from '../../instance'

export const addAccountAPI = (accountRequest, token) => {
    return instance.post('/api/addAccount', accountRequest, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};