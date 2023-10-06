const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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
                {key: 'exit', value: 'EXIT'}
            ]
        }
    ])
    .then((answers) => {
        const {choices} = answers;
        if (choices === 'ALL_DEPARTMENTS') {
            viewAllDepartments();
        }
        if (choices === 'ALL_ROLES') {
            viewAllRoles();
        }
        if (choices === 'ALL_EMPLOYEES') {
            viewAllEmployees();
        }
        if (choices === 'ADD_A_ROLE') {
            addRole();
        }
        if (choices === 'ADD_A_DEPARTMENT') {
            addDepartment();
        }
        if (choices === 'ADD_AN_EMPLOYEE') {
            addEmployee();
        }
        if (choices === 'UPDATE_EMPLOYEE_ROLE') {
            updateEmployeeRole();
        }
        if (choices === 'VIEW_EMPLOYEES_BY_DEPARTMENT') {
            viewEmployeesByDepartment();
        }
        if (choices === 'VIEW_EMPLOYEES_BY_MANAGER') {
            viewEmployeesByManager();
        }
        if (choices === 'DELETE_A_DEPARTMENT') {
            deleteDepartment();
        }
        if (choices === 'DELETE_A_ROLE') {
            deleteRole();
        }
        if (choices === 'DELETE_AN_EMPLOYEE') {
            deleteEmployee();
        }
        if (choices === 'EXIT') {
            db.end();
        }
    });
};

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

const viewAllRoles = () => {
    db.query('SELECT * FROM role', (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

const addRole = () => {
    db.query('SELECT * FROM department', (err, rows) => {
        if (err) throw err;
        const departments = rows.map(department => {
            return {name: department.name, value: department.id}
        });
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does the role belong to?',
                choices: departments
            }
        ])
        .then((answers) => {
            db.query('INSERT INTO role SET ?', answers, (err) => {
                if (err) throw err;
                console.log('The role was added successfully!');
                promptUser();
            });
        });
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ])
    .then((answers) => {
        db.query('INSERT INTO department SET ?', answers, (err) => {
            if (err) throw err;
            console.log('The department was added successfully!');
            promptUser();
        });
    });
};

const addEmployee = () => {
    db.query('SELECT * FROM role', (err, rows) => {
        if (err) throw err;
        const roles = rows.map(role => {
            return {name: role.title, value: role.id}
        });
        db.query('SELECT * FROM employee', (err, rows) => {
            if (err) throw err;
            const employees = rows.map(employee => {
                return {name: employee.first_name + ' ' + employee.last_name, value: employee.id}
            });
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the first name of the employee?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the last name of the employee?'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is the role of the employee?',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Who is the manager of the employee?',
                    choices: employees
                }
            ])
            .then((answers) => {
                db.query('INSERT INTO employee SET ?', answers, (err) => {
                    if (err) throw err;
                    console.log('The employee was added successfully!');
                    promptUser();
                });
            });
        });
    });
};

const updateEmployeeRole = () => {
    db.query('SELECT * FROM role', (err, rows) => {
        if (err) throw err;
        const roles = rows.map(role => {
            return {name: role.title, value: role.id}
        });
        db.query('SELECT * FROM employee', (err, rows) => {
            if (err) throw err;
            const employees = rows.map(employee => {
                return {name: employee.first_name + ' ' + employee.last_name, value: employee.id}
            });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Which employee would you like to update?',
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is the new role of the employee?',
                    choices: roles
                }
            ])
            .then((answers) => {
                db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.employee_id], (err) => {
                    if (err) throw err;
                    console.log('The employee was updated successfully!');
                    promptUser();
                });
            });
        });
    });
};

const viewEmployeesByDepartment = () => {
    db.query('SELECT * FROM department', (err, rows) => {
        if (err) throw err;
        const departments = rows.map(department => {
            return {name: department.name, value: department.id}
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department would you like to view?',
                choices: departments
            }
        ])
        .then((answers) => {
            db.query('SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)', answers.department_id, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                promptUser();
            });
        });
    });
};

const viewEmployeesByManager = () => {
    db.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        const managers = rows.map(employee => {
            return {name: employee.first_name + ' ' + employee.last_name, value: employee.id}
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'manager_id',
                message: 'Which manager would you like to view?',
                choices: managers
            }
        ])
        .then((answers) => {
            db.query('SELECT * FROM employee WHERE manager_id = ?', answers.manager_id, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                promptUser();
            });
        });
    });
};

const deleteDepartment = () => {
    db.query('SELECT * FROM department', (err, rows) => {
        if (err) throw err;
        const departments = rows.map(department => {
            return {name: department.name, value: department.id}
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department would you like to delete?',
                choices: departments
            }
        ])
        .then((answers) => {
            db.query('DELETE FROM department WHERE id = ?', answers.department_id, (err) => {
                if (err) throw err;
                console.log('The department was deleted successfully!');
                promptUser();
            });
        });
    });
};

const deleteRole = () => {
    db.query('SELECT * FROM role', (err, rows) => {
        if (err) throw err;
        const roles = rows.map(role => {
            return {name: role.title, value: role.id}
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'role_id',
                message: 'Which role would you like to delete?',
                choices: roles
            }
        ])
        .then((answers) => {
            db.query('DELETE FROM role WHERE id = ?', answers.role_id, (err) => {
                if (err) throw err;
                console.log('The role was deleted successfully!');
                promptUser();
            });
        });
    });
};

const deleteEmployee = () => {
    db.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        const employees = rows.map(employee => {
            return {name: employee.first_name + ' ' + employee.last_name, value: employee.id}
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Which employee would you like to delete?',
                choices: employees
            }
        ])
        .then((answers) => {
            db.query('DELETE FROM employee WHERE id = ?', answers.employee_id, (err) => {
                if (err) throw err;
                console.log('The employee was deleted successfully!');
                promptUser();
            });
        });
    });
};