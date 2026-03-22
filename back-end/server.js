const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to Express"
    });
});

// POST API
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                status: "error",
                message: "Message is required"
            });
        }

        const response = await axios.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            {
                model: "meta/llama3-70b-instruct",
                messages: [
                    {
                        role: "system",
                        content: "You are a text summarizer. Summarize the given text in a concise and clear way."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.5,
                max_tokens: 100
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}` // 👈 change this
                }
            }
        );

        const summary = response.data.choices[0].message.content;

        res.json({
            status: "success",
            original: message,
            summary: summary
        });

    } catch (error) {
        console.error(error.response?.data || error.message); // 👈 helpful log

        res.status(500).json({
            status: "error",
            message: error.response?.data || error.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});