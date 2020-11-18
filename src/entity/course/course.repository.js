import { Course, PreCourse } from '../relation';


var CourseRepository = {
    getAllCourse: function () {
        return Course.findAll({
            attributes: ['id', 'name'],
            include: {
                model: PreCourse,
                attributes: ['id']

            }
        })
    },

    getCourse: function (id) {
        return Course.findOne({ where: { id: id } })
    },

    addCourse: function (newCourse) {
        return Course.create(newCourse, {
            fields: ['id', 'name', 'semesterId']
        })
    },

    deleteCourse: function (id) {
        return Course.destroy({ where: { id: id } })
    },

}

export default CourseRepository;