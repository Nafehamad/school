import {Role} from '../models/users';
import Sequelize from 'sequelize';

//create role
export async function createRole(req, res) {
    try{
        let checkdata = await Role.findOne({where:{name:req.body.name}});
        console.log(checkdata);
        if(checkdata){
            res.json({
                message:"Already Exist",
                data:checkdata
            });
        }else{
            let createdata = await Role.create(req.body, {
                fields: ['id','name']
            });
            if(createdata){
                res.json({
                    success: true,
                    message:"Role Created Successfully",
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

//get roles
export async function getRoles(req, res) {
    try{
        let getdata = await Role.findAll(req.body);
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


//get role
export async function getRole(req, res) {
    try{
        let createdata = await Role.findByPk(req.params.id);
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


//delete role
export async function deleteRole(req, res) {
    try{
        let deletedata = await Role.destroy({
            where: {
                id: req.params.key
             }
        });
       
        if(deletedata){
            res.json({
                success: true,
                message:"Role deleted Successfully",
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

//update role
export async function updateRoles(req, res) {
    try{
        let finddata = await Role.findAll({
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
            message:"Role updated Successfully",
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
