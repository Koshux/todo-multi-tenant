import React, { useEffect, useCallback } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    marginTop: '2em'
  }
}))

export default function CheckboxList(props) {
  const classes = useStyles()
  const { task, setTasksHandler } = props
  const [checked, setChecked] = React.useState([])
  const [isLoading, setIsLoading] = React.useState()

  // Memoize the GET /todo request since it is used in useEffect.
  const getData = useCallback(() => {
    // Request started.
    setIsLoading(true)

    // Retrieve the TODOits - GET /todo.
    task.get(data => {
      if (data == null) {
        setIsLoading(false)
        return
      }

      // Update the TODOits list on screen.
      setTasksHandler(data.map((item, key) => {
        return {
          completed: item.completed,
          body: item.body,
          date: item.date,
          id: item.id,
          key: key,
          author: item.author
        }
      }))

      // Request has completed.
      setIsLoading(false)
    })
  }, [setTasksHandler, setIsLoading, task])

  // Load the data everytime the component is mounted.
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Checkbox toggle button state logic.
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  /**
   * Delete the TODOit.
   * @param {String} The OBJECT_ID for the task in MongoDB.
   */
  function deleteTask (id) {
    props.task.delete(id, (data) => {
      getData()
    })
  }

  // No TODOits to show.
  console.log('props.tasks list', props.tasks)
  if (props.tasks == null || props.tasks.length === 0) {
    return (
      <>
        <Typography className={classes.heading} variant="body1">
          Whoops, you're out!
        </Typography>

        <Typography variant="body2">
          Perhaps it's time to create more TODOits.
        </Typography>
      </>
    )
  }

  return (
    <List className={classes.root}>
      {props.tasks.map((value) => {
        const labelId = `checkbox-list-label-${value.key}`

        return (
          <ListItem
            alignItems='center'
            button
            dense
            key={value.key}
            onClick={handleToggle(value.key)}
            role={undefined}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value.key) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>

            <ListItemText id={labelId} primary={`${value.body}`} />

            <ListItemSecondaryAction>
              <IconButton
                aria-label="comments"
                edge="end"
                disabled={isLoading}
                onClick={() => { deleteTask(value.id) }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}
