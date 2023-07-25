import * as mysql from 'mysql2'
import inquirer from 'inquirer';


// const db = mysql.createConnection (
//     {
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'company_db'
//     },
//     console.log('Connecting to the company db...')
// );

const choices = [
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
                {key: 'add a department', value: 'ADD_AN_EMPLOYEE'},
                {key: 'update an employee role', value: 'UPDATE_EMPLOYEE_ROLE'}
            ]
        }
]

function init() {
    inquirer.prompt(choices)
    .then((res) => {
        console.log(res.key);
    })
    .catch((err) => {
        console.log(err);
    });
}

init();