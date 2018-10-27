let db = require('../config/db');

const index = (req, res) => {
    res.send({message: "Welcome to Status Types API"})
};

const getAllStatusTypes = async (req, res) => {
    try {
        let statusTypes = await db.any(
            `
            SELECT status_id, status_name
            FROM status_types
            `
        );
        res.status(200).send({ statusTypes });
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
};

const getStatusTypeById = async (req, res) => {
    try {
        let status_id = parseInt(req.params.id);
        let statusType = await db.one(`SELECT status_id, status_name 
                                     FROM status_types 
                                     WHERE status_id = $1`, status_id);
        res.status(200).send({ statusType })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const addStatusType = async (req, res) => {
    try {
        let { status_name } = req.body;
        let statusType = await db.one(
            'INSERT INTO Status_Types(status_name)' +
            'VALUES($1) ' +
            'RETURNING Status_Types.status_name', [status_name]
        )
        res.status(200).send({ statusType })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const updateStatusType = async (req, res) => {
    try {
        let { status_name } = req.body;
        let status_id = parseInt(req.params.id);
        await db.any('UPDATE Status_Types SET status_name = $1 WHERE status_id = $2',
            [status_name, status_id])
        let updatedStatus = await db.one('SELECT * FROM Status_Types WHERE status_id = $1', status_id);
        res.status(200).json({ statusType: updatedStatus })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const deleteStatusType = async (req, res) => {
    try {
        let status_id = parseInt(req.params.id);
        let statusType = await db.one('SELECT * FROM Status_Types WHERE status_id = $1', status_id);
        await db.none('DELETE FROM Status_Types WHERE status_id = $1', status_id);
        res.status(200).send({ statusType });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

module.exports =  { index, getAllStatusTypes, getStatusTypeById, addStatusType, updateStatusType, deleteStatusType }