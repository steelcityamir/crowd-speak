const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const { getAllScores, getScoreById, updateScore, insertScore } = require('./database');

// Load configuration from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Disable CORS for all routes and origins
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, './public')));

// Enable Express to parse JSON bodies in incoming requests
app.use(express.json());

// Route to get all scores
app.get('/scores', (req, res) => {
    getAllScores((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Route to get a specific score by id
app.get('/scores/:id', (req, res) => {
    const { id } = req.params;
    getScoreById(id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (row) {
            res.json({
                "message": "success",
                "data": row
            });
        } else {
            res.status(404).json({ "message": "Not found" });
        }
    });
});

// Route to upvote (increment score)
app.post('/scores/:id/upvote', (req, res) => {
    const { id } = req.params;
    getScoreById(id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (row) {
            updateScore(id, 1, (err) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({ "message": "success", "data": "Score incremented" });
            });
        } else {
            insertScore(id, 1, (err) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({ "message": "success", "data": "Score created and incremented" });
            });
        }
    });
});

// Route to downvote (decrement score)
app.post('/scores/:id/downvote', (req, res) => {
    const { id } = req.params;
    getScoreById(id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (row) {
            updateScore(id, -1, (err) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({ "message": "success", "data": "Score decremented" });
            });
        } else {
            insertScore(id, -1, (err) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({ "message": "success", "data": "Score created and decremented" });
            });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
