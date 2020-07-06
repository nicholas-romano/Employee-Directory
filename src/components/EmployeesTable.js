import React, { Component } from "react";
import Employee from './Employee';

class EmployeesTable extends Component {

    render(props) {
        
        return (
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.employees.map((employee, index) => (
                            <Employee 
                                key={index}
                                order={index + 1}
                                image={employee.image}
                                name={employee.name}
                                phone={employee.phone}
                                email={employee.email}
                                dob={employee.dob}
                            />
                        ))
                    }
                </tbody>
            </table>
        );
    }

}

export default EmployeesTable;
