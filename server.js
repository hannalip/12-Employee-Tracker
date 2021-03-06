const inquirer = require("inquirer");
const orm = require("./orm.js");


// This function generates all the choices for the user.  Upon selecting any of them, a new function is executed
// specific to that choice.  Upon completion of the selected task, this function is called once again.
function mainMenu() {
    console.log("Welcome to the Employee Tracker!\n")
    inquirer.prompt({
        type: "list",
        message: "Choose what you would like to do",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add employee",
            "Add department",
            "Add role",
            "Update role",
            "Quit"
        ],
        name: "choice"
    }).then(function({ choice }) {
        if (choice === "View all employees") {
            orm.viewEmployees()
                console.log("\n");
                mainMenu();
        } else if (choice === "View all departments") {
            orm.viewDepartments()
                console.log("\n");
                mainMenu();
        } else if (choice === "View all roles") {
            orm.viewRoles()
                console.log("\n");
                mainMenu();
        } else if (choice === "Add employee") {
            addEmployeePrompt();
        } else if (choice === "Add department") {
            addDepartmentPrompt();
        } else if (choice === "Add role") {
            addRolePrompt();
        } else if (choice === "Update role") {
            updateRolePrompt();
  
  
        } else {
            orm.endConnection();
        }
    });
}

// Prompt user for infformation about new employee, calls orm function to add it to the database
function addEmployeePrompt() {
    const employeesResponse = orm.getEmployees()
        const managerArray = [];
        for (let i=0; i<employeesResponse.length; i++) {
            managerArray.push(employeesResponse[i].name);
        }
        managerArray.push("none");
        const rolesResponse = orm.getRoles()
            const roleTitleArray = [];
            for (let i=0; i<rolesResponse.length; i++) {
                roleTitleArray.push(rolesResponse[i].title);
            }
            inquirer.prompt([{
                type: "input",
                message: "Enter employee's first name",
                name: "firstName"
            },
            {
                type: "input",
                message: "Enter employee's last name",
                name: "lastName"
            },
            {
                type: "list",
                message: "Select employee's role",
                choices: roleTitleArray,
                name: "role"
            },
            {
                type: "list",
                message: "Select employee's manager",
                choices: managerArray,
                name: "manager"
            }]).then(function({firstName, lastName, role, manager}) {
                const roleId = rolesResponse[roleTitleArray.indexOf(role)].id;
                if (manager === "none") {
                    orm.addEmployee(firstName, lastName, roleId)
                        console.log("\n");
                        mainMenu();
                
                } else {
                    const managerId = res[managerArray.indexOf(manager)].id;
                    orm.addEmployee(firstName, lastName, roleId, managerId)
                
                        console.log("\n");
                        mainMenu();
               
                }
            });
  
}

// Prompts user for infformation needed to make new department, then calls orm function to add it to the database
function addDepartmentPrompt() {
    const departmentResponse = orm.getDepartments()
        const deptArray = [];
        for (let i=0; i<departmentResponse.length; i++) {
            deptArray.push(departmentResponse[i].name);
        }
        inquirer.prompt({
            type: "input",
            message: "Enter the name of new department you'd like to add",
            name: "deptName"
        }).then(function({deptName}) {
            if (deptArray.includes(deptName)) {
                console.log("There is already a department with that name!\n");
                mainMenu();
            } else {
                orm.addDepartment(deptName)
                .then(function() {
                    console.log("\n");
                    mainMenu();
                });
            }
        });
  
}

// Prompts user for infformation needed to make a new role, then calls orm function to add it to the database
function addRolePrompt() {
    const addRoleResponse = orm.getRoles()
        const roleArray = [];
        for (let i=0; i<addRoleResponse.length; i++) {
            roleArray.push(addRoleResponse[i].title);
        }
        const deptArray = orm.getDepartments()
            const deptNames = [];
            for (let i=0; i<deptArray.length; i++) {
                deptNames.push(deptArray[i].name);
            }
            inquirer.prompt([{
                type: "input",
                message: "Enter the name of the role you would like to add",
                name: "title"
            },
            {
                type: "input",
                message: "Enter the annual salary of the new role",
                name: "salary"
            },
            {
                type: "list",
                message: "Select the department in which the new role will work",
                choices: deptNames,
                name: "department"
            }]).then(function({title, salary, department}) {
                const deptId = deptArray[deptNames.indexOf(department)].id;
                if (roleArray.includes(title)) {
                    console.log("Error - that title already exists!\n");
                    mainMenu();
                } else {
                    orm.addRole(title, salary, deptId)
                    .then(function() {
                        console.log("\n");
                        mainMenu();
                    });
                }
            });
       
   
}

// Grabs all employees, asks user which one they want to update, asks what role the employee should have, then calls orm function to update the database
function updateRolePrompt() {
    const updateRoleResponse = orm.getEmployees()
        const empArray = [];
        for (let i=0; i<updateRoleResponse.length; i++) {
            empArray.push(updateRoleResponse[i].name);
        }
        const getRoleResponse = orm.getRoles()
            const roleArray = [];
            for (let i=0; i<getRoleResponse.length; i++) {
                roleArray.push(getRoleResponse[i].title);
            }
            inquirer.prompt([{
                type: "list",
                message: "Choose the employee whose role you'd like to update",
                choices: empArray,
                name: "employee"
            },
            {
                type: "list",
                message: "Select the employee's new role",
                choices: roleArray,
                name: "role"
            }]).then(function({employee, role}) {
                const empId = res[empArray.indexOf(employee)].id;
                orm.updateRole(empId, role)
                .then(function() {
                    console.log("\n");
                    mainMenu();
                })
            })
    
}





mainMenu();