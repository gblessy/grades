import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";
import HomeworkRow from "./HomeworkRow";
import NotificationRow from "./NotificationRow";
import MarksRow from "./MarksRow";

class TeacherDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { homework, notifications, marks } = this.props;

    return (
      /* eslint-disable no-unused-expressions */
      <>
        <p className="lead">{this.props.auth.user.name} Notifications:</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Form</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, key) => (
              <NotificationRow notification={notification} key={key} />
            ))}
          </tbody>
        </table>

        <p className="lead">{this.props.auth.user.name} Homework:</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Lessons</th>
              <th scope="col">Form</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {homework.map((work, key) => (
              <HomeworkRow work={work} key={key} />
            ))}
          </tbody>
        </table>

        <p className="lead">{this.props.auth.user.name} Grades:</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Lessons</th>
              <th scope="col">Grade</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark, key) => (
              <MarksRow mark={mark} key={key} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

TeacherDashboard.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(TeacherDashboard);
