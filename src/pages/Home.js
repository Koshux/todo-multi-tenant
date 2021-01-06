import React from 'react'
import NavBar from '../components/NavBar'
import TodoIt from '../components/todoit/TodoIt'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginTop: '1em'
  },
  paper: {
    marginTop: '2em',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))


export default function HomePage (props) {
  const classes = useStyles()

  return (
    <div>
      <NavBar history={props.history}></NavBar>
      <div className={classes.root}>
        <Container minwidth="xs" className={classes.container}>
          <Grid
            container
            spacing={0}
            direction="column"
            style={{ minHeight: '22em' }}
          >
            <TodoIt></TodoIt>
          </Grid>
        </Container>
      </div>
    </div>
  )
}
