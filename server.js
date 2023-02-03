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
        .then(response => {
            if (response.menu === "View Departments") {
                viewDepartments();
            } else if (response.menu === "View Roles") {
                viewRoles();
            } else if (response.menu === "View Employees") {
                viewEmployees();
            } else if (response.menu === "Add Department") {
                addDepartment();
            } else if (response.menu === "Add Role") {
                addRole();
            } else if (response.menu === "Add Employee") {
                addEmployee();
            } else if (response.menu === "Update Employee Role") {
                updateRole();
            } else if (response.menu === "Delete Department") {
                deleteDept();
            } else if (response.menu === "Delete Role") {
                deleteRole();
            } else if (response.menu === "Delete Employee") {
                deleteEmp();
            } else if (response.menu === "Close") {
                close();
            }
        })
}