import React, { Component } from "react";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, logoutUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { sendEmail } from "../../actions/mailActions";

class AddGrade extends Component {
  constructor() {
    super();
    this.state = {
      grade: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  students = [
    { name: "joe", surname: "doe", grade: null },
    { name: "james", surname: "blant", grade: null },
    { name: "ennio", surname: "Morricone", grade: null },
    { name: "Garry", surname: "Moore", grade: null }
  ];

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { history } = this.props;

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    sendEmail();
    history.push("/addedlessondash");

    // this.props.registerUser(newUser, history);
    // this.props.logoutUser();
  }

  render() {
    const { errors, student } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Add grade to {this.students[0].name} {this.students[0].surname}
              </h1>
              <p className="lead text-center">Provide Lesson Details</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Grade"
                  name="grade"
                  type="text"
                  value={this.state.grade}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddGrade.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, logoutUser }
)(withRouter(AddGrade));
