import instance from '../../instance'

export const addCourseAPI = (addCourseRequest, token) => {
    return instance.post('/api/addCourse', addCourseRequest, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};