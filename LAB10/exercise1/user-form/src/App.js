import React, { useState } from "react";

export default function App() { const [formData, setFormData] = useState({ name: "", email: "", password: "", });

const [errors, setErrors] = useState({});

const validate = () => { let newErrors = {};

// Name validation
if (!formData.name.trim()) {
  newErrors.name = "Name is required";
}

// Email validation
if (!formData.email) {
  newErrors.email = "Email is required";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  newErrors.email = "Invalid email format";
}

// Password validation
if (!formData.password) {
  newErrors.password = "Password is required";
} else if (formData.password.length < 6) {
  newErrors.password = "Password must be at least 6 characters";
}

return newErrors;

};

const handleChange = (e) => { const { name, value } = e.target; setFormData({ ...formData, [name]: value }); };

const handleSubmit = (e) => { e.preventDefault();

const validationErrors = validate();

if (Object.keys(validationErrors).length > 0) {
  setErrors(validationErrors);
} else {
  console.log("Form Submitted:", formData);
  alert("Form submitted successfully!");

  // Reset form
  setFormData({ name: "", email: "", password: "" });
  setErrors({});
}

};

return ( <div style={{ maxWidth: "400px", margin: "50px auto" }}> <h2>User Form</h2> <form onSubmit={handleSubmit}> {/* Name */} <div> <label>Name:</label><br /> <input
type="text"
name="name"
value={formData.name}
onChange={handleChange}
/> {errors.name && <p style={{ color: "red" }}>{errors.name}</p>} </div>

{/* Email */}
    <div>
      <label>Email:</label><br />
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
    </div>

    {/* Password */}
    <div>
      <label>Password:</label><br />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
    </div>

    <br />
    <button type="submit">Submit</button>
  </form>
</div>

); }