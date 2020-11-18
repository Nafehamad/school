import { User } from '../relation';


var UsersRepository = {
    getAllUser: function () {
        return User.findAll()
    },

    findByEmail: function (email) {
        return User.findAll({
            where: {
                email: email
            }
        })
    },

    findUserById: function (userId) {
        return User.findByPk(userId)
    },

    addUser: function (newUser) {
        return User.create(newUser)
    },

    setVerfication: function (email) {
        return User.update({ isVerified: true }, { where: { email: email } })
    },

    setPassword: function (password, email) {
        return User.update({ password }, { where: { email: email } })
    },

    setsemester: function (SemesterId, userId) {
        return User.update({ SemesterId }, { where: { id: userId } })
    },

    updateProfile: function (name, phone, email) {
        return User.update({ name, phone }, { where: { email: email, } })
    },

    deleteUserById: function (id) {
        return User.destroy({ where: { id } })
    },


}

export default UsersRepository;