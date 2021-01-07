import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField'

export default function AddTask (props) {
  const [taskNote, setTaskNote] = React.useState('')

  function saveNote () {
    props.task.save({
      body: taskNote,
      title: 'test'
    }, () => {
      setTaskNote('')

      props.task.get(data => {
        props.setTasksHandler(data.map((item, key) => {
          return {...item, key}
        }))
      })
    })
  }

  function handleOnChange (event) {
    setTaskNote(event.target.value)
  }

  function handleOnKeyUp (event) {
    if (event.keyCode === 13) saveNote()
  }

  return (
    <>
      <Grid item xs={10}>
        <TextField
          fullWidth
          id="username-full-width"
          onChange={handleOnChange}
          onKeyUp={handleOnKeyUp}
          placeholder="Type your TODOit here..."
          value={taskNote}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          color="secondary"
          disabled={taskNote === ''}
          fullWidth
          onClick={() => { saveNote() }}
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Add
        </Button>
      </Grid>
    </>
  )
}
