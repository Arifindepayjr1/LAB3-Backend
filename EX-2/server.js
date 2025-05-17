// server.js
import express from "express";
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get("/departments/:dept/courses", (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Parse credit filters
    const min = parseInt(minCredits) || 0;
    const max = parseInt(maxCredits) || Infinity;

    // Edge case: minCredits > maxCredits
    if (min > max) {
        return res.status(400).json({ error: "Invalid credit range: minCredits > maxCredits" });
    }

    // Step-by-step filtering
    let filtered = courses.filter(course => {
        // Department filter (mandatory)
        if (course.department !== dept) return false;

        // Optional filters
        if (level && course.level !== level) return false;
        if (semester && course.semester !== semester) return false;
        if (course.credits < min || course.credits > max) return false;
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;

        return true;
    });

    // Response
    res.json({
        results: filtered,
        meta: {
            total: filtered.length,
        },
    });
});

// Home page
app.get("/", (req, res) => {
    res.send("Hello this is my Home Page");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
