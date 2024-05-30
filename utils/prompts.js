// Install Inquirer
const inquirer = require('inquirer');

// Main menu prompt
const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    },
  ]);

  return action;
};

// Prompt for adding a department
const addDepartmentPrompt = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);

  return name;
};

// Prompt for adding a role
const addRolePrompt = async (departments) => {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the name of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departments.map((dept) => ({ name: dept.name, value: dept.id })),
    },
  ]);

  return { title, salary, department_id };
};

// Prompt for adding an employee
const addEmployeePrompt = async (roles, employees) => {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role of the employee:',
      choices: roles.map((role) => ({ name: role.title, value: role.id })),
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager of the employee:',
      choices: [{ name: 'None', value: null }, ...employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))],
    },
  ]);

  return { first_name, last_name, role_id, manager_id };
};

// Prompt for updating an employee's role
const updateEmployeeRolePrompt = async (employees, roles) => {
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select the employee to update:',
      choices: employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the new role of the employee:',
      choices: roles.map((role) => ({ name: role.title, value: role.id })),
    },
  ]);

  return { employee_id, role_id };
};

// Export the prompts for use in other files
module.exports = {
  mainMenu,
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeeRolePrompt,
};