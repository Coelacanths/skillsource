import React from "react";
import Step from './step.jsx';
import Comment from './comment.jsx';
import ApiService from '../services/ApiService.jsx'
import CourseHeader from './courseHeader.jsx'
import AuthService from '../services/AuthService.jsx'

class Course extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courseData: '',
      enrolled: false,
      loggedIn: false
    };
  }

  handleEnrollment = () => {
    this.setState({
      enrolled: !this.state.enrolled
    }, () => {
      ApiService.enroll(this.props.match.params.id)
    })
  }

  componentDidMount() {
    let loggedIn = AuthService.loggedIn();
    const courseId = this.props.match.params.id;
    if(loggedIn){
      ApiService.isEnrolled(courseId).then((isEnrolled)=>{
        console.log('>>>>>>..', isEnrolled)
        this.setState({enrolled: isEnrolled});
      })
    }
    ApiService.getCourse(courseId).then(res=>{
      this.setState({courseData: res, loggedIn: loggedIn})
    })
  }

  render(){
    return (
      <div className="course-view">
          <CourseHeader handleEnrollment={this.handleEnrollment} course={this.state.courseData} enrolled={this.state.enrolled} loggedIn={this.state.loggedIn} />
          <p>Description: {this.state.courseData.description}</p>
          {
            (this.state.courseData.steps === undefined) ?
              <div>Loading..</div>
            :
            this.state.courseData.steps.map((step)=>{
              return <Step enrolled={this.state.enrolled} key={step.id} data={step} stepId={step.id} courseId={this.props.match.params.id} />
            })
          }
          {
            (this.state.courseData.id === undefined) ?
            <div>Loading Comments..</div>
            :
            <Comment courseId={this.state.courseData.id} />
          }
      </div>
    );
  }
}

export default Course;

