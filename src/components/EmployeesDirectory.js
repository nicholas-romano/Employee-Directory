import React, { Component } from "react";
import Header from './Header';
import Search from './Search';
import EmployeesTable from './EmployeesTable';
import API from "../utils/API";

class EmployeesDirectory extends Component {

    state = {
        employees: [],
        query: '',
        sortedEmployees: [],
        sortType: ''
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

            let employeesList;

            if (this.state.sortedEmployees.length > 0) {
                employeesList = this.state.sortedEmployees;
            } else {
                employeesList = this.state.employees;
            }
           
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
                sortedEmployees: newEmployeeTable
            });

        });

    }

    //sort alphabetically/reverse alphabetically employees by some name key:
    sortAlpha = employees => {

        const sortType = this.state.sortType;

        if (sortType === 'desc' || sortType === '') {
            //sort alpha ascending order:
            employees.sort(this.dynamicSort("name"));
            this.setState({
                sortedEmployees: employees,
                sortType: 'asc'
            });
        } else if (sortType === 'asc') {
            //sort alpha descending order:
            employees.sort(this.dynamicSort("-name"));
            this.setState({
                sortedEmployees: employees,
                sortType: 'desc'
            });
        }

    }

    //reorders employees list alphabetically/reverse alphabetically:
    dynamicSort = property => {

        var sortOrder = 1;

        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a,b) {
            if (sortOrder === -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }        
        }
    }

    render() {

        let employeesList;

        if (this.state.sortedEmployees.length > 0) {
            employeesList = this.state.sortedEmployees;
        } else {
            employeesList = this.state.employees;
        }

        //&#9650; up arrow
        //&#9660; down arrow

        let sortArrow;

        const sortState = this.state.sortType;

        if (sortState === 'asc') {
            //down arrow
            sortArrow = <span>&#9660;</span>;
        } else if (sortState === 'desc') {
            //up arrow
            sortArrow = <span>&#9650;</span>;
        } else {
            sortArrow = '';
        }

        return(
            <>
                <Header />
                <Search filterByName={this.filterByName} query={this.state.query} />
                <EmployeesTable employees={employeesList} sortAlpha={this.sortAlpha} sortArrow={sortArrow}  />
            </>
        );
    }
}

export default EmployeesDirectory;