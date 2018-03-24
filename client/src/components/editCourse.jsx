import React, { Component } from "react";
import ApiService from '../services/ApiService.js';
import CreateStep from './createStep.jsx';
import ReactTags from 'react-tag-autocomplete';
import moment from 'moment';

class EditCourse extends Component {
  constructor() {
    super();
    this.state = {
      steps: [
        {
          name: '',
          ordinalNumber: 0,
          text: '',
          url: '',
          duration: 0,
          minutes: 0,
          unit: 'minutes'
        }
      ],
      tags: [],
      suggestions: [],
      stepsToDelete: []
    };
  }

  componentWillMount(){
    this.setState({ steps: this.props.course.steps })
    ApiService.getCourse(this.props.course.id)
      .then((course)=>{
        console.log('after getCourse >>>>', course)
        var tmpTags = []
        course.tags.forEach((tag) => {
          tmpTags.push({ id: tag.id, name: tag.name })
        })
        return tmpTags
      }).then((tags) => {
        this.setState({ tags })
        console.log('the course Id >>>>>', this.props.course.id)
      })
  }

  componentDidMount() {
    ApiService.getTags()
      .then(tags => this.setState({ suggestions: tags }));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { steps, tags, suggestions, name, description } = this.state;
    ApiService.updateCourse(this.props.course.id, name, description, steps, tags, this.state.stepsToDelete)
      .then( () => this.props.toggleEdit())
      .then( () => this.props.reRenderCreated())
      .catch(err => console.error('err in submit changes', err));
  }

  addStep = () => {
    let steps = this.state.steps.slice();
    steps.push({
      name: '',
      ordinalNumber: steps.length,
      text: '',
      url: '',
    });

    this.setState({ steps });
  }

  deleteStep = (index) => {
    let steps = this.state.steps.slice();
    let stepId = this.state.steps[index].id
    steps.splice(index, 1);
    for (let i = 0; i < steps.length; i++) {
      steps[i].ordinalNumber = i;
    }

    this.setState({ steps , stepsToDelete: [stepId, ...this.state.stepsToDelete]});
    console.log('steps after delete step is called~~~~', steps)
  }

  handleStepsChange = (e, index) => {
    let steps = this.state.steps.slice();
    steps[index][e.target.name] = e.target.value;

    const unit = steps[index].unit
    const duration = Number(steps[index].duration)
    steps[index].minutes = moment.duration({ [unit]: duration }).asMinutes();

    this.setState({ steps });
  }
  

  handleDelete = (i) => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition = (tag) => {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }

  render() {
    const steps = this.state.steps.map((step, i) => {
      return (
        <CreateStep
          key={i}
          data={step}
          deleteStep={this.deleteStep}
          stepChange={this.handleStepsChange}
        />
      )
    });

    return (
      <div className="create-page">
        <h3>Edit course:</h3>
        <div className="create">
          <div className="input">
            <label>Course Name: </label>
            <input defaultValue={this.props.course.name} name="name" id="createName" type="text" onChange={this.handleChange} />
          </div>
          <ReactTags
            tags={this.state.tags}
            suggestions={this.state.suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            allowNew={true}
          />
          <div className="input">
            <label>Description: </label>
            <textarea defaultValue={this.props.course.description} name="description" id="createDescription" type="text" onChange={this.handleChange}/>
          </div>
          {steps}
          <button onClick={this.addStep}>Add a step</button>
          <button onClick={this.handleSubmit}>Submit Changes</button>
        </div>
      </div>
    );
  }
}

export default EditCourse;
