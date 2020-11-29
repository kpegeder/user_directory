import React, { Component } from "react";
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import Card from "../Card";
import SearchForm from "../SearchForm";
import EmployeeDetails from "../EmployeeDetails";
import API from "../../utils/API";
import "./style.css";

const headerStyle = {
  "text-align": "center",
};

class EmployeeContainer extends Component {
  state = {
    result: [],
    search: "",
    order: "asc",
    updateList: [],
  };

  componentDidMount() {
    API.getUsers()
      .then((res) =>
        this.setState({
          result: res.data.results,
          updateList: res.data.results,
        })
      )
      .catch((err) => console.log(err));
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    let employee = this.state.result.filter((data) => {
      let first = data.name.first;
      let last = data.name.last;
      let fullname = first + " " + last;

      return fullname.includes(value);
    });
    this.setState({
      [name]: value,
      updateList: employee,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.searchEmployees(this.state.search);
  };

  sortByFirstName = (currentSpot, nextSpot) => {
    if (currentSpot.name.first > nextSpot.name.first) {
      return 1;
    }
    return -1;
  };

  sortByName = (event) => {
    event.preventDefault();
    console.log("hello");
    const { order } = this.state;
    let sortedArr = [];
    if (order === "asc") {
      sortedArr = this.state.result.sort(this.sortByFirstName);
    } else {
      sortedArr = this.state.result.reverse(this.sortByFirstName);
    }
    this.setState({
      result: sortedArr,
      updateList: sortedArr,
      order: order === "asc" ? "desc" : "asc",
    });
  };

  // const jumboStyle = {
  //   'text-align': 'center';
  // }

  render() {
    return (
      <Container>
        <div class="jumbotron">
          <h1 class="display-4" style={headerStyle}>
            Employee Directory
          </h1>
        </div>
        <Row>
          <Col size="md-12">
            <Card heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <EmployeeDetails
              results={this.state.updateList}
              sortByName={this.sortByName}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EmployeeContainer;
