import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";

class NotificationRow extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { notification } = this.props;

    return (
      <>
        <tr>
          <th scope="row">{notification.count}</th>
          <td>{notification.title}</td>
          <td>{notification.from}</td>
          <td>{notification.time}</td>
        </tr>
      </>
    );
  }
}

NotificationRow.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(NotificationRow);
