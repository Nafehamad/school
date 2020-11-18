import { Grade } from '../relation';


var GradeRepository = {
    getAllGrade: function () {
        return Grade.findAll()
    },

    addGrade: function (newGrade) {
        return Grade.create(newGrade, { fields: ['value', 'result'] });
    },

    deleteGrade: function (id) {
        return Grade.destroy({ where: { id } })
    },


}

export default GradeRepository;