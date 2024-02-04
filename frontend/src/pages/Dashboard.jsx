import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";;
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
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
            <tr key={index} className={index % 2 !== 0 && `bar`}>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td className="flex">
                    <svg onClick={() => handleShow(employee.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <svg onClick={() => deleteEmployee(employee.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </td>
            </tr>
        ))
    }

    return (
        <div className="flex flex-col justify-center items-center my-10">
            <h1 className="text-center text-2xl font-semibold mb-3">Employees List:</h1>
            <Button className="text-white border-white" variant="outlined" ripple={true} onClick={() => handleShow("adding")}>
                Add Employee
            </Button>

            <div className="my-8">
                <table>
                    <thead>
                        <tr className="uppercase bar">
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-primary-100">
                        {
                            employees.length > 0 && renderEmployees()
                        }
                    </tbody>

                </table>

            </div>

            {/* <Modal centered size="sm" show={show.showing} onHide={handleClose}>
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
            </Modal> */}

        </div>
    )
}