import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";;
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);

    const token = sessionStorage.getItem("token")
    const username = sessionStorage.getItem("username")

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

    const handleClose = () => {
        setShow((prev) => ({ type: "", showing: false }));
        setNewEmployee({
            firstname: "",
            lastname: "",
            email: "",
            role: ""
        })
    }

    const handleShow = (type) => setShow((prev) => ({ type: type, showing: true }));

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const res = await axios.get("http://localhost:8080/api/employee", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setEmployees(res.data)
            } catch (error) {
                if (error.response.status === 403) {
                    navigate("/login?message=You have to login.")
                    sessionStorage.removeItem("token")
                    sessionStorage.removeItem("username")
                } else {
                    console.log(error)
                }
            }
        }

        fetchEmployees();
    }, [])

    async function addEmployee() {
        try {
            if (newEmployee.firstname !== "" && newEmployee.lastname !== "" && newEmployee.email !== "" && newEmployee.role !== "") {
                const res = await axios.post("http://localhost:8080/api/employee", newEmployee, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                employees.push(newEmployee);
                alert('Successfully added a new employee.')
                handleClose();
            } else {
                alert('You have to enter some details.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function updateEmployee(id) {
        try {
            const token = sessionStorage.getItem("token");  // Retrieve the token from sessionStorage

            const queryParams = [];

            if (newEmployee.email !== "") {
                queryParams.push(`email=${encodeURIComponent(newEmployee.email)}`);
            }

            if (newEmployee.role !== "") {
                queryParams.push(`role=${encodeURIComponent(newEmployee.role)}`);
            }

            const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

            if (queryString !== "") {
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
                    alert('Successfully updated an employee.')
                    handleClose();
                }
            } else {
                alert('You have to enter some details.')
            }

        } catch (error) {
            console.log(error);
        }
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
            <tr key={index} className={index % 2 === 0 ? '' : 'bar'}>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td><Link target="_blank" to={`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${employee.email}`}>{employee.email}</Link></td>
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
            <h3 className="cursor-default">You are currently logged in as <span className="font-semibold underline">{username}</span></h3>
            <h1 className="text-center text-2xl font-semibold mb-3 mt-3">Employees List:</h1>
            <Button className="text-white border-white" variant="outlined" ripple={true} onClick={() => handleShow("adding")}>
                Add Employee
            </Button>

            <div className="my-8 bg-black">
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
                    <tbody className="text-gray-400">
                        {
                            employees.length > 0 && renderEmployees()
                        }
                    </tbody>

                </table>

            </div>

            <Dialog size="xs" className="bar border border-[#ffffff2e]" open={show.showing} handler={handleShow}>
                <DialogHeader className="text-white flex justify-center border-b border-[#ffffff2e]">
                    {
                        show.type === "adding" ? <h3>Add an Employee</h3> : <h3>Update an existing Employee</h3>
                    }
                </DialogHeader>
                <DialogBody className="border-b border-[#ffffff2e]">
                    {show.type !== "adding" && <p className="text-center text-white text-sm">(You can either update both the name and role of the employee or any one of them.)</p>}
                    <form className="flex flex-col border-0">
                        {
                            show.type === "adding" &&
                            <div className="flex flex-col">
                                <label htmlFor="firstname">Enter the firstname:</label>
                                <input id="firstname" onChange={handleChange} name="firstname" value={newEmployee.firstname} type="text" />
                                <label htmlFor="lastname">Enter the lastname:</label>
                                <input id="lastname" onChange={handleChange} name="lastname" value={newEmployee.lastname} type="text" />
                            </div>
                        }
                        {show.type === "updating" && <p>Update both or either one</p>}
                        <label htmlFor="id">{`${show.type === 'adding' ? "Enter" : "Update"} the email of the employee:`}</label>
                        <input id="email" onChange={handleChange} name="email" value={newEmployee.email} type="email" />
                        <label htmlFor="role">{`${show.type === 'adding' ? "Enter" : "Update"} the role of the employee:`}</label>
                        <input id="role" onChange={handleChange} name="role" value={newEmployee.role} type="text" />
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button variant="outlined" className="text-white mr-5" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => (show.type === "adding" ? addEmployee() : updateEmployee(show.type))}>
                        Submit
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}