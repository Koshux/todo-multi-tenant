import React from 'react'
import Typography from '@material-ui/core/Typography'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginTop: '1em'
  },
  wrapper: {
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

  // HLC reference to display the error.
  function setErrorHandler (error) {
    setError(error)
  }

  // Reset the credentials when the login is successful.
  React.useEffect(() => {
    if (props.auth.isAuthenticated() && error === '') {
      setCredentials({ username: null, password: null })
    }
  }, [props.auth, error])

  // Log into the webapp.
  function login () {
    props.auth.login(
      setErrorHandler,
      { username: credentials.username, password: credentials.password },
      () => { props.history.push('/home') }
    )
  }

  // Try log into the webapp if 'ENTER' is pressed.
  function tryLogin (event) {
    if (event.keyCode === 13) {
      login()
    }
  }

  // Logic to store the username credentials.
  function handleUsernameKeyUp (event) {
    // Clear error when re-typing.
    if (error !== '') setError('')

    setCredentials({
      username: event.target.value,
      password: credentials.password
    })

    tryLogin(event)
  }

  // Logic to store the password credentials.
  function handlePasswordKeyUp (event) {
    // Clear error when re-typing.
    if (error !== '') setError('')

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
            <div className={classes.wrapper}>
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
                onKeyUp={handleUsernameKeyUp}
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
                onKeyUp={handlePasswordKeyUp}
                placeholder="Enter your password"
                type="password"
              />

              <Button
                color="secondary"
                className={classes.button}
                disabled={
                  credentials.password == null ||
                  credentials.password === '' ||
                  credentials.username == null ||
                  credentials.username === ''
                }
                endIcon={<ArrowForwardIosIcon />}
                fullWidth
                onClick={() => {login()}}
                variant="contained"
              >
                Sign in
              </Button>
              <Link to="/register">
                <Typography variant="subtitle2" align="center">
                Register here
                </Typography>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}
