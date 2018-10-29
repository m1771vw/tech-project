DROP DATABASE technoprojectdb;
CREATE DATABASE technoprojectdb;
\c technoprojectdb

CREATE TABLE User_Login (
    user_id            SERIAL PRIMARY KEY,
    username            varchar(50),
    password            varchar(500),
    isAdmin             boolean
);

INSERT INTO User_Login (username, password, isAdmin)
VALUES
('wyang', '$2a$10$wOy4FUmf.RVWyhmGhpaFpuzOOZtQau0556wLxd6nkj7acZ3lP5dSi', true),
('admin', '$2a$10$qWUu9afkZ01/QTIT3KRQUuFtubk39EFVq5WL/3pG/H3QRKSgEsxLK', true),
('password', 'username', false);

CREATE TABLE Employees (
    employee_id         SERIAL PRIMARY KEY,
    first_name          varchar(50),
    last_name           varchar(50),
    position            varchar(50)
);

INSERT INTO Employees (first_name, last_name, position)
VALUES
('William', 'Yang', 'Software Engineer'),
('James', 'Park', 'Software Engineer'),
('John', 'Chu', 'Software Engineer'),
('Patrick', 'Truong', 'Project Manager'),
('Harrison', 'Spain', 'Project Owner');

CREATE TABLE Projects (
    project_id          SERIAL PRIMARY KEY,
    project_name        varchar(50),
    project_start_date  TIMESTAMP,
    project_end_date    TIMESTAMP 
);

INSERT INTO Projects (project_name, project_start_date, project_end_date)
VALUES
('Flashcard App', '2018-08-20 12:00:00', '2018-08-27 12:00:00'),
('Flashcard App Mobile', '2018-08-20 12:00:00', '2018-09-03 12:00:00'),
('My Tutor', '2018-10-10 10:00:00', '2018-10-12 12:00:00'),
('Let Us Choose', '2018-10-12 13:00:00', '2018-10-15 18:30:00');

CREATE TABLE Status_Types (
    status_id           SERIAL PRIMARY KEY,
    status_name         varchar(50)
);

INSERT INTO Status_Types (status_name)
VALUES
('Not Started'),
('In Progress'),
('Blocked'),
('In Testing'),
('In Review'),
('Waiting Merge'),
('Completed'),
('Release');

CREATE TABLE Project_Roles (
    project_roles_id    SERIAL PRIMARY KEY,
    employee_id         int REFERENCES Employees (employee_id),
    project_id          int REFERENCES Projects (project_id),
    role                VARCHAR(50)
);

INSERT INTO Project_Roles (employee_id, project_id, role) 
VALUES
(1, 1, 'Front End Engineer'),
(2, 1, 'React Native Engineer'),
(1, 2, 'Front End Engineer'),
(2, 2, 'Back End Engineer'),
(3, 3, 'Front End Engineer'),
(1, 4, 'Project Manager'),
(2, 4, 'Project Manager'),
(3, 4, 'Project Manager');

CREATE TABLE Assignments (
    assignment_id          SERIAL PRIMARY KEY,
    assignment_name        VARCHAR(100),
    project_id             int REFERENCES Projects (project_id),
    status_id              int REFERENCES Status_Types (status_id),
    assignment_start_date  TIMESTAMP,
    assignment_end_date    TIMESTAMP,
    assignment_est_hours   Decimal,
    assignment_final_hours Decimal
);

INSERT INTO Assignments (assignment_name, project_id, status_id, assignment_start_date, assignment_end_date, assignment_est_hours, assignment_final_hours)
VALUES
('Create the quiz component', 1, 2, '2018-08-21 12:00:00', '2018-08-21 13:00:00', 1.0, 0.0),
('Create random card generator', 1, 2, '2018-08-21 12:00:00', '2018-08-21 13:00:00', 1.0, 0.0),
('Create home page', 1, 6, '2018-08-21 12:00:00', '2018-08-22 10:00:00', 2.5, 2.0),
('Style Home Page', 1, 1, '2018-08-21 12:00:00', '2018-08-22 10:00:00', 2.0, 0.0),
('Random Food Generator', 4, 5, '2018-08-22 12:00:00', '2018-08-22 14:00:00', 1.5, 0.0),
('Figure out how to use Yelp API', 4, 3, '2018-08-22 10:00:00', '2018-08-22 11:00:00', 1.0, 0.0);

CREATE TABLE Employee_Assignments (
    emp_assign_id       SERIAL PRIMARY KEY,
    assignment_id       int REFERENCES Assignments (assignment_id),
    employee_id         int REFERENCES Employees (employee_id)
);

INSERT INTO Employee_Assignments (assignment_id, employee_id)
VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 1),
(6, 1);