import React, { Component } from "react";
import '../css/styles.css';

class Header extends Component {
    render() {
        return (
            <header className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h3 className="display-4">Employee Directory</h3>
                    <p className="lead">Search for an employee by name by typing in the search box below.<br />
                    Sort the employees alphabetically and reverse alphabetically by clicking on the Name column heading.</p>
                </div>
            </header>
        );
    }

}

export default Header;