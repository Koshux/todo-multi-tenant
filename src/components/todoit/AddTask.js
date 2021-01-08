import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField'

export default function AddTask (props) {
  const [taskNote, setTaskNote] = React.useState('')

  // Performs a POST /todo to save the TODOit.
  function saveNote () {
    props.task.save({
      body: taskNote,
      title: 'test'
    }, () => {
      // Reset the TODOit textfield.
      setTaskNote('')

      // Retrieve & update the TODOit list.
      props.task.get(data => {
        props.setTasksHandler(data.map((item, key) => {
          return {...item, key}
        }))
      })
    })
  }

  // Update the TODOit note with the textfield content.
  function handleOnChange (event) {
    setTaskNote(event.target.value)
  }

  // Fire POST /todo if 'ENTER' is pressed.
  function handleOnKeyUp (event) {
    if (event.keyCode === 13) saveNote()
  }

  return (
    <>
    <Grid container spacing={1} alignItems="flex-end">
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
          onClick={() => { saveNote() }}
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Add
        </Button>
        </Grid>
      </Grid>
    </>
  )
}
