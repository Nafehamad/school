
import {Semester, User} from '../models/model';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import Sequelize from 'sequelize';
import validateRegisterForm from '../validation/register';
import validateLoginForm from '../validation/login';
import bcrypt from 'bcryptjs';

var userId=2
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
  
   if(!isValid) {
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
    
    if(!isValid) {
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
      userId=user[0].dataValues.id
      
      let originalPassword = user[0].dataValues.password
      bcrypt.compare(password, originalPassword)
      .then(isMatch => {
          if (isMatch) {
            const { id, name } = user[0].dataValues;
            const payload = { id, name }; //jwt payload
            jwt.sign(payload, 'secret', { 
              expiresIn: 3600 
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
    }).catch(err => res.status(500).json({err}));
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
       .then(user =>{
           res.json({user});

       }).catch(err => res.status(500).json({err}))
    
  };

  // delete a user
  export async function deleteUser(req, res) {
      const id=req.params.id;
      console.log(id);
      User.destroy({ where: { id } })
      .then(() => res.status.json({ msg: 'User has been deleted successfully!' }))
      .catch(err => res.status(500).json({ msg: 'Failed to delete!' }));
  };

// Create Semester 
export async function createSemester(req, res) {
  try{
      let checkdata = await Semester.findOne({where:{id:req.body.id}});
      console.log(checkdata);
      if(checkdata){
          res.json({
              message:"Already Exist",
              data:checkdata
          });
      }else{
          let createdata = await Semester.create(req.body, {
              fields: ['id','start_date','end_date']
          });
          if(createdata){
              res.json({
                  success: true,
                  message:"Semester Created Successfully",
                  data:createdata
              });
          }
      }
  }catch(err){
      console.log(err);
      res.status(500).json({
          success: false,
          message:"Something went wrong!"
      })
  }
}

//update semester
export async function updateSemester(req, res) {
  try{
      let finddata = await Semester.findAll({
          where:{
              id:req.params.s_id
          }
      });
      if(finddata.length > 0){
          finddata.forEach(async data =>{
              await data.update(req.body)
          })
      }
      return res.json({
          success: true,
          message:"Semester updated Successfully",
          data:finddata
      });
  }catch(err){
      console.log(err);
      res.status(500).json({
          success: false,
          message:"Something went wrong!"
      })
  }
}


//Sign up for a semester
export async function signUpSemester(req, res) {
  const userId=req.user[0].dataValues.id
  let  {SemesterId} = req.body;
  console.log(userId);
  User.update(
    {
      SemesterId
    },
    { where: {  id:userId  }}
  )
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(500).json({ err }));
};