import React from 'react'
import Typography from '@material-ui/core/Typography'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

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

export default function RegisterPage (props) {
  const classes = useStyles()

  const [error, setError] = React.useState('')
  const [credentials, setCredentials] = React.useState({
    username: null,
    password: null
  })

  React.useEffect(() => {
    if (props.auth.isAuthenticated() && error === '') {
      setCredentials({ username: null, password: null })
    }
  }, [props.auth, error])

  function register () {
    props.auth.register(
      setError,
      { username: credentials.username, password: credentials.password },
      () => {
        console.log('register cb:', error)
        error !== ''
          ? props.history.push('/register')
          : props.history.push('/')
      }
    )
  }

  function tryRegister (event) {
    if (event.keyCode === 13) {
      register()
    }
  }

  function handleUsernameKeyUp (event) {
    if (error !== '') setError('')

    console.log('event 1', event.target.value)
    setCredentials({
      username: event.target.value,
      password: credentials.password
    })

    tryRegister(event)
  }

  function handlePasswordKeyUp (event) {
    if (error !== '') setError('')
    console.log('event 2', event.target.value)

    setCredentials({
      username: credentials.username,
      password: event.target.value
    })

    tryRegister(event)
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
                    Something went wrong, please try again!
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
                onClick={() => {register()}}
                variant="contained"
              >
                Register
              </Button>
              <Link to="/">
                <Typography variant="subtitle2" align="center">
                Sign in here
                </Typography>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}
