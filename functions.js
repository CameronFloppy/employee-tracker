const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'jayfordsql',
        database: 'employees'
    },
    console.log('Connected to the election database.')
)

function viewAllDep() {
    const sql = `select * from department;`

    db.promise().query(sql)
        .then(([rows,fields]) => {
            console.table(rows)})
        .then(returnToMenu())
}

function viewAllRole() {
    const sql = `select * from role;`

    db.query(sql, (err, rows) => {
        if (err) {
            throw err
        }
        console.table(rows);
    })
    returnToMenu();
}

function viewAllEmp() {
    const sql = `select * from employee;`

    db.query(sql, (err, rows) => {
        if(err) {
            throw err;
        }
        console.table(rows);
    })
    returnToMenu();
}

function addAnEmp() {
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
    inquirer
        .prompt([{
            type: 'input',
            name: 'first_name',
            message: 'What is the new employee\'s first name?'
        },{
            type: 'input',
            name: 'last_name',
            message: 'What is their last name?'
        },{
            type: 'input',
            name: 'role',
            message: 'What is their role?'
        },{
            type: 'input',
            name: 'manager',
            message: 'Who is their manager?'
        }])
    
    const params = [answer.first_name, answer.last_name, answer.role, answer.manager]

    db.query(sql, params, (err, rows) => {
        console.table(rows);
    })
}

function addADep() {
    const sql = 0
}

function addARole() {
    const sql = 0
}

function updateEmployee() {
    const sql = 0
}

async function printTable(rows,fields) {
    console.table(rows);
}

async function returnToMenu() {
    inquirer
        .prompt({
            type: 'confirm',
            name: 'return',
            message: 'Would you like to return to the main menu?'
        })
        .then((answers) => {
            if(answers.return) {
                menuPrompt();
            } else {
                process.exit(1);
            }
        })
}

const menuPrompt = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'menu',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add an employee', 'Add a department', 'Add a role', 'Update an employee roll'],
            default: 'View all departments'
        })
        .then((answer) => {
            if(answer.menu === 'View all departments') {
                viewAllDep();
            } else if( answer.menu === 'View all roles') {
                viewAllRole();
            } else if (answer.menu === 'View all employees') {
                viewAllEmp();
            } else if (answer.menu === 'Add an employee') {
                addAnEmp();
            }
        })
    
}

module.exports = { viewAllDep, viewAllEmp, viewAllRole, addADep, addARole, addAnEmp, updateEmployee, menuPrompt }