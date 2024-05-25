import instance from '../../instance'

export const modifyAccountAPI = (account_id, updateRequest, token) => {
    return instance.patch('/api/modifyAccount', {
        accountData: updateRequest,
        accountId: account_id
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};