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
  };

  componentDidMount() {
    API.getUsers()
      .then((res) => this.setState({ result: res.data }))
      .catch((err) => console.log(err));
  }

  // searchEmployees = () => {
  //   API.getUsers()
  //     .then((res) => this.setState({ result: res.data }))
  //     .catch((err) => console.log(err));
  // };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.searchEmployees(this.state.search);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-8">
            <Card>
              {/* {this.state.results ? ( */}
              <EmployeeDetails results={this.state.result} />
              {/* // ) : (
              //   <h3>No Results to Display</h3>
              // )} */}
            </Card>
          </Col>
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
      </Container>
    );
  }
}

export default EmployeeContainer;
