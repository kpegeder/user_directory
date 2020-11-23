import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import EmployeeDetails from "./EmployeeDetails";
import API from "../utils/API";

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

  sortByFirst = (currentSpot, nextSpot) => {
    if (currentSpot.name.first > nextSpot.name.first) {
      return 1;
    }
    return -1;
  };

  sortByName = (event) => {
    event.preventDefault();
    const { order } = this.state;
    let sortedArr = [];
    if (order === "asc") {
      sortedArr = this.state.result.sort(this.sortByFirst);
    } else {
      sortedArr = this.state.result.reverse(this.sortByFirst);
    }
    this.setState({
      result: sortedArr,
      order: order === "asc" ? "desc" : "asc",
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-4">
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
            <Card>
              {/* {this.state.results ? ( */}
              <EmployeeDetails
                results={this.state.updateList}
                sortByName={this.sortByName}
              />
              {/* // ) : (
              //   <h3>No Results to Display</h3>
              // )} */}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EmployeeContainer;
