import { sequelize } from '../../database/database';
import PreCourseRepository from './precourse.repository';

var transaction;

export async function addPreCourse(req, res) {
    try {
        transaction = await sequelize.transaction();
        try {
            const checkdata = await PreCourseRepository.getCourse(req.body.id);
            if (checkdata) {
                res.json({
                    message: "Already Exist",
                    data: checkdata
                });
            } else {
                const createdata = await PreCourseRepository.addPreCourse(req.body);
                if (createdata) {
                    res.json({
                        success: true,
                        message: "PreCourse Created Successfully",
                        data: createdata
                    });
                }
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



export async function deletePreCourse(req, res) {
    try {
        transaction = await sequelize.transaction();
        const id = req.params.id;
        PreCourseRepository.deletePreCourse(id)
            .then(() => res.status(200).json({ msg: 'Course has been deleted successfully!' }))
            .catch(err => res.status(500).json({ msg: 'Failed to delete!' }));
        await transaction.commit();
    } catch (err) {
        if (transaction) await transaction.rollback();
    }
};
