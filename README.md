# Your own nifty TODO app! [![Netlify Status](https://api.netlify.com/api/v1/badges/ed726981-293e-406b-951a-de7a8d982df6/deploy-status)](https://app.netlify.com/sites/todo-app-lp/deploys)
A multi-tenant web-app which allows different consumers to concurrently login, customise and utilise the features of this nifty TODO app.

## Commands
### Local development
To start the local development servers, paste the following command:

`npm run start`

This will concurrently startup the `create-react-app` and `expressjs routes` hosted on netlify using webpack for your local dev environment.  Check out the scripts section in `package.json` to see what this command does.

### Production builds
To create an optimised build for React and Netlify functions, paste the following command:

`npm run build`

You may use this command locally and then simply drag'n'drop these files into Netlify to host your own copy!
