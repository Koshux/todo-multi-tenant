import React from 'react'
import AddTask from './AddTask'
import task from './task'
import TaskList from './TaskList'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '2em',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function TodoIt () {
  const classes = useStyles()
  const [tasks, setTasks] = React.useState([])

  function setTasksHandler (newTasks) {
    setTasks(newTasks)
  }

  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <AddTask
            task={task}
            setTasksHandler={setTasksHandler}
          ></AddTask>
        </Paper>

        <Paper className={classes.paper}>
          <Typography variant="h4">
            TODOits
          </Typography>

          <Grid item xs={12}>
            <>
              <TaskList
                task={task}
                tasks={tasks}
                setTasksHandler={setTasksHandler}
              ></TaskList>
            </>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}
