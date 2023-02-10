const mysql = require("mysql2");
const inquirer = require("inquirer");
const conTable = require("console.table");
const express = require("express");
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    // port: 3001,
    user: "root",
    // Add your password below:
    password: "password",
    database: "workforce_db"
 },
 console.log(`Connected to the workforce_db database.`)
);

const menu = 
    [{
    name: "responses",
    type: "list",
    message: "Hello, what would you like to do?",
    choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Close"
    ],
  },];

// Init function prompts user and allows use of the database
function init() {
    inquirer.prompt(menu)
        .then(function(answers) {
            // console.log(answers);
            switch (answers.responses) {
                case "View Departments":
                    viewDepts();
                    console.log("testing");
                    
                break;
    
                case "View Roles":
                    viewRoles();
                    console.log("testing2");
                break;
    
                case "View Employees":
                    viewEmployees();
                    console.log("testing3");
                break;
                    
                case "Add Department":
                    addDept();
                    console.log("testing4");
                break;
    
                case "Add Role":
                    addRole();
                    console.log("testing5");
                break;
    
                case "Add Employee":
                    addEmployee();
                    console.log("testing6");
                break;
    
                case "Update Employee Role":
                    updateRole();
                    console.log("testing7");
                break;
    
                case "Close":
                    console.log ("Thank You For Using The Workforce Database");
                    db.end();
                break;
                }
        })
}

function viewDepts() {
    db.query("SELECT department.id AS ID, department.department_name AS Department FROM department",
    function(err, res) {
        if (err) throw err
        console.log("Departments");
        console.table(res);
        init();
    })
}

function viewRoles() {
    db.query("SELECT role.id AS Dept_ID, role.title AS Title FROM role",
    function(err, res) {
        if (err) throw err
        console.log("Roles");
        console.table(res);
        init();
    })
}

function viewEmployees() {
    db.query("SELECT employee.id AS Employee_ID, first_name AS First_Name, last_name AS Last_Name, role_id AS Role_ID, manager_id AS Manager_ID FROM employee",
    function(err, res) {
        if (err) throw err
        console.log("Employees");
        console.table(res);
        init();
    })
}

// Array for adding Department to database
const deptArr = [];
function selectDept() {
  db.query("SELECT * FROM department", function(err, res) {
    if (err) throw err
    for (let i = 0; i < res.length; i++) {
      deptArr.push(res[i].name);
    }
})
return deptArr;
}

// Add Dept
function addDept() { 
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add? ",
          validate: (value) => {
            if(value) {
                return true;
            } else {
                console.log("Enter a Department name to continue.")
                return false;
            }
        }
        }
    ]).then(function(answers) {
        db.query("INSERT INTO department (department_name) VALUES(?)", answers.name,
            // {
            //   department_name: answers.name,
            // },
            function(err, res) {
                if (err) throw err
                // init();
            }
        )
    })
};

// Array for adding Role
const roleArr = [];                                            
function selectRole() {
  db.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  })
  return roleArr;
}

// Add Role
function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new role?",
          name: "roleName"
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "roleSalary"
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "deptId"
        }
      ])
      .then(function(answer) {
  
  
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.roleSalary, answer.deptId], function(err, res) {
          if (err) throw err;
          console.table(res);
          init();
        });
      });
  };

// Function to pull names from database for updateRole() function
const employeeChoices = async () => {
    const employeeQuery = `SELECT id AS value, last_name FROM employee;`;
    const employees = await db.query(employeeQuery);
    return employees[0];
};

// Add Employee
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the employee's manager ID Number?",
        }
    ]).then(function(answers) {
        db.query("INSERT INTO employee (first_name, last_name, manager_id) VALUES (?, ?, ?)", [answers.firstName, answers.lastName, answers.managerId],
         function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
         })
    })
}

// Update Role
function updateRole() {
        inquirer.prompt([
            {
              type: "input",
              message: "Which employee would you like to update?",
              name: "empName"
            },
      
            {
              type: "input",
              message: "What is their new roleID?",
              name: "newRole"
            }
          ])
          .then(function(answer) {     
            db.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.newRole, answer.empName],function(err, res) {
              if (err) throw err;
              console.table(res);
              init();
            });
          });
}

init();