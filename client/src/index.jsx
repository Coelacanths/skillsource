import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import styles from './styles.css';
import Nav from './components/nav.jsx';
import About from './components/about.jsx';
import Browse from './components/browse.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Dashboard from './components/dashboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        username: 'Chris',
        email: 'chris@Skillsource.com',
        id: 1,
        enrolled: [{
          id: 1,
          name: 'Learn Javascript',
          description: 'Learn vanilla javascript in 30 days or less',
          rating: '****' },
          {
          id: 2,
          name: 'Swim like Michael Phelps',
          description: 'Master the techniques perfected by the master of swim.',
          rating: '*****' },
          {
          id: 3,
          name: 'Play the ukelele',
          description: 'Learn how to play the uke through youtube videos, perfectly ordered by level of difficulty.',
          rating: '***' }
        ],
      },
      courseData: {
        1: {
          id: 1,
          name: 'Learn Javascript',
          description: 'Master the techniques perfected by the master of swim.',
          rating: '*****'
        },
        2: {
          id: 2,
          name: 'Swim like Michael Phelps',
          description: 'Master the techniques perfected by the master of swim.',
          rating: '*****'
        },
        3: {
          id: 3,
          name: 'Play the ukelele',
          description: 'Learn how to play the uke through youtube videos, perfectly ordered by level of difficulty.',
          rating: '***'
        }
      }
    };
  }

  componentDidMount() {}

  render () {
    return (
      <HashRouter>
        <div className="viewport">

          <h1>Skillsource</h1>
          <Nav />
          <div className="content">
            <Route path="/about" component={About}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/dashboard" render={(props) => <Dashboard {...props} enrolled={this.state.userData.enrolled}/>}/>
            <Route exact path="/courses" component={Browse}/>
            {/*<Route path="/courses/:id" component={CourseView}/>*/}
          </div>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
