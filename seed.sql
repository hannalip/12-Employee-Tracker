DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE departments (
    id INT(10) NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT(10) NOT NULL AUTO_INCREMENT,
    department_id INT(10) NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT(10) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10),
    PRIMARY KEY (id)
)


INSERT INTO departments (department)
VALUES ("Sales"), ("Engineering");

INSERT INTO roles (department_id, title, salary)
VALUES  (1, 'Sales Lead', 100000), (2, 'Lead Engineer', 150000);
        

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Hannali', 'Patidar', 1, 1),
        ('Jarrod', 'Finn', 3, 2);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

