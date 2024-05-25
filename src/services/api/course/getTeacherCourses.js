import instance from '../../instance'

export const getTeacherCoursesAPI = (teacherId, token) => {
    return instance.get('/api/getTeacherCourses', {
        params: {
            teacher_id: teacherId
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};