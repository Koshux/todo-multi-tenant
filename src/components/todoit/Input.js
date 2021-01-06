import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField'

export default function TodoIt (props) {
  function handleOnChange (event) {
    props.setTaskNote(event.target.value)
  }

  return (
    <>
      <Grid item xs={10}>
        <TextField
          defaultValue={props.taskNote}
          fullWidth
          id="username-full-width"
          onChange={handleOnChange}
          placeholder="Type your TODOit here..."
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          color="secondary"
          disabled={props.taskNote === ''}
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
