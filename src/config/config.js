


var config={};
const userRoles = config.userRoles = {
    guest: 1,       
    student: 2,        
    teacher: 4,      
    manager: 8   
}

config.accessLevels = {
    guest: userRoles.guest | userRoles.student | userRoles.teacher | userRoles.manager, 
    student: userRoles.student | userRoles.manager,                    
    teacher: userRoles.teacher | userRoles.manager,                                    
    manager: userRoles.manager,                                                 
}

export default config