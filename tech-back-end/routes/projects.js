const router = require('express').Router();
const {
    index, getAllProjects, getProjectById, addProject, 
    deleteProject, updateProject, getAllProjectRoles, 
    updateProjectRole, deleteProjectRole, getEmployeesInProject,
    getAssignmentByProjectId
} = require('./../controllers/projects-controllers');

router.get('/', index);
router.get('/all', getAllProjects);
router.get('/id/:id', getProjectById);
router.post('/', addProject);
router.put('/:id', updateProject)
router.delete('/:id', deleteProject);
router.get('/id/:id/employees', getEmployeesInProject)
router.get('/id/:id/assignments', getAssignmentByProjectId)
router.get('/roles/all', getAllProjectRoles)
router.put('/roles/:id', updateProjectRole)
router.delete('/roles/:id', deleteProjectRole)

module.exports = router;