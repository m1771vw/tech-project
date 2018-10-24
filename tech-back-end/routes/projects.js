const router = require('express').Router();
const {
    index, getAllProjects, getProjectById, addProject, deleteProject, updateProject
} = require('./../controllers/projects-controllers');

router.get('/', index);
router.get('/all', getAllProjects);
router.get('/id/:id', getProjectById);
router.post('/', addProject);
router.put('/:id', updateProject)
router.delete('/:id', deleteProject);

module.exports = router;