let db = require('../config/db');

const index = (req, res) => {
    res.send({ message: 'Projects Index' })
}

const getAllProjects = async (req, res) => {
    try {
        let projects = await db.any('SELECT p.project_id, p.project_name, p.project_start_date, p.project_start_date, p.project_end_date FROM projects AS p')
        res.send({ projects })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const getProjectById = async (req, res) => {
    try {
        let project_id = parseInt(req.params.id);
        let project = await db.one('SELECT * FROM projects WHERE project_id = $1', project_id);
        res.send({ project })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const addProject = async (req, res) => {
    try {
        let { project_name, project_start_date, project_end_date } = req.body;
        let project = await db.one(
            'INSERT INTO projects(project_name, project_start_date, project_end_date)' +
            'VALUES($1, $2, $3) RETURNING projects.project_id, projects.project_name, projects.project_end_date, projects.project_end_date',
            [project_name, project_start_date, project_end_date]
        )
        res.status(200).send({ project })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const updateProject = async (req, res) => {
    try {
        let { project_name, project_start_date, project_end_date } = req.body;
        let project_id = parseInt(req.params.id);
        await db.any('UPDATE projects SET project_name = $1, project_start_date = $2, project_end_date = $3 WHERE project_id = $4',
            [project_name, project_start_date, project_end_date, project_id])
        let updatedProject = await db.one('SELECT * FROM projects WHERE project_id = $1', project_id);
        res.status(200).json({ message: updatedProject })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const deleteProject = async (req, res) => {
    try {
        let project_id = parseInt(req.params.id);
        let project = await db.one('SELECT * FROM projects WHERE project_id = $1', project_id);
        console.log("PROJECT MESSAGE:", project)
        await db.none('DELETE FROM projects WHERE project_id = $1', project_id);
        res.status(200).send({ message: project })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

const getAllProjectRoles = async (req, res) => {
    try {
        let role = await db.any('SELECT * FROM project_roles');
        console.log(role)
        res.send({ role })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const updateProjectRole = async (req, res) => {
    try {
        let { role } = req.body;
        let project_roles_id = parseInt(req.params.id);
        await db.any('UPDATE project_roles SET role = $1 WHERE project_roles_id = $2',
        [role, project_roles_id])
        let updatedProjectRole = await db.one('SELECT * FROM project_roles WHERE project_roles_id = $1', project_roles_id);
        res.status(200).json({ message: updatedProjectRole })
    } catch (e) {
        res.status(500).json({ message: e })
    }
}

const deleteProjectRole = async (req, res) => {
    try {
        let project_role_id = req.params.id;
        let role = await db.one('SELECT * FROM project_roles WHERE project_roles_id = $1', project_role_id);
        await db.none('DELETE FROM project_roles WHERE project_roles_id = $1', project_role_id);
        res.status(200).send({ role })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}





module.exports = { 
    index, getAllProjects, getProjectById, addProject, deleteProject, updateProject, getAllProjectRoles, updateProjectRole, deleteProjectRole 
}
