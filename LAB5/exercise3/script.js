let students = [];

// Show message
function showMessage(msg, success = true) {
    const message = document.getElementById('msg');
    message.style.color = success ? 'green' : 'red';
    message.textContent = msg;
}

// Load JSON data
function loadStudents() {
    fetch('students.json')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load JSON");
            return response.json();
        })
        .then(data => {
            students = data;
            displayStudents();
        })
        .catch(err => showMessage("Error: " + err, false));
}

// Display students in table
function displayStudents() {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";
    if (students.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No students found</td></tr>";
        return;
    }

    students.forEach(student => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = student.id;
        row.insertCell(1).textContent = student.name;
        row.insertCell(2).textContent = student.course;
        row.insertCell(3).textContent = student.marks;
        row.insertCell(4).innerHTML = `<button onclick="prepareDelete(${student.id})">Delete</button>`;
    });
}

// Add student
function addStudent() {
    const id = parseInt(document.getElementById('addId').value);
    const name = document.getElementById('addName').value;
    const course = document.getElementById('addCourse').value;
    const marks = parseInt(document.getElementById('addMarks').value);

    if (!id || !name || !course || !marks) {
        showMessage("Please fill all fields", false);
        return;
    }

    if (students.some(s => s.id === id)) {
        showMessage("Student ID already exists", false);
        return;
    }

    students.push({ id, name, course, marks });
    displayStudents();
    showMessage("Student added successfully");
}

// Update student
function updateStudent() {
    const id = parseInt(document.getElementById('updateId').value);
    const course = document.getElementById('updateCourse').value;
    const marks = parseInt(document.getElementById('updateMarks').value);

    if (!id) {
        showMessage("Enter student ID to update", false);
        return;
    }

    const student = students.find(s => s.id === id);
    if (!student) {
        showMessage("Student not found", false);
        return;
    }

    if (course) student.course = course;
    if (marks) student.marks = marks;

    displayStudents();
    showMessage("Student updated successfully");
}

// Delete student
function deleteStudent() {
    const id = parseInt(document.getElementById('deleteId').value);
    if (!id) {
        showMessage("Enter student ID to delete", false);
        return;
    }

    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        showMessage("Student not found", false);
        return;
    }

    students.splice(index, 1);
    displayStudents();
    showMessage("Student deleted successfully");
}

// Optional: delete from table button
function prepareDelete(id) {
    document.getElementById('deleteId').value = id;
}

window.onload = loadStudents;
