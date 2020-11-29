import socket from 'socket.io';
import server from '../../app';
import { sequelize } from '../../database/database';
import CourseRepository from './course.repository';


var transaction;

export async function addCourse(req, res) {

  let io = socket(server);
  io.set("polling duration", 50);
  io.on('connection', function (socket) {
    
    console.log('made socket connected');
    io.sockets.emit('chat', { course: req.body.name });
    
  })
  
  try {
    transaction = await sequelize.transaction();
    try {
      const checkdata = await CourseRepository.getCourse(req.body.id);
      if (checkdata) {
        res.json({
          message: "Already Exist",
          data: checkdata
        });
      } else {
        const createdata = await CourseRepository.addCourse(req.body);
        if (createdata) {
          res.json({
            success: true,
            message: "Course Created Successfully",
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

export async function getCourses(req, res) {
  try {
    transaction = await sequelize.transaction();
    await CourseRepository.getAllCourse()
      .then(course => {
        res.status(200).json({ course })
      })
      .catch(err => {
        res.status(500).json({ err })
      })
    transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

export async function deleteCourse(req, res) {
  try {
    transaction = await sequelize.transaction();
    const id = req.params.id;
    CourseRepository.deleteCourse(id)
      .then(() => res.status(200).json({ msg: 'Course has been deleted successfully!' }))
      .catch(err => res.status(500).json({ msg: 'Failed to delete!' }));
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};