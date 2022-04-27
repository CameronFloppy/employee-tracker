const { viewAllDep, viewAllEmp, viewAllRole, addADep, addARole, addAnEmp, updateEmployee, menuPrompt } = require('./functions');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


menuPrompt();


