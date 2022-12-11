const client = require("./db");

const createNote = (req, res) => {
    try {
        const { name, password, hp } = req.body;

        if (!req.body) {
            throw Error("Send note in request body");
        }

        client.query(
            "INSERT INTO users (name, password, hp) VALUES ($1, $2, $3)",
            [ name, password, hp],
            (err, data) => {
                res.status(201).json({
                    error: null,
                    message: "Created new users",
                });
            }
            );
    } catch (error) {
        res.status(500).json({
            error: error.TypeError,
            message: "Failed to create new note",
        });
    }
};

const getNotes = (req, res) => {
    try {
        client.query("SELECT * FROM users", (err, data) => {
            if (err) throw err;
            res.status(201).json({
                data: data.rows,
            });
        });
    } catch (error) {
        res.status(500).json({
            err: error.message,
            data: null,
        });
    }
};


const getNoteById = (req, res) => {
    try {
        const { id } = req.params;
        client.query("SELECT * FROM users WHERE id=$1", [id], (err, data) => {
            if (err) throw err;

            res.status(200).json({
                status: 201,
                note: data.rows[0],
            });
        });
    } catch (error) {
        res.status(500).json({
            err: err.message,
            note: null,
        });
    }
};

const getNoteByIds = (req, res) => {
    try {
        const { name, password } = req.params;
        client.query("SELECT * FROM users WHERE name=$1 AND password=$2",
            [name, password], (err, data) => {
            if (err) throw err;

            res.status(200).json({
                status: 201,
                data: data.rows,
            });
        });
    } catch (error) {
        res.status(500).json({
            err: err.message,
            note: null,
        });
    }
};

const updateNoteById = (req, res) => {
    try {
        const { id } = req.params;
        const { name, password, hp } = req.body;
        client.query(
            "UPDATE users SET name = $1, password = $2, hp = $3 WHERE id = $4",
            [name, password, hp, id],
            (err, data) => {
                if (err) throw err;

                res.status(201).json({
                    status: 201,
                    message: "Updated users",
                });
            }
            );
    } catch (error) {
        res.status(500).json({
            err: error.message,
            message: "Failed to update note",
        });
    }
};

const deleteNote = (req, res) => {
    try {
        const { id } = req.params;
        client.query("DELETE FROM users WHERE id=$1", [id], (err, data) => {
            if (err) throw err;

            res.status(200).json({
                error: null,
                message: "Note deleted",
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to delete note",
        });
    }
};


module.exports = {
    createNote, getNotes, getNoteById, updateNoteById, deleteNote,
    getNoteByIds
};
