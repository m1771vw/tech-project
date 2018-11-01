let db = require('../config/db');


const index = (req, res) => {
    res.send({ message: 'Assignments Index' })
}

const getAllAssignments = async (req, res) => {
    try {
        let assignments = await db.any(
            'SELECT a.assignment_id, a.assignment_name, a.assignment_start_date, a.assignment_end_date, a.assignment_est_hours, a.assignment_final_hours, ' +
            'p.project_id, p.project_name, s.status_id, s.status_name, ' +
            'ea.emp_assign_id, ea.assignment_id, ea.employee_id, ' +
            'e.first_name, e.last_name ' +
            'FROM Assignments as a ' +
            'INNER JOIN Status_Types as s ON s.status_id = a.status_id ' +
            'INNER JOIN Projects as p ON p.project_id = a.project_id ' +
            'INNER JOIN employee_assignments as ea ON a.assignment_id = ea.assignment_id ' +
            'INNER JOIN employees as e ON e.employee_id = ea.employee_id')
        res.status(200).send({ assignments })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const getAllBlockedAssignments = async(req, res) => {
    try {
        let assignments = await db.any(
            'SELECT a.assignment_id, a.assignment_name, a.assignment_start_date, a.assignment_end_date, a.assignment_est_hours, a.assignment_final_hours, ' +
            'p.project_id, p.project_name, s.status_id, s.status_name, ' +
            'ea.emp_assign_id, ea.assignment_id, ea.employee_id, ' +
            'e.first_name, e.last_name ' +
            'FROM Assignments as a ' +
            'INNER JOIN Status_Types as s ON s.status_id = a.status_id ' +
            'INNER JOIN Projects as p ON p.project_id = a.project_id ' +
            'INNER JOIN employee_assignments as ea ON a.assignment_id = ea.assignment_id ' +
            'INNER JOIN employees as e ON e.employee_id = ea.employee_id ' +
            "WHERE s.status_name = 'Blocked'")
        res.status(200).send({ assignments })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
const getAllAssignmentsOrdered = async(req, res) => {
    try {
        let assignments = await db.any(
            'SELECT a.assignment_id, a.assignment_name, a.assignment_start_date, a.assignment_end_date, a.assignment_est_hours, a.assignment_final_hours, p.project_id, p.project_name, s.status_id, s.status_name ' +
            'FROM Assignments as a ' +
            'INNER JOIN Status_Types as s ON s.status_id = a.status_id ' +
            'INNER JOIN Projects as p ON p.project_id = a.project_id ' +
            'ORDER BY a.assignment_id ASC')
        res.status(200).send({ assignments })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}


// SELECT a.assignment_id, a.assignment_name, a.assignment_start_date, a.assignment_end_date, a.assignment_est_hours, a.assignment_final_hours, p.project_id, p.project_name, s.status_id, s.status_name
// FROM Assignments as a
// INNER JOIN Status_Types as s ON s.status_id = a.status_id
// INNER JOIN Projects as p ON p.project_id = a.project_id;

// SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
// FROM Orders
// INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;

const getAssignmentById = async (req, res) => {
    try {
        let assignment_id = parseInt(req.params.id);
        let assignment = await db.one(
`SELECT a.assignment_id, a.assignment_name, a.assignment_start_date, a.assignment_end_date, a.assignment_est_hours, a.assignment_final_hours, 
        p.project_id, p.project_name, s.status_id, s.status_name,
        ea.emp_assign_id, ea.employee_id,
        e.first_name, e.last_name
FROM Assignments as a
INNER JOIN Status_Types as s ON s.status_id = a.status_id
INNER JOIN Projects as p ON p.project_id = a.project_id
INNER JOIN employee_assignments as ea ON ea.assignment_id = a.assignment_id
INNER JOIN employees as e ON e.employee_id = ea.employee_id
WHERE a.assignment_id = $1;`
            , assignment_id);
        res.status(200).send({ assignment })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const addAssignment = async (req, res) => {
    try {
        let {
            assignment_name,
            project_id,
            status_id,
            assignment_start_date,
            assignment_end_date,
            assignment_est_hours,
            assignment_final_hours
        } = req.body;
        let assignment = await db.one(
            'INSERT INTO assignments(assignment_name, project_id, status_id, assignment_start_date, assignment_end_date, assignment_est_hours, assignment_final_hours) ' +
            'VALUES($1, $2, $3, $4, $5, $6, $7) ' +
            'RETURNING assignments.assignment_id, assignments.assignment_name, assignments.project_id, assignments.status_id, assignments.assignment_start_date, assignments.assignment_end_date, assignments.assignment_est_hours, assignments.assignment_final_hours ',
            [assignment_name,
                project_id,
                status_id,
                assignment_start_date,
                assignment_end_date,
                assignment_est_hours,
                assignment_final_hours]
        )
        res.status(200).send({ assignment })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const updateAssignment = async (req, res) => {
    try {
        let { assignment_name,
            project_id,
            status_id,
            assignment_start_date,
            assignment_end_date,
            assignment_est_hours,
            assignment_final_hours
        } = req.body;
        let assignment_id = parseInt(req.params.id);
        await db.any('UPDATE assignments ' +
            'SET assignment_name = $1, status_id = $2, assignment_start_date = $3, assignment_end_date = $4, assignment_est_hours = $5, assignment_final_hours = $6 ' +
            'WHERE assignment_id = $7',
            [assignment_name,
            status_id,
            assignment_start_date,
            assignment_end_date,
            assignment_est_hours,
            assignment_final_hours,
            assignment_id])
        let updatedAssignment = await db.one('SELECT * FROM assignments WHERE assignment_id = $1', assignment_id);
        res.status(200).json({ message: updatedAssignment })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const deleteAssignment = async (req, res) => {
    try {
        let assignment_id = parseInt(req.params.id);
        let assignment = await db.one('SELECT * FROM assignments WHERE assignment_id = $1', assignment_id);
        console.log("Assignment MESSAGE:", assignment)
        await db.none(`DELETE FROM employee_assignments WHERE assignment_id = $1`, assignment_id);
        await db.none('DELETE FROM assignments WHERE assignment_id = $1', assignment_id);
        res.status(200).send({ message: assignment })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

module.exports = { index, getAllAssignments, getAllBlockedAssignments, getAllAssignmentsOrdered, getAssignmentById, addAssignment, updateAssignment, deleteAssignment }