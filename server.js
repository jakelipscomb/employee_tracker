const mysql = require('mysql');
const inquirer = require('inquirer');

const db = mysql.createConnection (
    {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'company_db'
    }
);

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the company database.');
    start();    
});

start = () => {
        console.log("********************")
        console.log("*                  *")
        console.log("* Employee Tracker *")
        console.log("*                  *")
        console.log("********************")
        promptUser();
    };

const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                {key: 'view all departments', value: 'ALL_DEPARTMENTS'}, 
                {key: 'view all roles', value: 'ALL_ROLES'}, 
                {key: 'view all employees', value: 'ALL_EMPLOYEES'},
                {key: 'add a role', value: 'ADD_A_ROLE'},
                {key: 'add a department', value: 'ADD_A_DEPARTMENT'},
                {key: 'add an employee', value: 'ADD_AN_EMPLOYEE'},
                {key: 'update an employee role', value: 'UPDATE_EMPLOYEE_ROLE'},
                {key: 'view employees by department', value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'},
                {key: 'view employees by manager', value: 'VIEW_EMPLOYEES_BY_MANAGER'},
                {key: 'delete a department', value: 'DELETE_A_DEPARTMENT'},
                {key: 'delete a role', value: 'DELETE_A_ROLE'},
                {key: 'delete an employee', value: 'DELETE_AN_EMPLOYEE'},
            ]
        }
    ])
};
