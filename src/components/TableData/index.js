import React from "react";
import Moment from "react-moment";

function TableData(props) {
    return (
        <table className="employeeTable">
            <thead>
                <tr>
                    <th>Image</th>
                    <th onClick={props.sortByName}>Name</th>
                    <th>Phone</th>
                    <th>E-mail</th>
                    <th>DOB</th>
                </tr>
            </thead>

            <tbody className="">
                {props.results.map(result =>
                    <tr className="table" key={result.login.uuid}>
                        <td><img src={result.picture.thumbnail} alt={"profile image for " + result.name.first + " " + result.name.last} className="" /></td>
                        <td>{result.name.first + " " + result.name.last}</td>
                        <td>{result.phone}</td>
                        <td className="employeeEmail"><a href={result.emil}>{result.email}</a></td>
                        <td><Moment format="MM/DD/YYYY">{result.dob.date}</Moment></td>

                    </tr>
                )}
            </tbody>
        </table>

    )
}

export default TableData