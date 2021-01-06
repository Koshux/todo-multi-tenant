import React from 'react'
import Input from './Input'
import List from './List'
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
  const [taskNote, setTaskNote] = React.useState('')

  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Input
            taskNote={taskNote}
            setTaskNote={setTaskNote}
          ></Input>
        </Paper>

        <Paper className={classes.paper}>
          <Typography variant="h4">
            TODOits
          </Typography>

          <Grid item xs={12}>
            <>
              <List data={[
                {
                  key: 1,
                  complete: false,
                  body: 'This is a TODOit note to fill up the body.',
                  date: '2020/06/01T04:350000',
                  user: 'roger'
                },
                {
                  key: 2,
                  complete: true,
                  body: 'This is another note that has to occupy the correct space.',
                  date: '2020/06/01T04:350000',
                  user: 'roger'
                },
                {
                  key: 3,
                  complete: false,
                  body: 'I am so tired that I am just plainlessly writing this.',
                  date: '2020/06/01T04:350000',
                  user: 'roger'
                },
                {
                  key: 4,
                  complete: true,
                  body: 'Turns out, this note is complete. Oh my days.',
                  date: '2020/06/01T04:350000',
                  user: 'roger'
                }
              ]}></List>
            </>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}
