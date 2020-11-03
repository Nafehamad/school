import config from '../config/config' 

const allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        const { role } = req.user[0].dataValues;
        if(!(accessLevel & config.userRoles[role])) {
            res.status(403).json({ msg: 'You do not have access to this'})
            return;
        }

        callback(req, res)
    }

    return checkUserRole;
}

export { allowOnly }