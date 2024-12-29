const express = require('express');

const router = express.Router(); // Create Router instance

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function employeeRoutes(nav) {
    // Initialize the employee data and ID counter
    let data = [
        {
            id: 1,
            name: 'Amal J A',
            designation: 'Software Engineer',
            location: 'Trivandrum',
            salary: 60000
        },
        {
            id: 2,
            name: 'Lekshmi',
            designation: 'Project Manager',
            location: 'Kowdiar',
            salary: 80000
        },
        {
            id: 3,
            name: 'Akshay',
            designation: 'UX Designer',
            location: 'Kovalam',
            salary: 50000
        }
    ];
    
    // Use the highest existing ID plus one for new employees to ensure unique IDs
    let idCounter = data.length ? Math.max(...data.map(emp => emp.id)) + 1 : 1; // Initialize ID counter

    // Render Add Employee Form
    router.get('/form', (req, res) => {
        res.render('employee', {
            title: 'Add Employee',
            nav,
            employee: {}, // Empty object for new employee form
            id: null // No ID for new entries
        });
    });

    // Render Home Page
    router.get('/home', (req, res) => {
        res.render('home', {
            title: 'Employee Management',
            data,
            nav
        });
    });

    // Add New Employee
    router.post('/add', (req, res) => {
        const newEmployee = {
            id: idCounter++, // Increment ID counter for unique ID
            name: req.body.name,
            designation: req.body.designation,
            location: req.body.location,
            salary: req.body.salary
        };
        data.push(newEmployee); // Add the new employee to the data
        res.redirect('/routing/home');
    });

    // Render Edit Employee Form
    router.get('/edit/:id', (req, res) => {
        const employee = data.find(emp => emp.id === parseInt(req.params.id, 10)); // Find employee by ID
        if (employee) {
            res.render('employee', {
                title: 'Update Employee',
                nav,
                employee,
                id: req.params.id
            });
        } else {
            res.status(404).send("Employee not found");
        }
    });

    // Update Employee
    router.post('/update/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        const employeeIndex = data.findIndex(emp => emp.id === id); // Find employee index by ID
        if (employeeIndex !== -1) {
            data[employeeIndex] = {
                id, // Keep the same ID when updating
                name: req.body.name,
                designation: req.body.designation,
                location: req.body.location,
                salary: req.body.salary
            };
        }
        res.redirect('/routing/home');
    });

    // Delete Employee
    router.post('/remove/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        data = data.filter(emp => emp.id !== id); // Remove employee by ID
        res.redirect('/routing/home');
    });

    return router;
}

module.exports = employeeRoutes;


