import React from "react";
import StudentCard from "./StudentCard";

function App() {
  const students = [
    { name: "Usha Sri", department: "CS", marks: 95 },
    { name: "Ravi Kumar", department: "IT", marks: 88 },
    { name: "Anita", department: "ECE", marks: 92 }
  ];

  return (
    <div>
      <h1>Student Cards</h1>
      <div style={{display:"flex", flexWrap:"wrap"}}>
        {students.map((student, index) => (
          <StudentCard 
            key={index}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </div>
    </div>
  );
}

export default App;