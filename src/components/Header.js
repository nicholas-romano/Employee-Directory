import React, { Component } from "react";
import '../css/styles.css';

class Header extends Component {
    render() {
        return (
            <header className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h3 className="display-4">Employee Directory</h3>
                    <p className="lead">Click on the Name column heading to search in reverse alphabetical order / alphabetical order</p>
                </div>
            </header>
        );
    }

}

export default Header;