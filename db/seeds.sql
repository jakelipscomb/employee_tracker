INSERT INTO department (name)
VALUES 
    (1, "Accounting"),
    (2, "Sales"),
    (3, "Development"),
    (4, "Marketing");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Accountant", 50000, 1),
    ("Accountant Manager", 65000, 1),
    ("Sales Representative", 55000, 2),
    ("Sales Manager", 75000, 2),
    ("Software Developer", 70000, 3),
    ("UI/UX Developer", 75000, 3),
    ("Senior Developer", 90000, 3),
    ("Project Lead", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Jake", "Lipscomb", 3, 0),
    ("Smitty", "Knight", 3, 1),
    ("Catherine", "McCollum", 3, 0),
    ("Mitchell", "Harvey", 3, 1),
    ("Corina", "Lopez", 3, 0),
    ("Claudia", "Montenegro", 3, 1);