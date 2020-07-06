import React, { Component } from "react";
import Header from './Header';
import Search from './Search';
import EmployeesTable from './EmployeesTable';
import API from "../utils/API";

class EmployeesDirectory extends Component {

    state = {
        employees: [],
        query: ''
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

     //Filter by search input:
     filterByName = event => {

        const query = event.target.value;

         this.setState({
            query
        }, () => {

            const employeesList = this.state.employees;
           
            //add display: true/false to display the record if it matches the search string:
            const newEmployeeTable = employeesList.map(employee => {
                let name = employee.name.toLowerCase();

                if (name.indexOf(this.state.query.toLowerCase()) !== -1) {
                    return {...employee, display: true}
                } else {
                    return {...employee, display: false}
                }
            });

            this.setState({
                employees: newEmployeeTable,
            });

        });

    }

    render() {

        const employeesList = this.state.employees;

        return(
            <>
                <Header />
                <Search filterByName={this.filterByName} query={this.state.query} />
                <EmployeesTable employees={employeesList} />
            </>
        );
    }
}

export default EmployeesDirectory;