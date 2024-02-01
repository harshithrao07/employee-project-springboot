import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [employees, setEmployees] = useState([]);

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const [newEmployee, setNewEmployee] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: ""
    })

    function handleChange(event) {
        const { name, value } = event.target;

        setNewEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value
        }))
    }

    const [show, setShow] = useState({
        type: "",
        showing: false
    });

    const handleClose = () => setShow((prev) => ({ type: "", showing: false }));
    const handleShow = (type) => setShow((prev) => ({ type: type, showing: true }));

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const res = await axios.get("http://localhost:8080/api/employee", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res)
                setEmployees(res.data)
            } catch (error) {
                if (error.response.status === 403) {
                    navigate("/login?message=You have to login.")
                    localStorage.removeItem("token")
                } else {
                    console.log(error)
                }
            }
        }

        fetchEmployees();
    }, [])

    async function addEmployee() {
        try {
            const res = await axios.post("http://localhost:8080/api/employee", newEmployee, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            employees.push(newEmployee);
        } catch (error) {
            console.log(error)
        }
        handleClose();
    }

    async function updateEmployee(id) {
        try {
            const token = localStorage.getItem("token");  // Retrieve the token from localStorage

            const queryParams = [];

            if (newEmployee.email !== "") {
                queryParams.push(`email=${encodeURIComponent(newEmployee.email)}`);
            }

            if (newEmployee.role !== "") {
                queryParams.push(`role=${encodeURIComponent(newEmployee.role)}`);
            }

            const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

            const res = await axios.put(`http://localhost:8080/api/employee/${id}${queryString}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                setEmployees(prevEmployees => {
                    return prevEmployees.map(employee => {
                        if (employee.id === id) {
                            const { email, role } = employee;
                            return {
                                ...employee,
                                email: newEmployee.email || email,
                                role: newEmployee.role || role
                            };
                        }
                        return employee;
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
        handleClose();
    }


    async function deleteEmployee(id) {
        const confirmation = window.confirm(`Are you sure you want to delete the employee?`)
        if (confirmation === true) {
            try {
                const res = await axios.delete(`http://localhost:8080/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.status === 200) {
                    alert("Employee successfully deleted");
                    setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    function renderEmployees() {
        const sortedEmployees = [...employees].sort((a, b) => a.id - b.id);

        return sortedEmployees.map((employee, index) => (
            <tr key={index} style={index % 2 === 0 ? {} : { backgroundColor: "#D3D3D3" }}>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>
                    <Button size="sm" variant="warning" onClick={() => handleShow(employee.id)} className="table-btn "><p>Update</p></Button>
                    <Button size="sm" variant="danger" onClick={() => deleteEmployee(employee.id)} className="table-btn"><p>Delete</p></Button>
                </td>
            </tr>
        ))
    }

    return (
        <div className="main-page">
            <Header />
            <div className="main">
                <h1>Employees List:</h1>
                <Button variant="primary" onClick={() => handleShow("adding")}>
                    Add Employee
                </Button>

                <div style={{ marginBottom: "100px" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.length > 0 && renderEmployees()
                            }
                        </tbody>

                    </table>

                </div>
            </div>
            <Footer />
            <Modal centered size="sm" show={show.showing} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign: "center" }}>
                        {
                            show.type === "adding" ? "Add an Employee" : "Update an existing Employee"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        {
                            show.type === "adding" &&
                            <div>
                                <input onChange={handleChange} name="firstname" value={newEmployee.firstname} type="text" placeholder="Enter the first name" />
                                <input onChange={handleChange} name="lastname" value={newEmployee.lastname} type="text" placeholder="Enter the last name" />
                            </div>
                        }
                        {show.type === "updating" && <p>Update both or either one</p>}
                        <input onChange={handleChange} name="email" value={newEmployee.email} type="email" placeholder={`${show.type === 'adding' ? "Enter" : "Update"} the email of the employee`} />
                        <input onChange={handleChange} name="role" value={newEmployee.role} type="text" placeholder={`${show.type === 'adding' ? "Enter" : "Update"} the role of the employee`} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => (show.type === "adding" ? addEmployee() : updateEmployee(show.type))}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}