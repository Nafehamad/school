import { Semester } from '../relation';


var SemesterRepository = {
    getAllSemester: function () {
        return Semester.findAll()
    },

    getSemester: function (id) {
        return Semester.findOne({ where: { id } })
    },

    addSemester: function (semester) {
        return Semester.create(semester)
    },

    deleteSemester: function (id) {
        return Semester.destroy({ where: { id } })
    },


}

export default SemesterRepository;