import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField'

export default function TodoIt () {
  const [taskNote, setTaskNote] = React.useState('')
  function handleOnChange (event) {
    setTaskNote(event.target.value)
  }

  return (
    <>
      <Grid item xs={10}>
        <TextField
          defaultValue={taskNote}
          fullWidth
          id="username-full-width"
          onChange={handleOnChange}
          placeholder="Type your TODOit here..."
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          color="secondary"
          disabled={taskNote === ''}
          fullWidth
          onClick={() => {
            console.log('Creating task')
            // requests.createTask()
          }}
          startIcon={<SaveIcon />}
          variant="contained"
        >Add</Button>
      </Grid>
    </>
  )
}
