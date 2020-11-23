import React from "react";

function EmployeeDetails(props) {
  console.log(props);
  let result = props.results;
  console.log(result);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Photo</th>
          <th scope="col">Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Email</th>
          <th scope="col">DOB</th>
        </tr>
      </thead>
      <tbody>
        {/* {results.map((result) => ( */}
        <tr key={result.login.uuid}>
          <td>
            <img
              alt={result.name.first}
              className="img-fluid"
              src={result.picture.thumbnail}
            />
          </td>
          <td>
            {result.name.first} {result.name.last}
          </td>
          <td>{result.phone}</td>
          <td>{result.dob.date.split("T")}</td>
        </tr>
        {/* ))} */}
      </tbody>
    </table>
  );
}

export default EmployeeDetails;
