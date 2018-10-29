const router = require('express').Router();
const {
    index, getAllProjects, getProjectById, addProject, 
    deleteProject, updateProject, getAllProjectRoles, 
    updateProjectRole, deleteProjectRole, getEmployeesInProject,
    getAssignmentByProjectId
} = require('./../controllers/projects-controllers');
const { isAuthorized } = require('../middleware/authorization');



router.get('/', isAuthorized, index);
router.get('/all', isAuthorized, getAllProjects);
router.get('/id/:id', isAuthorized, getProjectById);
router.post('/', isAuthorized, addProject);
router.put('/:id', isAuthorized, updateProject)
router.delete('/:id', isAuthorized, deleteProject);
router.get('/id/:id/employees', isAuthorized, getEmployeesInProject)
router.get('/id/:id/assignments', isAuthorized, getAssignmentByProjectId)
router.get('/roles/all', isAuthorized, getAllProjectRoles)
router.put('/roles/:id', isAuthorized, updateProjectRole)
router.delete('/roles/:id', isAuthorized, deleteProjectRole)

module.exports = router;