// Importing functions for database queries
const { 
    getDepartments, 
    getRoles, 
    getEmployees, 
    addDepartment,
    addRole, 
    addEmployee, 
    updateEmployeeRole 
  } = require('./db/queries');
  
  // Importing prompt functions for user interaction
  const { 
    mainMenu, 
    addDepartmentPrompt, 
    addRolePrompt, 
    addEmployeePrompt, 
    updateEmployeeRolePrompt 
  } = require('./utils/prompts');
  
  // Main function to handle the application flow
  const main = async () => {
    let exit = false;
  
    // Loop until the user chooses to exit
    while (!exit) {
      const action = await mainMenu();
  
      switch (action) {
        case 'View all departments':
          // Fetch and display all departments
          const departments = await getDepartments();
          console.table(departments);
          break;
        case 'View all roles':
          // Fetch and display all roles
          const roles = await getRoles();
          console.table(roles);
          break;
        case 'View all employees':
          // Fetch and display all employees
          const employees = await getEmployees();
          console.table(employees);
          break;
        case 'Add a department':
          // Prompt for department name and add it to the database
          const departmentName = await addDepartmentPrompt();
          await addDepartment(departmentName);
          console.log(`Added department: ${departmentName}`);
          break;
        case 'Add a role':
          // Prompt for role details and add the role to the database
          const depts = await getDepartments();
          const roleData = await addRolePrompt(depts);
          await addRole(roleData.title, roleData.salary, roleData.department_id);
          console.log(`Added role: ${roleData.title}`);
          break;
        case 'Add an employee':
          // Prompt for employee details and add the employee to the database
          const rolesData = await getRoles();
          const employeesData = await getEmployees();
          const employeeData = await addEmployeePrompt(rolesData, employeesData);
          await addEmployee(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id);
          console.log(`Added employee: ${employeeData.first_name} ${employeeData.last_name}`);
          break;
        case 'Update an employee role':
          // Prompt for employee and new role, then update the employee's role in the database
          const emps = await getEmployees();
          const rols = await getRoles();
          const updateData = await updateEmployeeRolePrompt(emps, rols);
          await updateEmployeeRole(updateData.employee_id, updateData.role_id);
          console.log(`Updated employee's role`);
          break;
        case 'Exit':
          exit = true;
          break;
      }
    }
  };
  
  // Run the main function to start the application
  main();