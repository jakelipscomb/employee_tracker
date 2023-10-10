INSERT INTO department (department_name)
VALUES 
    ("Accounting"),
    ("Sales"),
    ("Development"),
    ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Accountant", 50000, 1),
    ("Accountant Manager", 65000, 2),
    ("Sales Representative", 55000, 1),
    ("Sales Manager", 75000, 2),
    ("Software Developer", 70000, 1),
    ("UI/UX Developer", 75000, 1),
    ("Senior Developer", 90000, 2),
    ("Project Lead", 100000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Jake", "Lipscomb", 1, NULL),
    ("Smitty", "Knight", 3, 1),
    ("Catherine", "McCollum", 2, NULL),
    ("Mitchell", "Harvey", 2, 1),
    ("Corina", "Lopez", 4, NULL),
    ("Claudia", "Montenegro", 4, 1);