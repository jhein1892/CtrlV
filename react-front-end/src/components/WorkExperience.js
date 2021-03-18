import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Jobs from "./Jobs"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    paddingTop: 30,
    minHeight: "100vh"
  },

  job: {
    textAlign: "center",
    height: 250
  },
  fields: {
    display:"flex",
    justifyContent: "space-evenly",
    margin: "auto",
    marginBottom: 20,
    width: "60%"
  },
  description: {
    marginTop: 20,
    width: '60%',
    margin: "auto"
  },
  add: {
    textAlign: "center",
    paddingTop: 50
  }
}))


export default function WorkExperience(props) {
  const data = props.workExperience;
  console.log("In work experience", data)
  const [count, setCount] = React.useState(0); 
    


  const numOfJobs = Object.keys(data).map(key => {
      // this line will fail if the input date is null 
      const start_date = data[key].job_start_date.slice(0,10);
      const end_date = data[key].job_end_date.slice(0,10);
      console.log("Start Date", start_date)
      return (
        <Jobs
        key={data[key].id}
        id={data[key].id}
        title={data[key].job_title}
        company_name={data[key].company_name}
        start_date={start_date}
        end_date={end_date}
        updateWork={props.updateWork}
        deleteWork={props.deleteWork}
        description={data[key].job_description}
        />
        )
    });
  

    const addJobs = function(input){
      for (let i = 0; i < input; i++){
        return(
          <Jobs 
          key={''}
          title=''
          company_name={""}
          start_date={""}
          end_date={""}
          updateWork={props.updateWork}
          description=''/>
        )
      }
    }
    const moreJobs = addJobs(count)
  // const [count, setCount] = React.useState('')
  const classes = useStyles(); 
  return (
    <div className={classes.root}>
      {numOfJobs}
      {/* This line is going to need to be looked at when we start uploading to the DB */}
      {Array(count).fill(moreJobs)} 
    <div className={classes.add}>
    <Button variant="contained" color="primary" onClick={() => {
      setCount(count + 1)
      }}>
        Add Another Job
    </Button>
      </div>
    </div>
  )
}
