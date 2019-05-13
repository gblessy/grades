import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";
import { Link } from "react-router-dom";

class StudentRow extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { student, onClick } = this.props;

    return (
      <>
        <tr>
          <th scope="row">{student.count}</th>
          <td>{student.name}</td>
          <td>{student.surname}</td>
          <td>{student.grade}</td>
          <td>
            <Link className="btn btn-success" to="/addgrade">
              Add Grade
            </Link>
          </td>
        </tr>
      </>
    );
  }
}

StudentRow.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(StudentRow);
