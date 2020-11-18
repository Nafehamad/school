import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import sgMail from "@sendgrid/mail";
import { Course, PreCourse, Semester, User, UserCourse, Grade, AuthorizedUser, VerifiedUser } from '../relation';
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

var VerifiedUsersRepository = {
    addUser: function(token) {
        return VerifiedUser.create({ userToken: token })
    },

    findByToken: function(token) {
        return VerifiedUser.findAll({
            where: {
                userToken: token
            }
        })
    }

}

export default VerifiedUsersRepository;