const { 
    getDepartments, 
    getRoles, 
    getEmployees, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployeeRole 
  } = require('./db/queries');
  
  const { 
    mainMenu, 
    addDepartmentPrompt, 
    addRolePrompt, 
    addEmployeePrompt, 
    updateEmployeeRolePrompt 
  } = require('./utils/prompts');
  
  const main = async () => {
    let exit = false;
  
    while (!exit) {
      const action = await mainMenu();
  
      switch (action) {
        case 'View all departments':
          const departments = await getDepartments();
          console.table(departments);
          break;
        case 'View all roles':
          const roles = await getRoles();
          console.table(roles);
          break;
        case 'View all employees':
          const employees = await getEmployees();
          console.table(employees);
          break;
        case 'Add a department':
          const departmentName = await addDepartmentPrompt();
          await addDepartment(departmentName);
          console.log(`Added department: ${departmentName}`);
          break;
        case 'Add a role':
          const depts = await getDepartments();
          const roleData = await addRolePrompt(depts);
          await addRole(roleData.title, roleData.salary, roleData.department_id);
          console.log(`Added role: ${roleData.title}`);
          break;
        case 'Add an employee':
          const rolesData = await getRoles();
          const employeesData = await getEmployees();
          const employeeData = await addEmployeePrompt(rolesData, employeesData);
          await addEmployee(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id);
          console.log(`Added employee: ${employeeData.first_name} ${employeeData.last_name}`);
          break;
        case 'Update an employee role':
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
  
  main();