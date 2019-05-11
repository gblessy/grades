import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";
import LessonRow from "./LessonRow";
import NotificationRow from "./NotificationRow";

class TeacherDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { lessons, notifications } = this.props;

    return (
      /* eslint-disable no-unused-expressions */
      <>
        <p className="lead">{this.props.auth.user.name} Main Dashboard:</p>
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
            {lessons.map((lesson, key) => (
              <LessonRow lesson={lesson} key={key} />
            ))}
          </tbody>
        </table>
        <Link className="btn btn-success mr-5" to="/addlesson">
          AddLesson
        </Link>
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
        <div className="container">
          <Link className="btn btn-success mr-5" to="/addteacher">
            AddTeacher
          </Link>
          <Link className="btn btn-success mr-5" to="/lessons">
            Lessons
          </Link>

          <Link className="btn btn-success mr-5" to="/homework">
            Homework
          </Link>
          <Link className="btn btn-success mr-5" to="/schedule">
            Schedule
          </Link>
        </div>
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
