import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActons";

import StudentRow from "../../components/dashboard/StudentRow";

class AddedLessonDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  lesson = {
    name: "Mathematics",
    group: "4B",
    plan:
      "P3, pg. 41, Division of a numbers. How to divide. What to do with rest. Question, What happens is we multiply divided numbers?",
    students: [
      { name: "joe", surname: "doe", grade: 4 },
      { name: "james", surname: "blant", grade: null },
      { name: "ennio", surname: "Morricone", grade: null },
      { name: "Garry", surname: "Moore", grade: null }
    ]
  };
  /* eslint-disable */

  updateGrade = (grade, student) => {
    debugger;
    const students = this.lesson.students;
    for (let i in students) {
      if (students[i].name === student.name) {
        this.lesson.students[i].grade = grade;
      }
    }
    window.location.reload();
  };
  /* eslint-enable */
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
                  <p className="lead">
                    {this.lesson.name}, Group: {this.lesson.group}
                  </p>
                  <p className="lead">{this.lesson.plan}</p>

                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.lesson.students.map((student, key) => (
                        <StudentRow
                          student={student}
                          key={key}
                          onClick={this.updateGrade}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddedLessonDashboard.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(AddedLessonDashboard);
