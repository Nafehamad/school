import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sgMail from '../../services/helpEmail';
import { sequelize } from '../../database/database';
import validateRegisterForm from '../../validation/register';
import validateLoginForm from '../../validation/login';
import UsersRepository from './user.repository';
import VerifiedUsersRepository from '../verifieduser/verifieduser.repository';
import UserCourseRepository from '../usercourse/usercourse.repository';
import PreCourseRepository from '../precourse/precourse.repository';
import { Course, PreCourse, Semester, User, UserCourse, Grade, AuthorizedUser, VerifiedUser } from '../relation';
import AuthorizedUserRepository from '../authorizeduser/authorizeduser.repository';
var transaction;




//SignUp
export async function signUp(req, res) {
  const { errors, isValid } = validateRegisterForm(req.body);
  const { id, name, email, password, phone, role, SemesterId } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  await UsersRepository.findByEmail(email)
    .then(user => {
      if (user.length) {
        return res.status(400).json({ email: 'Email already exists!' });
      } else {
        let newUser = { id, name, email, password, phone, role, SemesterId };
        const payload = { id, name };
        jwt.sign(payload, 'secret', {
          expiresIn: '1d'
        }, (err, token) => {
          VerifiedUsersRepository.addUser(token)
            .then(userNotVerified => {
              if (userNotVerified instanceof VerifiedUser) {
                const msg = {
                  to: email,
                  from: 'nafeahammad90@gmail.com',
                  subject: 'Verified Your Email',
                  text: ` Use This Token {${token}} , To Verify Your Email `,
                  html: ` Use This Token<strong> ${token} </strong>, To Verify Your Email`,
                };
                sgMail.send(msg).then(() => {
                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      UsersRepository.addUser(newUser)
                        .then(user => {
                          res.status(200).json("Check Your Email to Verify It")
                        })
                        .catch(err => {
                          res.status(500).json({ err });
                        });
                    });
                  });
                }).catch((error) => {
                  console.log('error')
                });
              }
            })
            .catch(err => {
              console.log('b')
              res.status(500).json({ err });
            });
        });
      }
    });
};


