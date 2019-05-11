import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";

class MarksRow extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { mark } = this.props;

    return (
      <>
        <tr>
          <th scope="row">{mark.count}</th>
          <td>{mark.lesson}</td>
          <td>{mark.mark}</td>
          <td>{mark.day}</td>
        </tr>
      </>
    );
  }
}

MarksRow.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MarksRow);
