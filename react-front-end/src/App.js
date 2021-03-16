import React from 'react';
// import { makeStyles } from '@material-ui/core'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import axios from 'axios';
// import './App.css';

import { useApplicationData } from './hooks/useApplicationData'; 

import Resume from './components/Resume'
import Sidebar from './components/Sidebar'
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from "./components/Home"
import SkillCheck from './components/SkillCheck';
import WorkExperience from './components/WorkExperience';
import Github from './components/Github';
import Footer from './components/Footer';
import BasicInfo from './components/BasicInfo';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '50vh',
//     backgroundColor: '#f8f8ff',
//     padding: '10%'
//   },
//   content: {
//     // Container,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     alignContent: 'center'
//   },
//   controlpanel: {
    
//   },
//   resume: {
//     justify: 'center'
//   }
// }));

export default function App() {
  const {
    state,
    registerUser,
    loginUser,
    updateUser,
    addUserHardSkill,
    removeUserHardSkill,
    updateWork
  } = useApplicationData(); 

  return(
    <Router>
      <Sidebar user={state.user}/>
      <Switch> 
        <Route path="/" exact component={Home} />
        <Route 
        path="/signup" 
        component={() => <SignUp registerUser={registerUser} />} 
        /> 
        <Route 
        path="/login"
        component={() => <Login loginUser={loginUser} />} 
        />
        <Route path="/resume" component={Resume} /> 
        <Route 
        path="/skills" 
        component={() => <SkillCheck 
          hardskills={state.hardskills} 
          userHardSkills={state.userHardSkills} 
          addUserHardSkill={addUserHardSkill}
          removeUserHardSkill={removeUserHardSkill}
          />} 
        />
        <Route path="/work" component={() => <WorkExperience workExperience={state.userWorkExperience} updateWork={updateWork} />} />
        <Route path="/github" component={Github} />
        <Route path="/basicInfo" component={() => <BasicInfo user={state.user} updateUser={updateUser} />} />
      </Switch>
      <Footer />
    </Router>
  );
}

// example for getting api routes:

// fetchData = () => {
//   axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
//   .then((response) => {
//     // handle success
//     console.log(response.data) // The entire response from the Rails API

//     console.log(response.data.message) // Just the message
//     this.setState({
//       message: response.data.message
//     });
//   }) 
// }