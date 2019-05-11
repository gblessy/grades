import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";

class HomeworkRow extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { work } = this.props;

    return (
      <>
        <tr>
          <th scope="row">{work.count}</th>
          <td>{work.lesson}</td>
          <td>{work.homework}</td>
          <td>{work.book}</td>
        </tr>
      </>
    );
  }
}

HomeworkRow.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(HomeworkRow);
