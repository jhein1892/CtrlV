import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { Typography, Button, Snackbar, Checkbox, FormControlLabel, FormLabel } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    paddingTop: 30,
    height: "100%"
    // justify: 'space-around'
  },
  skills: {
    display: 'flex',
    direction:"row",
    justifyContent: 'center',

    // width: '80%',
    
  },
  formControl: {
    margin: theme.spacing(3),
  },
  skillSet: {
    textAlign: "left",
    margin: "2%",
    padding: "2%",
    border: "solid green 1px",
    borderRadius: 20
  },

  heading: {
    textAlign: 'center',
    textDecoration: 'underline',
  },

  submit: {
    color: "white",
    size: "large",
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  button: {
    textAlign: "center"
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

export default function SkillCheck(props) {
  const data = props.hardskills;
  const userData = props.userHardSkills

  const markedUserSkills = {}

  for (const marked of userData) {
    markedUserSkills[marked.name] = true; 
  }
  
  const classes = useStyles();
  const [checkedSkills, setCheckedState] = useState(markedUserSkills || "");
  const [complete, setComplete] = useState(false); 
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false); 
  

  const handleChange = (event) => {
    setCheckedState({...checkedSkills, [event.target.name] : event.target.checked })
    if (event.target.checked) {
      addSkill(event.target.id, event.target.name, event.target.value);
    } else {
      removeSkill(event.target.id, event.target.name, event.target.value); 
    }
  }

  function addSkill(id, name, type) {
    props.addUserHardSkill({ id: id, name: name, type: type })
    .then(() => {
      setMessage("Added Successfully!");
      setOpen(true); 
    }); 
  }

  function removeSkill(id, name, type) {
    props.removeUserHardSkill({ id: id, name: name, type: type })
    .then(() => {
      setMessage("Deleted Successfully!");
      setOpen(true);
    });
  }
  
  const languagesList = data.map(s => {
    if (s.type === 'language') {
      
      return(
        <React.Fragment key={s.id}>
        <FormControlLabel
          control={<Checkbox 
            checked={checkedSkills[s.name]}
            onChange={handleChange}
            name={s.name}
            value={s.type} 
            id={s.id.toString()}
            />}
          label={s.name}      
        />
        <br/>
        </React.Fragment>
      )
    }
    return null;
  })
    
  const frameworksList = data.map(s => {
    if (s.type ==='framework') {
      return (
        <React.Fragment key={s.id}>
        <FormControlLabel
          control={<Checkbox
            checked={checkedSkills[s.name]}
            onChange={handleChange} 
            name={s.name} 
            value={s.type}
            id={s.id.toString()}
            />}
          label={s.name}
        />
        <br/>
        </React.Fragment>
      )
    }
    return null;
  })

  const testingList = data.map(s => {
    if (s.type === 'testing' || s.type === 'database'){
      return (
        <React.Fragment key={s.id}>
        <FormControlLabel
        control={<Checkbox 
          checked={checkedSkills[s.name]}
          onChange={handleChange}
          name={s.name} 
          value={s.type}
          id={s.id.toString()}
          />}
        label={s.name}
        />
        <br/>
        </React.Fragment>
      )
    }
    return null;
  })

  function save() {
    setComplete(true); 
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); 
  };

  if (complete) {
    return <Redirect to="/" />
  }
  

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Typography variant="h3">My Skills</Typography>
      </div>
      <Snackbar 
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert onClose={handleClose} severity="success">
          <h1>{message}</h1>
        </Alert>
      </Snackbar>
      <section className={classes.skills}>
          <div className={classes.skillSet}>
            <FormLabel component="legend">Languages</FormLabel>
            {languagesList}
          </div>
          <div className={classes.skillSet}>
            <FormLabel component="legend">Databases and testing</FormLabel>
            {testingList}
          </div>
          <div className={classes.skillSet}>
            <FormLabel component="legend">Frameworks</FormLabel>
            {frameworksList}
          </div>
      </section>
      <div className={classes.button}>
      <Button 
      className={classes.submit} 
      variant="outlined" 
      color="default" 
      size="large" 
      onClick={save}
      >Save
      </Button>
      </div>
    </div>
  );
}