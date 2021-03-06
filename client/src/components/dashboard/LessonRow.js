import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";
import { Link } from "react-router-dom";

class LessonRow extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { lesson } = this.props;

    return (
      <>
        <tr>
          <th scope="row">{lesson.count}</th>
          <td>
            <Link to="/lessondashboard">{lesson.name}</Link>
          </td>
          <td>{lesson.form}</td>
          <td>{lesson.time}</td>
        </tr>
      </>
    );
  }
}

LessonRow.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(LessonRow);
