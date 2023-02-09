const mysql = require("mysql2");
const inquirer = require("inquirer");
const conTable = require("console.table");
const express = require("express");
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    port: 3001,
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
                    // viewDepts();
                    console.log("testing");
                    
                break;
    
                case "View Roles":
                    // viewRoles();
                    console.log("testing2");
                break;
    
                case "View Employees":
                    // viewEmployees();
                    console.log("testing3");
                break;
                    
                // case "Add Department":
                //     // addDept();
                //     console.log("testing4");
                // break;
    
                case "Add Role":
                    // addRole();
                    console.log("testing5");
                break;
    
                case "Add Employee":
                    // addEmployee();
                    console.log("testing6");
                break;
    
                case "Update Employee Role":
                    // updateRole();
                    console.log("testing7");
                break;
    
                case "Close":
                    console.log ("Thank You For Using The Workforce Database");
                    // db.end();
                break;
                }
        })
}

function viewDepts() {
    db.query("SELECT department.id AS ID, department.name AS Department FROM department",
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
    db.query("SELECT employee.id AS Employee.ID, SELECT first_name AS First_Name, SELECT last_name AS Last_Name, SELECT role_id AS Role_ID, SELECT manager_id AS Manager_ID FROM employee",
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
          message: "What Department would you like to add? "
        },
        {
            name: "id",
            type: "input",
            message: "What is the new Department ID number? "
          }

    ]).then(function(answers) {
        db.query("INSERT INTO department SET ? ",
            {
              name: answers.name,
              id: answers.id
            },
            function(err) {
                if (err) throw err
                console.table(res);
                init();
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
    db.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;",   function(err, res) {
      inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is name of the new role?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?"
          } ,
          {
            name: "department",
            type: "rawlist",
            message: "Under which department does this new role fall?",
            choices: selectDept()
          }
      ]).then(function(answers) {
          let deptId = selectDept().indexOf(answers.choice) + 1
          db.query(
              "INSERT INTO role SET ?",
              {
                title: answers.title,
                salary: answers.salary,
                department_id: deptId
              },
              function(err) {
                  if (err) throw err
                  console.table(answers);
                  init();
              }
          )     
      });
    });
};

// Function to pull names from database for updateRole() function
const employeeChoices = async () => {
    const employeeQuery = `SELECT id AS value, last_name FROM employee;`;
    const employees = await db.query(employeeQuery);
    return employees[0];
};

// Update Role
function updateRole() {
    db.query("SELECT employee.last_name AS Last_Name, employee.first_name AS First_Name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
       (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
            name: "last_name",
            type: "list",
            message: "Who's role are we updating?",
            choices: employeeChoices(),
            },
            {
                name: "role",
                type: "input",
                message: "What is the employee's new role?",
            },
        ]).then(function (answers) {
            db.query("UPDATE employee SET ?",
            {
                last_name: answers.last_name,
                role_id: answers.role
            },
            function(err) {
                if (err) throw err
                console.table(res);
                init();
            }
            );
        })
       })
}

init();