const router = require('express').Router();
const {
    index, getAllProjects, getProjectById, addProject, deleteProject, updateProject, getAllProjectRoles, updateProjectRole, deleteProjectRole
} = require('./../controllers/projects-controllers');

router.get('/', index);
router.get('/all', getAllProjects);
router.get('/id/:id', getProjectById);
router.post('/', addProject);
router.put('/:id', updateProject)
router.delete('/:id', deleteProject);
router.get('/projectroles/all', getAllProjectRoles)
router.put('/projectroles/:id', updateProjectRole)
router.delete('/projectroles/:id', deleteProjectRole)

module.exports = router;