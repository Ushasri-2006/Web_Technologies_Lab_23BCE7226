const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const message = document.getElementById("message");

let students = [];

// READ (Fetch Students)
function fetchStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("404 Not Found");
            }
            return response.json();
        })
        .then(data => {
            students = data.students;
            displayStudents();
        })
        .catch(error => {
            message.textContent = "Error loading students (404)";
            message.className = "error";
        });
}

// Display Students in Table
function displayStudents() {
    tableBody.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.marks}</td>
            <td>
                <button onclick="editStudent('${student.id}')">Edit</button>
                <button onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// CREATE / UPDATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const dept = document.getElementById("department").value;
    const marks = document.getElementById("marks").value;

    const existingStudent = students.find(s => s.id === id);

    if (existingStudent) {
        // UPDATE
        existingStudent.name = name;
        existingStudent.department = dept;
        existingStudent.marks = marks;

        message.textContent = "Student Updated Successfully (200)";
        message.className = "success";
    } else {
        // CREATE
        students.push({ id, name, department: dept, marks });

        message.textContent = "Student Added Successfully (200)";
        message.className = "success";
    }

    displayStudents();
    form.reset();
});

// EDIT
function editStudent(id) {
    const student = students.find(s => s.id === id);

    if (!student) {
        message.textContent = "Student Not Found (404)";
        message.className = "error";
        return;
    }

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;
}

// DELETE
function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        message.textContent = "Student Not Found (404)";
        message.className = "error";
        return;
    }

    students.splice(index, 1);
    displayStudents();

    message.textContent = "Student Deleted Successfully (200)";
    message.className = "success";
}

// Initial Load
fetchStudents();
