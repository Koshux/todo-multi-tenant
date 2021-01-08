class Task {
  /**
   * Retrieves the TODOits by requesting GET on /todo.  This API is routed
   * through ExpressJS and is hosted on Netlify.
   *
   * @param {function} cb The callback function which is called once the request
   *                      is complete.
   */
  get (cb) {
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    }

    fetch('/.netlify/functions/server/todo', options)
      .then(resp => resp.json())
      .then(data => {
        // Callback with response.
        if (cb) cb(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  /**
   * Deletes a TODOit using DELETE on /todo.  This API is routed through
   * ExpressJS and is hosted on Netlify.
   *
   * @param {String}   id The OBJECT_ID of the TODOit in MongoDB.
   * @param {function} cb The callback function which is called once the request
   *                      is complete.
   */
  delete (id, cb) {
    const options = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }

    fetch(`/.netlify/functions/server/todo/${id}`, options)
      .then(resp => resp.json())
      .then(data => {
        cb(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  /**
   * Creates a TODOit using POST on /todo.  This API is routed through
   * ExpressJS and is hosted on Netlify.
   *
   * @param {Object} note An object containing the TODOit payload to insert.
   * @param {function} cb The callback function which is called once the request
   *                      is complete.
   */
  save (note, cb) {
    const { body, title } = note
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ body, title })
    }

    fetch('/.netlify/functions/server/todo', options)
      .then(resp => resp.json())
      .then(() => {
        // Fire callback since request is complete.
        cb()
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export default new Task()
