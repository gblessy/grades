import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";
import TeachersDashboard from "./TeacherDashboard";
import ParentDashboard from "./ParentDashboard";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  auth = {
    type: "teacher"
  };

  lessons = [
    { count: 1, name: "Mathematics", form: "4B", time: "8.15-9.00" },
    { count: 2, name: "Mathematics", form: "4B", time: "8.15-9.00" },
    { count: 3, name: "Mathematics", form: "4B", time: "8.15-9.00" },
    { count: 4, name: "Mathematics", form: "4B", time: "8.15-9.00" },
    { count: 5, name: "Mathematics", form: "4B", time: "8.15-9.00" }
  ];

  notifications = [
    {
      count: 1,
      title: "Ann is not going to be at the lesson today",
      from: "Vladyslav Romanchenko",
      time: "7.45"
    },
    {
      count: 2,
      title: "5B lesson canceled",
      from: "Director of school",
      time: "9.10"
    }
  ];

  homework = [
    {
      count: 1,
      lesson: "Mathematics",
      homework: "Ex. 2, pg. 55",
      book: "ClassBook1"
    },
    {
      count: 2,
      lesson: "Physics",
      homework: "Ex. 7, pg. 54",
      book: "ClassBook3"
    },
    {
      count: 3,
      lesson: "Literature",
      homework: "pg. 80",
      book: "ClassBook7"
    }
  ];

  marks = [
    {
      count: 1,
      lesson: "Mathematics",
      mark: 5,
      day: "11.05.2019"
    },
    {
      count: 2,
      lesson: "Physics",
      mark: 4,
      day: "11.05.2019"
    },
    {
      count: 1,
      lesson: "Literature",
      mark: 3,
      day: "11.05.2019"
    }
  ];

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="card bg-dark">
                  {this.auth.type === "teacher" && (
                    <TeachersDashboard
                      lessons={this.lessons}
                      notifications={this.notifications}
                    />
                  )}
                  {this.auth.type === "parent" && (
                    <ParentDashboard
                      homework={this.homework}
                      notifications={this.notifications}
                      marks={this.marks}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
