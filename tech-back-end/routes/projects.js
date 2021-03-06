const router = require('express').Router();
const {
    index, getAllProjects, getProjectById, addProject, 
    deleteProject, updateProject, getAllProjectRoles, 
    updateProjectRole, deleteProjectRole, getEmployeesInProject,
    getAssignmentByProjectId, createProjectRole, getAllProjectRolesForEmployee
} = require('./../controllers/projects-controllers');
const { isAuthorized } = require('../middleware/authorization');



router.get('/', isAuthorized, index);
router.get('/all', isAuthorized, getAllProjects);
router.get('/id/:id', isAuthorized, getProjectById);
router.post('/', isAuthorized, addProject);
router.put('/id/:id', isAuthorized, updateProject)
router.delete('/:id', isAuthorized, deleteProject);
router.get('/id/:id/employees', isAuthorized, getEmployeesInProject)
router.get('/id/:id/assignments', isAuthorized, getAssignmentByProjectId)
router.get('/roles/all', isAuthorized, getAllProjectRoles)
router.get('/roles/all/employee/id/:id', isAuthorized, getAllProjectRolesForEmployee)
router.post('/roles/', isAuthorized, createProjectRole)
router.put('/roles/:id', isAuthorized, updateProjectRole)
router.delete('/roles/:id', isAuthorized, deleteProjectRole)

module.exports = router;