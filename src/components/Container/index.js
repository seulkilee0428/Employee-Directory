import React, { Component } from "react"
import API from "../../utils/API"
import TableData from "../TableData"
import SearchBox from "../SearchBox";


class Container extends Component {
    state = {
        search: "",
        employees: [],
        filteredEmployees: [],
        order: ""
    };

    componentDidMount() {
        API.getUsers().then(res => this.setState({
            employees: res.data.results,
            filteredEmployees: res.data.results
        })).catch(err => console.log(err))
    }

    sortByName = () => {
        const filtered = this.state.filteredEmployees;
        if (this.state.order === "asc") {
            const sorted = filtered.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)

            this.setState({
                filteredEmployees: sorted,
                order: "desc"
            })
        } else {
            const sorted = filtered.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
            this.setState({
                filteredEmployees: sorted,
                order: "asc"
            })
        }
    }

    handleInputChange = event => {
        const employees = this.state.employees;
        const userInput = event.target.value;
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
        this.setState({
            filteredEmployees,
        });
    };

    employeeSearch = () => {
        API.getUsers()
            .then(res => this.setState({
                filteredEmployees: res.data.results,
                employees: res.data.results
            }))
            .catch(err => console.log(err))

    }

    handleSearch = event => {
        event.preventDefault();
        if (!this.state.search) {
            alert("Enter a name")
        }
        const { employees, search } = this.state;
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().includes(search.toLowerCase()));

        this.setState({
            filteredEmployees
        });
    }

    render() {
        return (
            <div>
                <SearchBox
                    employee={this.state.employees}
                    handleSearch={this.handleSearch}
                    handleInputChange={this.handleInputChange} />

                <TableData
                    results={this.state.filteredEmployees}
                    sortByName={this.sortByName} />


            </div>
        )

    }

}

export default Container
