'use strict'

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
      next()
    } else {
      res.status(401).json({
        message: 'You are not authorised to view this resource because you ' +
          'are not an admin'
      })
    }
  },
  isAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).json({
        message: 'You are not authorised to view this resource.'
      })
    }
  }
}
