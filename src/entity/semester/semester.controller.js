import { sequelize } from '../../database/database';
import SemesterRepository from './semester.repository';

var transaction;

export async function addSemester(req, res) {
  try {
    transaction = await sequelize.transaction();
    try {
      const checkdata = await SemesterRepository.getSemester(req.body.id);
      if (checkdata) {
        res.json({
          message: "Already Exist",
          data: checkdata
        });
      } else {
        const createdata = await SemesterRepository.addSemester(req.body);
        if (createdata) {
          res.json({
            success: true,
            message: "Semester Created Successfully",
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

export async function getSemester(req, res) {
  try {
    transaction = await sequelize.transaction();
    await SemesterRepository.getAllSemester()
      .then(semester => {
        res.status(200).json({ semester })
      })
      .catch(err => {
        res.status(500).json({ err })
      })
    transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

export async function deleteSemester(req, res) {
  try {
    transaction = await sequelize.transaction();
    const id = req.params.id;
    SemesterRepository.deleteSemester(id)
      .then(() => res.status(200).json({ msg: 'Semester has been deleted successfully!' }))
      .catch(err => res.status(500).json({ msg: 'Failed to delete!' }));
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

//update semester 
export async function updateSemester(req, res) {
  try {
    transaction = await sequelize.transaction();
    try {
      const finddata = await SemesterRepository.getSemester(req.params.s_id);
      if (finddata.length > 0) {
        finddata.forEach(async data => {
          await data.update(req.body)
        })
      }
      return res.json({
        success: true,
        message: "Semester updated Successfully",
        data: finddata
      });
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