
var config={};
const userRoles = config.userRoles = {
    studentandmanager: 1,       
    teacherandmanager: 2, 
    student:4,       
    teacher: 8,      
    manager: 16  
}

config.accessLevels = {
    studentandmanager:userRoles.student | userRoles.manager,
    teacherandmanager:userRoles.teacher| userRoles.manager,
    student:userRoles.student,
    teacher:userRoles.teacher,
    manager: userRoles.manager,
                                                    
}

export default config