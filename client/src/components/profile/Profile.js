import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Super School System</h1>
                <div className="jumbotron bg-dark">
                  <p className="lead">Name: {this.props.auth.user.name},</p>
                  <p className="lead">Email: jondoe@gmail.com</p>
                  <div className="container">
                    <Link className="btn btn-success mr-5" to="/notifications">
                      Notifications
                    </Link>
                    <Link className="btn btn-success mr-5" to="/lessons">
                      Lessons
                    </Link>
                    <Link className="btn btn-success mr-5" to="/materials">
                      Materials
                    </Link>
                    <Link className="btn btn-success mr-5" to="/homework">
                      Homework
                    </Link>
                    <Link className="btn btn-success mr-5" to="/schedule">
                      Schedule
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
