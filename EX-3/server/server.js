import {log} from '../middleware/log.js'
import express from 'express'
import  course from '../course.js'
import {queryValidation} from '../middleware/queryValidation.js'
import {auth} from '../middleware/auth.js'
const app = express();

app.use(log);


app.get('/departments/:dept/courses', queryValidation, auth, (req, res) => {
    const { dept } = req.params;
    let { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Normalize query inputs
    semester = semester?.trim().toLowerCase();
    instructor = instructor?.trim().toLowerCase();

    const filteredCourses = course.filter(course => {
        return (
            course.department === dept &&
            (!level || course.level === level) &&
            (!minCredits || course.credits >= parseInt(minCredits)) &&
            (!maxCredits || course.credits <= parseInt(maxCredits)) &&
            (!semester || course.semester.toLowerCase().includes(semester)) &&
            (!instructor || course.instructor.toLowerCase().includes(instructor))
        );
    });
    res.send(filteredCourses);
});


app.get('/', (req,res) => {
    res.send(`
        <html>
            <head><title>Home</title></head>
            <body>
                <h1>Welcome to the Home Page</h1>
                <p>This is a simple Node.js server.</p>
            </body>
        </html>
    `);
})
app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
})
