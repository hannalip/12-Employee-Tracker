const connection = require("./connection.js");

const orm = {
    viewEmployees: function () {
        const queryString = 'SELECT employees.id, first_name, last_name, title, salary, name, manager_id FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id';
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            let newTable = [];
            for (let i = 0; i < result.length; i++) {
                let manager_name = "";
                if (result[i].manager_id !== null) {
                    for (let j = 0; j < result.length; j++) {
                        if (result[j].id === result[i].manager_id) {
                            manager_name = result[j].first_name + " " + result[j].last_name;
                        }
                    }
                } else {
                    manager_name = "Not available";
                }
                const tableElement = {
                    "Employee ID": result[i].id,
                    "First Name": result[i].first_name,
                    "Last Name": result[i].last_name,
                    "Title": result[i].title,
                    "Salary": result[i].salary,
                    "Department": result[i].name,
                    "Manager": manager_name
                };
                newTable.push(tableElement);
            }
            console.table(newTable);
            return result;
        });
    },
    getEmployees: function () {
        const queryString = "SELECT * FROM employees";
        return connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            const empArray = [];
            for (let i = 0; i < result.length; i++) {
                const empObj = {
                    id: result[i].id,
                    name: result[i].first_name + " " + result[i].last_name
                };
                empArray.push(empObj);
            }
            return empArray;
        });
    },
    viewRoles: function () {
        const queryString = "SELECT roles.id, title, salary, name FROM roles LEFT JOIN departments ON roles.department_id = departments.id";
        return connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            const newTable = [];
            for (let i = 0; i < result.length; i++) {
                const roleObj = {
                    "ID": result[i].id,
                    "Title": result[i].title,
                    "Salary": result[i].salary,
                    "Department": result[i].name
                };
                newTable.push(roleObj);
            }
            console.table(newTable);
            return result;
        });
    },
    getRoles: function () {
        const queryString = "SELECT * FROM roles";
        return connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            return result;
        });

    },
    viewDepartments: function () {
        const queryString = "SELECT * FROM departments";
        return connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            console.table(result);
            return result;
        });
    },
    getDepartments: function () {
        const queryString = "SELECT * FROM departments";
        return connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            return result;
        });
    },
    updateRole: function (empId, newRole) {
        const queryString = "SELECT id FROM roles WHERE title = ?";
        return connection.query(queryString, newRole, function (err, result) {
            if (err) {
                throw err;
            }
            const newRoleId = result[0].id;
            const queryString = "UPDATE employees SET ? WHERE ?";
            connection.query(queryString,
                [{
                    role_id: newRoleId
                },
                {
                    id: empId
                }],
                function (err, result) {
                    if (err) {
                        throw err;
                    }
                    console.log("Employee's role successfully updated!");
                    return result;
                });
        });
    },

    addDepartment: function (deptName) {
        const queryString = `INSERT INTO departments (name) VALUES (?)`;
        return connection.query(queryString, deptName, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("Department successfully added!");
            return result;
        });
    },
    addRole: function (roleTitle, roleSalary, deptId) {
        const queryString = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
        return connection.query(queryString, [roleTitle, roleSalary, deptId], function (err, result) {
            if (err) {
               throw err;
            }
            console.log("Role successfully added!");
            return result;
        });
    },
    addEmployee: function (firstName, lastName, roleId, mgrId) {
        const queryString = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        return connection.query(queryString, [firstName, lastName, roleId, mgrId], function (err, result) {
            if (err) {
                throw err;
            }
            console.log("Employee successfully added!");
            return result;
        });
    },
    // updateManager
    // viewEmpsByMgr

    // deleteRecord: function(tableInput, recordId)  {
    //         const queryString = "DELETE FROM ?? WHERE id = ?";
    //         connection.query(queryString, [tableInput, recordId], function(err, result) {
    //             if (err) {
    //                 throw err;
    //             }
    //             console.log("Record successfully deleted");
    //             return result;
    //         });     
    // },
    //view total budget by employee
    endConnection: function () {
        connection.end();
    }
};

module.exports = orm;