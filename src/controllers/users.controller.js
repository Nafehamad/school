import {User,Role,UserRole} from '../models/users';
import Sequelize from 'sequelize';


//create user
export async function createUser(req, res) {
    try{
       let checkdata = await User.findOne({where:{email:req.body.email}});
        console.log(checkdata);
        if(checkdata){
            res.json({
                message:"Already Exist",
                data:checkdata
            });
        }else{
            let createdata = await User.create(req.body, {
                fields: ['id','name', 'email', 'password', 'phone',]
            });
            req.body.roles.forEach((item) => {
                const role = Role.findByPk(item.id);
                if (!role) {
                    return res.status(400);
                  }
                  const userrole = {
                    UserId: createdata.id,
                    RoleId: item.id,
                  }
                  const saveduserrole = UserRole.create(userrole);
                  
            });
               if(createdata){
                res.json({
                    success: true,
                    message:"User Created Successfully",
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

//get users
export async function getUsers(req, res) {
    try{
        let getdata = await User.findAll({include: Role});
        if(getdata){           
            res.json({
                success: true,
                message:"User Fetch Successfully",
                data:getdata
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:"Something went wrong!"
        })
    }
}

//get user
export async function getUser(req, res) {
    try{
        let createdata = await User.findByPk(req.body.id);
        if(createdata){
            res.json({
                success: true,
                message:"User fetch Successfully",
                data:createdata
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:"Something went wrong!"
        })
    }
}

//delete user
export async function deleteUser(req, res) {
    try{
        let deletedata = await User.destroy({
            where:{
                id:req.body.id
            }
        });
        console.log(deletedata);
        if(deletedata){
            res.json({
                success: true,
                message:"User Created Successfully",
                data:deletedata
            });
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message:"Something went wrong!"
        })
    }
}

//update users
export async function updateUsers(req, res) {
    try{
        let finddata = await User.findAll({
            where:{
                id:req.body.id
            }
        });
        if(finddata.length > 0){
            finddata.forEach(async data =>{
                await data.update(req.body)
            })
        }
        return res.json({
            success: true,
            message:"User Created Successfully",
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
