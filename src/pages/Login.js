import React from 'react'
import auth from '../components/auth'
import Typography from '@material-ui/core/Typography'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginTop: '1em'
  },
  paper: {
    marginTop: '10em',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function LoginPage (props) {
  const classes = useStyles()

  const [error, setError] = React.useState('')
  const [credentials, setCredentials] = React.useState({
    username: null,
    password: null
  })

  React.useEffect(() => {
    if (auth.isAuthenticated() && error === '') {
      setCredentials({ username: null, password: null })
    }
  }, [error])

  function login () {
    auth.login(
      setError,
      { username: credentials.username, password: credentials.password },
      () => { props.history.push('/home') }
    )
  }

  function tryLogin (event) {
    if (event.keyCode === 13) {
      login()
    }
  }

  function handleUsernameKeyUp (event) {
    if (error !== '') setError('')

    console.log('event 1', event.target.value)
    setCredentials({
      username: event.target.value,
      password: credentials.password
    })

    tryLogin(event)
  }

  function handlePasswordKeyUp (event) {
    if (error !== '') setError('')
    console.log('event 2', event.target.value)

    setCredentials({
      username: credentials.username,
      password: event.target.value
    })

    tryLogin(event)
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '80vh' }}
        >
          <Grid item xs={12} >
            <Typography variant="h1">
              TODOit
            </Typography>

            <Typography variant="subtitle2" align="center">
              Your personal productivity zone.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4">
                Sign In
              </Typography>

              {
                error !== ''
                ? <Typography variant="body1" color="secondary">
                    Incorrect username or password, please try again!
                  </Typography>
                : null
              }

              <TextField
                defaultValue={credentials.username}
                fullWidth
                id="username-full-width"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                label="Username"
                margin="normal"
                onChange={handleUsernameKeyUp}
                placeholder="Enter your username"
              />

              <TextField
                autoComplete="current-password"
                defaultValue={credentials.password}
                fullWidth
                id="password-full-width"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  maxLength: 35
                }}
                label="Password"
                margin="normal"
                onChange={handlePasswordKeyUp}
                placeholder="Enter your password"
                type="password"
              />

              <Button
                color="secondary"
                className={classes.button}
                endIcon={<ArrowForwardIosIcon />}
                fullWidth
                onClick={() => {login()}}
                variant="contained"
              >
                Sign in
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}
