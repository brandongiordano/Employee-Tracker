INSERT INTO department (department_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (department_id, title, salary)
VALUES  (1, "Salesperson", 80000),
        (2, "Lead Engineer", 150000),
        (2, "Software Engineer", 120000),
        (3, "Account Manger", 160000),
        (3, "Accountant", 125000),
        (4, "Legal Team Lead", 250000),
        (4, "Lawyer", 190000);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  ("Mike", "Chan", 0),
        ("Ashley", "Rodriguez", 0),
        ("Kevin", "Tupik", 2),
        ("Kunal", "Singh", 0),
        ("Malia", "Brown", 4),
        ("Sarah", "Lourd", 0),
        ("Tom", "Allen", 6);