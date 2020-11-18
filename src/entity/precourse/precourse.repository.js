import { PreCourse } from '../relation';


var PreCourseRepository = {
  getPreCource: function (courseId) {
    return PreCourse.findAll({
      attributes: ['id', 'courseId'],
      where: {
        courseId: courseId
      }
    });
  },

  getCourse: function (id) {
    return PreCourse.findOne({ where: { id: id } })
  },

  addPreCourse: function (course) {
    return PreCourse.create(course, {
      fields: ['id', 'courseId']
    });
  },

  deletePreCourse: function (id) {
    return PreCourse.destroy({ where: { id: id } })
  },


}

export default PreCourseRepository;