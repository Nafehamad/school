import { sequelize } from '../../database/database';
import GradeRepository from './grade.repository';
var transaction;



export async function setGrade(req, res) {
    try {
        transaction = await sequelize.transaction();
        try {

            const createdata = await GradeRepository.addGrade(req.body);
            if (createdata) {
                res.json({
                    success: true,
                    message: "Grade Created Successfully",
                    data: createdata
                });
            }

        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Something went wrong!"
            })
        }
        await transaction.commit();
    } catch (err) {
        if (transaction) await transaction.rollback();
    }
};

export async function deleteGrade(req, res) {
    try {
        transaction = await sequelize.transaction();
        const id = req.params.id;
        await GradeRepository.deleteGrade(id)
            .then(() => res.status(200).json({ msg: 'Grade has been deleted successfully!' }))
            .catch(err => res.status(500).json({ msg: 'Failed to delete!' }));
        await transaction.commit();
    } catch (err) {
        if (transaction) await transaction.rollback();
    }
};

export async function getGrades(req, res) {
    try {
        transaction = await sequelize.transaction();
        await GradeRepository.getAllGrade()
            .then(grade => {
                res.status(200).json({ grade })
            })
            .catch(err => {
                res.status(500).json({ err })
            })
        transaction.commit();
    } catch (err) {
        if (transaction) await transaction.rollback();
    }
};