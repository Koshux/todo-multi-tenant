'use strict'
/// This code has been adapted from https://github.com/zachgoll/express-session-authentication-starter/blob/final/lib/passwordUtils.js
const crypto = require('crypto')

/**
 * Generates a brand new hash and salt given a password.
 *
 * @param {*} password
 */
function generatePassword (password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = hashGenerator(password, salt)

  return { hash, salt }
}

/**
 * Validates the password by hash comparison.  Returns true if it matches, false
 * otherwise.
 *
 * @param {String} password
 * @param {String} salt
 * @param {String} hash
 */
function validPassword (password, salt, hash) {
  const hashVerify = hashGenerator(password, salt)
  return hash === hashVerify
}

/**
 * Generates a brand new hash given a password and the salt.
 *
 * @param {String} password
 * @param {String} salt
 */
function hashGenerator (password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
}

module.exports = { generatePassword, validPassword }
