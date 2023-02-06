const mysql = require("mysql2");
const inquirer = require("inquirer");
const conTable = require("console.table")

const db = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "password",
    database: "workforce_db"
 },
 console.log(`Connected to the workforce_db database.`)
);

const menu = [
    {
    name: "menu",
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
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "Close"
    ]
  }
];

// Init function prompts user and allows use of the database
function init() {
    inquirer
        .prompt(menu)
        .then(function(answers) {
            switch (answers.menu) {
                case "View Departments":
                    viewDepts();
                break;
    
                case "View Roles":
                    viewRoles();
                break;
    
                case "View Employees":
                    viewEmployees();
                break;
                    
                case "Add Department":
                    addDept();
                break;
    
                case "Add Role":
                    addRole();
                break;
    
                case "Add Employee":
                    addEmployee();
                break;
    
                case "Update Employee Role":
                    updateRole();
                break;
    
                case "Delete Department":
                    deleteDept();
                break;
    
                case "Delete Role":
                    deleteRole();
                break;

                case "Delete Employee":
                    deleteEmployee();
                break;
    
                case "Close":
                    console.log ("Thank You For Using The Workforce Database");
                    db.end();
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

init();