//verify email
export async function verifyEmail(req, res) {
  try {
    transaction = await sequelize.transaction();
    const { email, userToken } = req.body
    await UsersRepository.findByEmail(email)
      .then(user => {
        if (user[0] instanceof User) {

          if (user[0].dataValues.isVerified) {
            return res.json('This email is verifieded')
          }
          else {
            VerifiedUsersRepository.findByToken(userToken)
              .then(() => {
                UsersRepository.setVerfication(email)
                  .then(() => {
                    return res.status(200).json('Email verified correctly')
                  })
                  .catch(err => res.status(500).json({ err }))
              })
              .catch(err => res.status(500).json({ err }))
          }
        }
      })
      .catch(err => res.status(500).json({ err }))
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

//Login
export async function login(req, res) {
  try {
    transaction = await sequelize.transaction();
    const { errors, isValid } = validateLoginForm(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    await UsersRepository.findByEmail(email)
      .then(user => {
        if (!user.length) {
          errors.email = 'User not found!';
          return res.status(404).json(errors);
        }
        if (user[0].dataValues.isVerified) {
          const originalPassword = user[0].dataValues.password
          bcrypt.compare(password, originalPassword)
            .then(isMatch => {
              if (isMatch) {
                const { id, name } = user[0].dataValues;
                const payload = { id, name }; //jwt payload
                jwt.sign(payload, 'secret', {
                  expiresIn: 120
                }, (err, token) => {
                  AuthorizedUserRepository.findById(user[0].dataValues.id)
                    .then(user1 => {
                      if ((user1 instanceof AuthorizedUser)) {
                        AuthorizedUserRepository.deleteById(user[0].dataValues.id)
                          .then(() => {
                            AuthorizedUser.addAuth(user[0].dataValues.id, token)
                              .then(x => {
                                if (x instanceof AuthorizedUser) {
                                  res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                    role: user[0].dataValues.role
                                  })
                                }
                              })
                              .catch(err => console.log(err));
                          })
                          .catch(err => res.json({ err }))

                      }
                      else {
                        const x = AuthorizedUserRepository.addAuth(user[0].dataValues.id, token)
                          .then(x => {
                            if (x instanceof AuthorizedUser) {
                              res.json({
                                success: true,
                                token: 'Bearer ' + token,
                                role: user[0].dataValues.role
                              })
                            }
                          })
                          .catch(err => console.log(err));
                      }
                    })
                    .catch(err => console.log(err));
                });
              } else {
                errors.password = 'Password not correct';
                return res.status(400).json(errors);
              }
            })
            .catch(err => console.log(err));
        }
        else {
          return res.json('You need to verified your email')
        }
      }).
      catch(err => res.status(500).json({ err }));
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};



// get Users
export async function getAllUsers(req, res) {
  try {
    transaction = await sequelize.transaction();
    await UsersRepository.getAllUser()
      .then(user => {
        res.json({ user })
      })
      .catch(err => {
        res.status(500).json({ err })
      })
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

// fetch specific user
export async function getUser(req, res) {
  try {
    transaction = await sequelize.transaction();
    const userId = req.params.id
    await UsersRepository.findUserById(userId)
      .then(user => {
        res.json({ user });

      }).catch(err => res.status(500).json({ err }))
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

// delete a user
export async function deleteUser(req, res) {
  try {
    transaction = await sequelize.transaction();
    const id = req.params.id;
    UsersRepository.deleteById(id)
      .then(() => res.status.json({ msg: 'User has been deleted successfully!' }))
      .catch(err => res.status(500).json({ msg: 'Failed to delete!' }));
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

//logout
export async function logout(req, res) {
  try {
    transaction = await sequelize.transaction();
    await AuthorizedUserRepository.deleteById(req.user[0].dataValues.id)
      .then(() => res.status(200).json({ msg: 'You are logged out' }))
      .catch(err => res.status(500).json({ msg: 'Failed to delete!' }));
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

//forget
export async function forget(req, res) {
  try {
    transaction = await sequelize.transaction();
    function between(min, max) {
      return Math.floor(
        Math.random() * (max - min) + min
      )
    }
    const { email } = req.body
    await UsersRepository.findByEmail(email)
      .then(user => {
        if (user[0] instanceof User) {
          var password = ""
          var genPass = between(100000, 2000000)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(genPass.toString(), salt, (err, hash) => {
              if (err) throw err
              password = hash;
              UsersRepository.setPassword(password, email)
                .then(x => {
                  const msg = {
                    to: email,
                    from: 'nafeahammad90@gmail.com',
                    subject: 'Your New Password',
                    text: `This is Your Password ${genPass},Please Login Into App and Change it`,
                    html: `<strong>This is Your Password ${genPass} ,Please Login Into App and Change it</strong>`,
                  };
                  sgMail.send(msg).then(() => {
                    res.status(200).json("Message sent to your email")
                  }).catch((error) => {
                    console.log(error.response.body)

                  })
                })
                .catch(err => {
                  res.status(500).json({ err });
                });
            });
          });

        }
      }).catch(() => res.send(err))
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

//reset password
export async function resetPassword(req, res) {
  try {
    transaction = await sequelize.transaction();
    const email = req.user[0].dataValues.email
    const pass = req.user[0].dataValues.password
    const { oldpassword, password } = req.body;

    await bcrypt.compare(oldpassword, pass)
      .then(isMatch => {
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              const newPassword = hash;
              UsersRepository.setPassword(newPassword, email)
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
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};

//Sign up for a semester
export async function signUpSemester(req, res) {
  try {
    transaction = await sequelize.transaction();
    const userId = req.user[0].dataValues.id
    const { SemesterId } = req.params.s_id;
    await UsersRepository.setsemester(SemesterId, userId)
      .then(user => res.status(200).json({ user }))
      .catch(err => res.status(500).json({ err }));
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};


//update profile
export async function updateProfile(req, res) {
  try {
    transaction = await sequelize.transaction();
    const { name } = req.params.name;
    const { phone } = req.params.phone;
    UsersRepository.updateProfile(name, phone, req.user[0].dataValues.email)
      .then(user => res.status(200).json({ user }))
      .catch(err => res.status(500).json({ err }));
    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
};





