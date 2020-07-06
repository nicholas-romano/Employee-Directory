import React, { Component } from "react";
import Header from './Header';
import EmployeesTable from './EmployeesTable';
import API from "../utils/API";

class EmployeesDirectory extends Component {

    state = {
        employees: []
    };

    componentDidMount() {
       this.loadAllEmployees();
    }

    loadAllEmployees() {
        API.getEmployees()
        .then(res => { 
            this.createNewEmployeesList(res.data.results);
        })
        .catch(err => console.log(err));
    }

    createNewEmployeesList = employees => {

        const newEmployeesList = employees.map((employee => {

            return (
                {
                    dob: employee.dob.date,
                    email: employee.email,
                    name: `${employee.name.first} ${employee.name.last}`,
                    phone: employee.phone,
                    image: employee.picture.large
                }
            )

        }))

        this.setState({
            employees: newEmployeesList
        })
    }

    render() {

        const employeesList = this.state.employees;

        return(
            <>
                <Header />
                <EmployeesTable employees={employeesList} />
            </>
        );
    }
}

export default EmployeesDirectory;