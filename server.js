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

init();