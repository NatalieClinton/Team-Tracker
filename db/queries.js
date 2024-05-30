const { Pool } = require('pg');

// Set up the connection pool to the PostgreSQL database
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'employee_tracker', 
  password: 'R0sess98#', 
  port: 5432,
});

// Function to get all departments
const getDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

// Function to get all roles
const getRoles = async () => {
  const result = await pool.query(
    `SELECT role.id, role.title, role.salary, department.name AS department 
     FROM role 
     JOIN department ON role.department_id = department.id`
  );
  return result.rows;
};

// Function to get all employees
const getEmployees = async () => {
  const result = await pool.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
            (SELECT CONCAT(manager.first_name, ' ', manager.last_name) 
             FROM employee AS manager 
             WHERE manager.id = employee.manager_id) AS manager 
     FROM employee 
     JOIN role ON employee.role_id = role.id 
     JOIN department ON role.department_id = department.id`
  );
  return result.rows;
};

// Function to add a department
const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Function to add a role
const addRole = async (title, salary, department_id) => {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

// Function to add an employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

// Function to update an employee's role
const updateEmployeeRole = async (employee_id, role_id) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};

// Export the functions for use in other files
module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};