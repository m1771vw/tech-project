let db = require('../config/db');

const index = (req, res) => {
    res.send({ message: 'Projects Index' })
}

const getAllProjects = async (req, res) => {
    try {
        let projects = await db.any('SELECT p.project_id, p.project_name, p.project_start_date, p.project_start_date, p.project_end_date FROM projects AS p')
        res.status(200).send({ projects })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

// const getEmployeesFromProjectId = async (req, res) => {
//     try {
//         let project_id = req.params.id;
//         let employees = await db.any('SELECT * FROM projects INNER JOIN project_roles ON projects.project_id = project_roles.project_id WHERE projects.project_id = 1')
//         res.send({ employees })
//     }
// }

const getProjectById = async (req, res) => {
    try {
        let project_id = parseInt(req.params.id);
        let project = await db.one('SELECT p.project_id, p.project_name, p.project_start_date, p.project_start_date, p.project_end_date FROM projects AS p WHERE project_id = $1', project_id);
        res.status(200).send({ project })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const getEmployeesInProject = async (req , res) => {
    try {
        let project_id = parseInt(req.params.id);
        let employees = await db.any(
            `SELECT p.project_id, p.project_name, p.project_start_date, p.project_end_date, 
            pr.employee_id, pr.role,
            e.first_name, e.last_name, e.position
            FROM projects as p
            INNER JOIN project_roles as pr ON pr.project_id = p.project_id
            INNER JOIN employees as e ON pr.employee_id = e.employee_id
            WHERE p.project_id = $1`,
            project_id)
            res.status(200).send({ employees })
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

const getAssignmentByProjectId = async (req, res) => {
    try {
        let project_id = parseInt(req.params.id);
        let assignments = await db.any(
            `SELECT a.assignment_id, a.assignment_name, a.assignment_start_date, a.assignment_end_date, a.assignment_est_hours, a.assignment_final_hours,
            p.project_id,
            s.status_id, s.status_name, 
            ea.emp_assign_id, ea.employee_id,
            e.first_name, e.last_name
            FROM assignments as a
            INNER JOIN projects as p ON p.project_id = a.project_id
            INNER JOIN status_types as s ON s.status_id = a.status_id
            INNER JOIN employee_assignments as ea ON ea.assignment_id = a.assignment_id
            INNER JOIN employees as e ON e.employee_id = ea.employee_id
            WHERE p.project_id = $1`,
            project_id)
            res.status(200).send({ assignments })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

// SELECT a.assignment_id, a.assignment_name, a.assignment_start_date, a.assignment_end_date, a.assignment_est_hours, a.assignment_final_hours, p.project_id, p.project_name, s.status_id, s.status_name
// FROM Assignments as a
// INNER JOIN Status_Types as s ON s.status_id = a.status_id
// INNER JOIN Projects as p ON p.project_id = a.project_id;

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
        await db.none('DELETE FROM project_roles WHERE project_id = $1', project_id);
        await db.none('DELETE FROM projects WHERE project_id = $1', project_id);
        res.status(200).send({ message: project })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

const getAllProjectRoles = async (req, res) => {
    try {
        let role = await db.any('SELECT pr.project_roles_id, e.employee_id, e.first_name, e.last_name, p.project_id, p.project_name, pr.role ' +
                                'FROM project_roles AS pr ' +
                                'INNER JOIN employees AS e ON e.employee_id = pr.employee_id ' +
                                'INNER JOIN projects AS p ON p.project_id = pr.project_id');
        console.log(role)
        res.send({ role })
    } catch (e) {
        res.status(500).json({ message: e.message })
        res.status(404).json({ message: e.message  })
    }
}

const createProjectRole = async (req,res) => {
    try {
        let { employee_id, project_id, role } = req.body;
        let project_role = await db.one(
            `INSERT INTO project_roles(employee_id, project_id, role)
            VALUES($1, $2, $3)
            RETURNING project_roles.employee_id, project_roles.project_id, project_roles.role`,
            [employee_id, project_id, role ])
            res.status(200).send({ project_role })
    } catch(e) {
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
        let role = await db.one('SELECT project_roles_id FROM project_roles WHERE project_roles_id = $1', project_role_id);
        await db.none('DELETE FROM project_roles WHERE project_roles_id = $1', project_role_id);
        res.status(200).send({ role })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}





module.exports = {
    index, getAllProjects, getProjectById, 
    addProject, deleteProject, updateProject, 
    getAllProjectRoles, updateProjectRole, deleteProjectRole,
    getEmployeesInProject, getAssignmentByProjectId, createProjectRole
}
