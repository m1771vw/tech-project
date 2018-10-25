let db = require('../config/db');

const index = (req, res) => {
    res.send({ message: 'Employees Index' })
}

const getAllEmployees = async (req, res) => {
    try {
        let employees = await db.any('SELECT * FROM employees')
        res.send({ employees })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const getEmployeeById = async (req, res) => {
    try {
        let employee_id = parseInt(req.params.id);
        let employee = await db.one('SELECT * FROM employees WHERE employee_id = $1', employee_id);
        res.send({ employee })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const addEmployee = async (req, res) => {
    try {
        let { first_name, last_name, position } = req.body;
        let employee = await db.one(
            'INSERT INTO employees(first_name, last_name, position)' +
            'VALUES($1, $2, $3) RETURNING employees.employee_id, employees.first_name, employees.last_name, employees.position', [first_name, last_name, position]
        )
        res.status(200).send({ employee })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const updateEmployee = async (req, res) => {
    try {
        let { first_name, last_name, position } = req.body;
        let employee_id = parseInt(req.params.id);
        await db.any('UPDATE employees SET first_name = $1, last_name = $2, position = $3 WHERE employee_id = $4',
            [first_name, last_name, position, employee_id])
        let updatedEmployee = await db.one('SELECT * FROM employees WHERE employee_id = $1', employee_id);
        res.status(200).json({ employee: updatedEmployee })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        let employee_id = parseInt(req.params.id);
        let employee = await db.one('SELECT * FROM employees WHERE employee_id = $1', employee_id);
        await db.none('DELETE FROM employees WHERE employee_id = $1', employee_id);
        res.status(200).send({ message: employee });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    index,
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    getEmployeeById,
    updateEmployee,
}
