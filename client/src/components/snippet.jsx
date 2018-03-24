import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import EditCourse from './editCourse.jsx'


class Snippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    }
  }

  onMouseEnter = () => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(this.props.data.steps);
    }
  }

  onMouseLeave = () => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  }

  edit = (e) => {
    if(e){
      e.preventDefault();
    }
    var editable = this.state.editable;
    this.setState({editable: !editable});
  }

  render() {
    const { id, name, rating, description, steps } = this.props.data;
    const url = "#/courses/" + id;
    
    let totalMinutes = 0;

    steps.forEach(step => totalMinutes += step.minutes);

    const time = moment.duration(totalMinutes, 'minutes').humanize();

    return (
      <div>
      <a href={url} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="snippet">
          <div className="snippet-name">
            <h4>{name}</h4>
          </div>
          {
            (this.props.numOfEnroll >= 0)
            ? <p className="enrollment-counts">{this.props.numOfEnroll} users enrolled </p>
            : <p></p>
          }
          <div className="snippet-time">
            <h4 className="estimated-time">Estimated Time: {time}</h4>
            {
              this.props.editable
              ? <div className='editable' onClick={this.edit}>Edit</div>
              : ''
            }
          </div>
          <div className="snippet-rating">
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={rating}
              editing={false}
            />
          </div>
          {
              Number.isInteger(this.props.progress)
              ? ((this.props.progress === 100)
                ? <p className='progress'>Completed!</p>
                : <div className='progress'><p>In progress: </p>
                <p>{this.props.progress}% complete. </p>
                </div>) 
              : this.props.progress === "not enrolled"
                ? <p className='progress'>You're not enrolled</p>
              :<p></p>
          }
          <div className="snippet-description">
          <p>{description}</p>
          </div>
        </div>
      </a>
      {
            this.state.editable
            ? <EditCourse course={this.props.data} toggleEdit={this.edit} reRenderCreated={this.props.reRenderCreated} />
            : ''
          }
      </div>
    );
  }
}

export default Snippet;
