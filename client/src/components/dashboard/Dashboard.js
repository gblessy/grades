import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";
import TeachersDashboard from "./TeacherDashboard";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

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
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="jumbotron bg-dark">
                  <TeachersDashboard
                    lessons={this.lessons}
                    notifications={this.notifications}
                  />
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
