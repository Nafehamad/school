import { UserCourse, Grade } from '../relation';


var UserCourseRepository = {
  getUserCource: function (courseId) {
    return UserCourse.findOne({ where: { courseId: courseId, finished: 1 || null } })
  },

  updateUserCource: function (gradeId, finished, userId, courseId) {
    return UserCourse.update({ gradeId, finished }, { where: { userId: userId, courseId: courseId } })
  },

  signUpCourse: function (userId, courseId) {
    return UserCourse.create({ userId: userId, courseId: courseId })
  },

  deleteUserCoursse: function (id) {
    return UserCourse.destroy({ where: { courseId: id } })
  },

  getSignUpUserCource: function (courseId) {
    return UserCourse.findOne({ attributes: ['courseId'], where: { courseId: courseId } })
  },

  getStudentCource: function (userId) {
    return UserCourse.findAll({
      attributes: ['courseId'],
      include: {
        model: Grade,
        attributes: ['value', 'result']
      },
      where: {
        userId: userId
      }
    })
  },
}

export default UserCourseRepository;