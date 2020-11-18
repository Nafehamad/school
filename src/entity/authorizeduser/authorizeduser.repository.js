import { AuthorizedUser } from '../relation';


var AuthorizedUserRepository = {
    addAuth: function (id, token) {
        return AuthorizedUser.create({ userId: id, userToken: token })
    },

    findById: function (id) {
        return AuthorizedUser.findOne({ where: { userId: id } })
    },

    deleteById: function (id) {
        return AuthorizedUser.destroy({ where: { userId: id } })
    },

}

export default AuthorizedUserRepository;