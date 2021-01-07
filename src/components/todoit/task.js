class Task {
  constructor (props) {
    console.log('Task props', props)
  }

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
        console.log('GET notes data', data)
        if (cb) cb(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  delete (id, cb) {
    const options = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      // body: JSON.stringify({ id: id })
    }

    fetch(`/.netlify/functions/server/todo/${id}`, options)
      .then(resp => resp.json())
      .then(data => {
        console.log('Deleted note', data)
        cb(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  save (note, cb) {
    const { body, date, title } = note
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ body, date, title })
    }

    fetch('/.netlify/functions/server/todo', options)
      .then(resp => resp.json())
      .then(data => {
        console.log('Created note:', data)
        cb()
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export default new Task()
