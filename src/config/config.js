
var config={};
const userRoles = config.userRoles = {
    all:1,
    studentandmanager: 2,       
    teacherandmanager: 4, 
    student:8,       
    teacher: 16,      
    manager: 32  
}

config.accessLevels = {
    all:userRoles.all|userRoles.student | userRoles.manager | userRoles.teacher | userRoles.studentandmanager|userRoles.teacherandmanager,
    studentandmanager:userRoles.student | userRoles.manager,
    teacherandmanager:userRoles.teacher| userRoles.manager,
    student:userRoles.student,
    teacher:userRoles.teacher,
    manager: userRoles.manager,
                                                    
}

export default config