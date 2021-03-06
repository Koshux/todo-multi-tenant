# Your own nifty TODO app! [![Netlify Status](https://api.netlify.com/api/v1/badges/ed726981-293e-406b-951a-de7a8d982df6/deploy-status)](https://app.netlify.com/sites/todo-app-lp/deploys)
A serverless multi-tenant web-app with basic authentication: https://todo-app-lp.netlify.app/.

It allows different consumers to concurrently login, customise and utilise the features of this nifty TODO app.

## Usage
### Environment
It is important to create an `.env` file which NodeJS with the following properties:

- `MONGODB_URL`
- `SECRET`

### Install
Before starting to work locally, first you must install the `node_modules.

`npm install`

### Running
To start the local development servers, paste the following command:

`npm run start`

This will concurrently startup the `create-react-app` and `expressjs routes` hosted on netlify using webpack for your local dev environment.  Check out the scripts section in `package.json` to see what this command does.

### Production builds
To create an optimised build for React and Netlify functions, paste the following command:

`npm run build`

You may use this command locally and then simply drag'n'drop these files into Netlify to host your own copy!

## Design and Documentation
This repository contains an instance of `create-react-app` and an API hosted on Netlify using ExpressJS for routing.  The API requires authentication to be
consumed.  Users and tasks are stored within MongoDB using MongooseJS for multi-tenancy.  Each model is exposed as a connection for connection pooling.

### Architecture
Download `Untitled Diagram.drawio` (I know but it didn't let me rename it from draw.io) from the repository and go to https://draw.io. Load the diagram to preview.

API routing:
1. /login - POST
2. /logout - GET
3. /register - POST
4. /todo - GET, POST, DELETE

### Design
Download `web-app-diagram.drawio` from the repository and go to https://draw.io. Load the diagram to preview all page and functionality designs.

UI routing:
1. / - Login page
2. /home - Home page
3. /register - Register page

### Authentication
Basic authentication is implemented using PassportJS LocalStrategy and `express-session`.  This could be further extended to use JWT tokens however for simplicity, I opted to use the local option.

### Authorisation
For simplicity sake, I avoided the use of permissions/scopes.  This means that every user has the ability to create, load and delete their own TODOits.

All routes are protected with middleware that checks for authentication.  This solution is highly scalable and could be extended to add any type of middleware to protect, layer or segregate data.

This application will therefore create, load and delete TODOits for your user only.  This is described in more detail in the [next section](#multi-tenancy).

### Multi-tenancy
Anyone can create a user by going to https://todo-app-lp.netlify.app/register.  Once logged in, you can maintain your very own TODO list!

The data shown on screen is bound to your user and no one else is given the ability to see other users' data due to backend API validation.

This is achieved using MongooseJS to query the documents stored in MongoDB and are filtered by the HTTP `req.user.username` stored in the ExpressJS session.  This session stores the username you used to login and thus is used silently in the background to filter, retrieve and store data.

## Issues
The following list are issues I opted to not waste further time trying to fix it due to other priorities to conclude.
1. Checkbox buttons to enable/disable strikethrough of the TODOit is not currently working and does not sync completed state to DB.
2. Currently, refreshing the page will invalidate your current session.  You will need to log back in.

## Functionality
1. Basic authentication using `passport-local`, `mongo-connect` and `express-session` to be able to register, login & logout (establishes and destroys sessions in browser stored in MongoDB).
2. GET TODOit for your user.
3. POST TODOit for your user.
4. DELETE TODOit for your user.
6. UX enhanced to prevent DDos of server triggered by multiple concurrent HTTP requests e.g. Delete button.
7. Protected Routes by authentication middleware.
8. Non-registered pages redirect to a 404 - NOT FOUND.
9. ExpressJS benefits.
10. Serverless functions (AWS lambda hosted on Netlify).
