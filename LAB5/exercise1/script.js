let xmlDoc;

function showMessage(msg, success = true) {
    const message = document.getElementById('msg');
    message.style.color = success ? 'green' : 'red';
    message.textContent = msg;
}

// Fetch and display XML data
function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.onload = function () {
        try {
            if (xhr.status === 200) {
                xmlDoc = xhr.responseXML;
                displayEmployees();
            } else {
                showMessage("Failed to load XML", false);
            }
        } catch (err) {
            showMessage("Error parsing XML: " + err, false);
        }
    };
    xhr.onerror = function () {
        showMessage("Request Error", false);
    };
    xhr.send();
}

// Display employee table
function displayEmployees() {
    const tableBody = document.querySelector("#employeeTable tbody");
    tableBody.innerHTML = "";
    const employees = xmlDoc.getElementsByTagName("employee");
    if (employees.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No employees found</td></tr>";
        return;
    }

    for (let emp of employees) {
        const id = emp.getElementsByTagName("id")[0].textContent;
        const name = emp.getElementsByTagName("name")[0].textContent;
        const dept = emp.getElementsByTagName("department")[0].textContent;
        const salary = emp.getElementsByTagName("salary")[0].textContent;

        const row = tableBody.insertRow();
        row.insertCell(0).textContent = id;
        row.insertCell(1).textContent = name;
        row.insertCell(2).textContent = dept;
        row.insertCell(3).textContent = salary;
        row.insertCell(4).innerHTML = `<button onclick="prepareDelete('${id}')">Delete</button>`;
    }
}

// Add employee
function addEmployee() {
    const id = document.getElementById('addId').value;
    const name = document.getElementById('addName').value;
    const dept = document.getElementById('addDept').value;
    const salary = document.getElementById('addSalary').value;

    if (!id || !name || !dept || !salary) {
        showMessage("Please fill all fields", false);
        return;
    }

    const employeesNode = xmlDoc.getElementsByTagName("employees")[0];
    const newEmp = xmlDoc.createElement("employee");

    newEmp.innerHTML = `
        <id>${id}</id>
        <name>${name}</name>
        <department>${dept}</department>
        <salary>${salary}</salary>
    `;

    employeesNode.appendChild(newEmp);
    displayEmployees();
    showMessage("Employee added successfully");
}

// Update employee
function updateEmployee() {
    const id = document.getElementById('updateId').value;
    const dept = document.getElementById('updateDept').value;
    const salary = document.getElementById('updateSalary').value;

    if (!id) {
        showMessage("Enter ID to update", false);
        return;
    }

    const employees = xmlDoc.getElementsByTagName("employee");
    let found = false;
    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === id) {
            if (dept) emp.getElementsByTagName("department")[0].textContent = dept;
            if (salary) emp.getElementsByTagName("salary")[0].textContent = salary;
            found = true;
            break;
        }
    }

    if (found) {
        displayEmployees();
        showMessage("Employee updated successfully");
    } else {
        showMessage("Employee not found", false);
    }
}

// Delete employee
function deleteEmployee() {
    const id = document.getElementById('deleteId').value;
    if (!id) {
        showMessage("Enter ID to delete", false);
        return;
    }

    const employeesNode = xmlDoc.getElementsByTagName("employees")[0];
    const employees = xmlDoc.getElementsByTagName("employee");
    let found = false;

    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === id) {
            employeesNode.removeChild(emp);
            found = true;
            break;
        }
    }

    if (found) {
        displayEmployees();
        showMessage("Employee deleted successfully");
    } else {
        showMessage("Employee not found", false);
    }
}

// Initialize
window.onload = loadEmployees;
