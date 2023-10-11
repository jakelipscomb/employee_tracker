DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(10, 2),
  department_id INT REFERENCES department(department_id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  title VARCHAR(30),
  department VARCHAR(30) REFERENCES department(id),
  salary DECIMAL(10, 2),
  manager_id VARCHAR(30) REFERENCES employee(first_name) ON DELETE SET NULL,
  role_id INT REFERENCES role(id)
);