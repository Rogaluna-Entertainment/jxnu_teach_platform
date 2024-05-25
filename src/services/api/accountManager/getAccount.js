import instance from '../../instance'

export const getAccountsAPI = ({ page, pageSize }, token) => {
    return instance.get('/api/getAccounts', {
        params: {
            page: page,
            page_size: pageSize
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};