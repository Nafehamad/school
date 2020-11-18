import { sequelize } from '../../database/database';
import UserCourseRepository from './usercourse.repository';
import PreCourseRepository from '../precourse/precourse.repository';
import { UserCourse } from '../relation';

var transaction;



//Sign up for courses
export async function signUpCourse(req, res) {
    try {
        transaction = await sequelize.transaction();
        const userId = req.user[0].dataValues.id
        const { courseId } = req.body;
        try {
            let checkdata = await UserCourseRepository.getUserCource(courseId);
            if (checkdata) {
                res.json({
                    message: "You finish this course",
                    data: checkdata
                });
            } else {
                await UserCourseRepository.deleteUserCoursse(courseId)
                var checkpre = await PreCourseRepository.getPreCource(courseId);
                if (!checkpre.length) {
                    let createdata = await UserCourseRepository.signUpCourse(userId, courseId);
                    if (createdata) {
                        res.json({
                            success: true,
                            message: "signUp Successfull",

                        });
                    }
                }
                else {
                    var x = [];
                    var count = 0;
                    for (var i = 0; i < checkpre.length; i++) {
                        x = await UserCourseRepository.getSignUpUserCource(checkpre[i].id)
                        if (x instanceof UserCourse) {
                            count++;
                        }
                    }

                    if (count == checkpre.length) {
                        let done = await UserCourseRepository.signUpCourse(userId, courseId);
                        if (done) {
                            res.json({
                                success: true,
                                message: "signUp Successfull",

                            });
                        }
                    }
                    else {
                        res.json({
                            success: false,
                            message: "You can't SignUp this course",
                        });
                    }
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


//assign grade to user
export async function setStudentGrade(req, res) {
    try {
        transaction = await sequelize.transaction();
        const { userId, courseId, gradeId, finished } = req.body;
        UserCourseRepository.updateUserCource(gradeId, finished, userId, courseId)
            .then(user => res.status(200).json({ user }))
            .catch(err => res.status(500).json({ err }));
        await transaction.commit();
    } catch (err) {
        if (transaction) await transaction.rollback();
    }
};


//get student course with its grade
export async function getStudentCourse(req, res) {
    try {
        transaction = await sequelize.transaction();
        UserCourseRepository.getStudentCourse(req.user[0].dataValues.id)
            .then(course => {
                res.json({ course });
            })
            .catch(err => res.status(500).json({ err }));
        await transaction.commit();
    } catch (err) {
        if (transaction) await transaction.rollback();
    }
};  