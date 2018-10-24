let db = require('../config/db');

const index = (req, res) => {
    res.send({ message: 'Employees Index' })
}

const getAllEmployees = async (req, res) => {
    let employees = await db.any('SELECT * FROM employees')
    res.send({
        employees
    })
}

const addEmployee = async (req, res) => {
    try {
        let { first_name, last_name, position } = req.body;
        let newEmployee = await db.one(
            'INSERT INTO employees(first_name, last_name, position)'+
            'VALUES($1, $2, $3) RETURNING employees.first_name, employees.last_name', [first_name, last_name, position]
        )
        res.json(newEmployee)
    } catch (e) {
        res.json(e)
    }
}

const deleteEmployee = async (req, res) => {
    try {
        let { employee_id } = req.body 
    } catch (e) {
        res.json(e)
    }
}









module.exports = {
    index,
    getAllEmployees,
    addEmployee,
}