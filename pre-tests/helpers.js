const client = require("./db");

const createNews = (req, res) => {
    try {
        const { title, info, date } = req.body;

        if (!req.body) {
            throw Error("Send News in request body");
        }

        client.query(
            "INSERT INTO news (title, info, date) VALUES ($1, $2, $3)",
            [ name, password, hp],
            (err, data) => {
                res.status(201).json({
                    error: null,
                    message: "Created new news",
                });
            }
            );
    } catch (error) {
        res.status(500).json({
            error: error.TypeError,
            message: "Failed to create new News",
        });
    }
};

const getNewss = (req, res) => {
    try {
        client.query("SELECT * FROM news", (err, data) => {
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


const getNewsById = (req, res) => {
    try {
        const { id } = req.params;
        client.query("SELECT * FROM news WHERE id=$1", [id], (err, data) => {
            if (err) throw err;

            res.status(200).json({
                status: 201,
                News: data.rows[0],
            });
        });
    } catch (error) {
        res.status(500).json({
            err: err.message,
            News: null,
        });
    }
};


const updateNewsById = (req, res) => {
    try {
        const { id } = req.params;
        const { name, password, hp } = req.body;
        client.query(
            "UPDATE news SET name = $1, password = $2, hp = $3 WHERE id = $4",
            [name, password, hp, id],
            (err, data) => {
                if (err) throw err;

                res.status(201).json({
                    status: 201,
                    message: "Updated news",
                });
            }
            );
    } catch (error) {
        res.status(500).json({
            err: error.message,
            message: "Failed to update News",
        });
    }
};

const deleteNews = (req, res) => {
    try {
        const { id } = req.params;
        client.query("DELETE FROM news WHERE id=$1", [id], (err, data) => {
            if (err) throw err;

            res.status(200).json({
                error: null,
                message: "News deleted",
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to delete News",
        });
    }
};


module.exports = {
   createNews, getNewss, getNewsById, updateNewsById, deleteNews
};
