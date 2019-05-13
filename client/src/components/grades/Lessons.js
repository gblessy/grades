import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";

class Lessons extends Component {
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
                  <p className="lead">Lessons Today</p>
                  <div className="container">
                    <Link className="btn btn-success mr-5" to="/notifications">
                      Add Lesson
                    </Link>
                    <Link className="btn btn-success mr-5" to="/lessons">
                      View Lesson Materials
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

Lessons.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Lessons);
