import { Course, PreCourse, Semester, User, UserCourse, Grade } from '../models/model';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import Sequelize, { where } from 'sequelize';
import validateRegisterForm from '../validation/register';
import validateLoginForm from '../validation/login';
import bcrypt from 'bcryptjs';


//SignUp
export async function signUp(req, res) {
  const { errors, isValid } = validateRegisterForm(req.body);
  let {
    id,
    name,
    email,
    password,
    phone,
    role,
    SemesterId
  } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findAll({ where: { email } }).then(user => {
    if (user.length) {
      return res.status(400).json({ email: 'Email already exists!' });
    } else {
      let newUser = {
        id,
        name,
        email,
        password,
        phone,
        role,
        SemesterId
      };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          User.create(newUser)
            .then(user => {
              res.json({ user });
            })
            .catch(err => {
              res.status(500).json({ err });
            });
        });
      });
    }
  });
}

//Login
export async function login(req, res) {
  const { errors, isValid } = validateLoginForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findAll({
    where: {
      email
    }
  })
    .then(user => {
      if (!user.length) {

        errors.email = 'User not found!';
        return res.status(404).json(errors);
      }

      const originalPassword = user[0].dataValues.password

      bcrypt.compare(password, originalPassword)
        .then(isMatch => {
          if (isMatch) {
            const { id, name } = user[0].dataValues;
            const payload = { id, name }; //jwt payload
            jwt.sign(payload, 'secret', {
              expiresIn: '1d'
            }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
                role: user[0].dataValues.role
              });
            });
          } else {
            errors.password = 'Password not correct';
            return res.status(400).json(errors);
          }
        }).catch(err => console.log(err));
    }).catch(err => res.status(500).json({ err }));
};

// get Users
export async function findAll(req, res) {
  User.findAll()
    .then(user => {
      res.json({ user });
    })
    .catch(err => res.status(500).json({ err }));
};

// fetch specific user
export async function findById(req, res) {
  console.log(req.params.id)
  User.findByPk(req.params.id)
    .then(user => {
      res.json({ user });

    }).catch(err => res.status(500).json({ err }))

};

// delete a user
export async function deleteUser(req, res) {
  const id = req.params.id;
  console.log(id);
  User.destroy({ where: { id } })
    .then(() => res.status.json({ msg: 'User has been deleted successfully!' }))
    .catch(err => res.status(500).json({ msg: 'Failed to delete!' }));
};

// Create Semester 
export async function createSemester(req, res) {
  try {
    let checkdata = await Semester.findOne({ where: { id: req.body.id } });

    if (checkdata) {
      res.json({
        message: "Already Exist",
        data: checkdata
      });
    } else {
      let createdata = await Semester.create(req.body, {
        fields: ['id', 'start', 'end']
      });
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
}

//update semester 
export async function updateSemester(req, res) {
  try {
    let finddata = await Semester.findAll({
      where: {
        id: req.params.s_id
      }
    });
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
}


//Sign up for a semester
export async function signUpSemester(req, res) {
  const userId = req.user[0].dataValues.id
  let { SemesterId } = req.body;
  console.log(userId);
  User.update(
    {
      SemesterId
    },
    { where: { id: userId } }
  )
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(500).json({ err }));
};

// Add course
export async function addCourse(req, res) {
  try {
    let checkdata = await Course.findOne({ where: { id: req.body.id } });
    if (checkdata) {
      res.json({
        message: "Already Exist",
        data: checkdata
      });
    } else {
      let createdata = await Course.create(req.body, {
        fields: ['id', 'name', 'SemesterId']
      });
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
}

// Add Precourse
export async function addPreCourse(req, res) {

  try {
    let checkdata = await PreCourse.findOne({ where: { id: req.body.id } });
    if (checkdata) {
      res.json({
        message: "Already Exist",
        data: checkdata
      });
    } else {
      let createdata = await PreCourse.create(req.body, {
        fields: ['id', 'courseId']
      });
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
}

// get Courses
export async function getCourses(req, res) {
  Course.findAll({
    attributes: ['id', 'name'],
    include: {
      model: PreCourse,
      attributes: ['id']

    }
  })
    .then(course => {
      res.json({ course });
    })
    .catch(err => res.status(500).json({ err }));
};

//Sign up for courses
export async function signUpCourse(req, res) {
  const userId = req.user[0].dataValues.id
  let { courseId } = req.body;
  try {
    let checkdata = await UserCourse.findOne({ where: { courseId: req.body.courseId } });
    if (checkdata) {
      res.json({
        message: "Already Exist",
        data: checkdata
      });
    } else {
      var checkpre = await PreCourse.findAll({
        attributes: ['id', 'courseId'],
        where: {
          courseId: courseId
        }
      });

      if (!checkpre.length) {

        let createdata = await UserCourse.create({ userId: userId, courseId: courseId });
        if (createdata) {
          res.json({
            success: true,
            message: "signUp Successfull",
            data: createdata
          });
        }
      }
      else {
        var x = [];
        var count = 0;
        for (var i = 0; i < checkpre.length; i++) {
          x = await UserCourse.findOne({
            attributes: ['courseId'],
            where: {
              courseId: checkpre[i].id
            }
          })
          if (x instanceof UserCourse) {
            count++;
          }
        }

        if (count == checkpre.length) {
          let done = await UserCourse.create({ userId: userId, courseId: courseId });
          if (done) {
            res.json({
              success: true,
              message: "signUp Successfull",
              data: done
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
}

//set grade
export async function setGrade(req, res) {

  try {

    let createdata = await Grade.create(req.body, {
      fields: ['value', 'result']
    });
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
}

//assign grade to user
export async function setUserGrade(req, res) {

  let { userId, courseId, gradeId, finished } = req.body;

  UserCourse.update(
    {
      gradeId,
      finished
    },
    {
      where: {
        userId: userId,
        courseId: courseId
      }
    }
  )
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(500).json({ err }));
};


//get student course with its grade
export async function getStudentCourse(req, res) {
  UserCourse.findAll({
    attributes: ['courseId'],
    include: {
      model: Grade,
      attributes: ['value', 'result']

    },
    where: {
      userId: req.user[0].dataValues.id
    }
  })
    .then(course => {
      res.json({ course });
    })
    .catch(err => res.status(500).json({ err }));
};

//reset password
export async function resetPassword(req, res) {
  const email = req.user[0].dataValues.email
  const pass = req.user[0].dataValues.password
  let { oldpassword, password } = req.body;

  bcrypt.compare(oldpassword, pass)
    .then(isMatch => {
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            User.update(
              {
                password
              },
              {
                where: {
                  email: email,
                }
              }
            )
              .then(user => {
                res.json({ user });
              })
              .catch(err => {
                res.status(500).json({ err });
              });
          })
        })
      }
    }).catch(err => console.log(err));
}