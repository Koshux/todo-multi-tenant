import React from 'react'
import auth from '../components/auth'
import Typography from '@material-ui/core/Typography'
// import Card from '../components/Card'

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
  paper: {
    marginTop: '15vh',
    marginLeft: '40vh',
    marginRight: '40vh',
    height: '30vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function LoginPage (props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant="h1">
        TODO
      </Typography>

      <Typography variant="subtitle2">
        Your personal productivity zone.
      </Typography>

      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4">
                Sign In
              </Typography>
              <TextField
                id="standard-full-width"
                label="Username"
                placeholder="Enter your username"
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                autoComplete="current-password"
                fullWidth
                id="standard-full-width"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Password"
                margin="normal"
                placeholder="Enter your password"
                type="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                color="secondary"
                fullWidth
                onClick={() => {
                  auth.login(() => {
                    props.history.push('/home')
                  })
                }}
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
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
