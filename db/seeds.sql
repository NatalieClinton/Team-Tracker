-- Insert initial departments
INSERT INTO department (name) VALUES 
('Sales'), 
('Engineering'), 
('Finance');

-- Insert initial roles
INSERT INTO role (title, salary, department_id) VALUES 
('Salesperson', 50000, 1), 
('Engineer', 80000, 2), 
('Accountant', 60000, 3);

-- Insert initial employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Cassidy', 'Eickmeier', 1, NULL), 
('Natalie', 'Clinton', 2, 1), 
('Colin', 'Spry', 3, NULL);