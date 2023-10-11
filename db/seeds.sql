INSERT INTO department (department_name)
VALUES 
    ("Accounting"),
    ("Sales"),
    ("Development"),
    ("Marketing");

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

INSERT INTO employee (first_name, last_name, title, department, salary, manager_id, role_id)
VALUES 
    ("Jake", "Lipscomb", "Accountant", "Accounting", 50000, NULL, 1),
    ("Smitty", "Knight", "Accountant Manager", "Accounting", 65000, 1, 2),
    ("Catherine", "McCollum", "Sales Representative", "Sales", 55000, NULL, 3),
    ("Mitchell", "Harvey", "Sales Manager", "Sales", 75000, 1, 4),
    ("Corina", "Lopez", "Software Developer", "Development", 70000, NULL, 5),
    ("Claudia", "Montenegro", "UI/UX Developer", "Development", 75000, 1, 6),
    ("Dylan", "Turner", "Senior Developer", "Development", 90000, 1, 7),
    ("Gordon", "Fogey", "Project Lead", "Marketing", 100000, 1, 8);
