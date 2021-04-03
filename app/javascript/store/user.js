/*
  Store auth token
*/

export const User = {
  signOut: () => {
    localStorage.removeItem('auth')
    window.location.reload()
  },
  auth: ()        => { return JSON.parse(localStorage.getItem("auth")) },
  signIn: (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth))
  },
  isLoggedIn: ()  => {
    return ((localStorage.getItem('auth') == null)? false : true)
  },

  register: async (email, password, password_confirmation) => {
     // Get auth token by email and password
     let res = await fetch('/api/v1/auth', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation
      })
     })
    if (res.ok) { }
    else {
      full_messages
      console.log(res)
    }
  },

  login: async (email, password) => {

    // Get auth token by email and password
    let res = await fetch('/api/v1/auth/sign_in', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    })

    // Get auth info from headers
    if (res.ok) {

      let data = await res.json()
      let token = {
        'access-token': res.headers.get('access-token'),
        'uid':          res.headers.get('uid'),
        'client':       res.headers.get('client'),
        'expiry':       res.headers.get('expiry'),
        'token-type':   'Bearer',
      }

      let errors = false

      data = data.data
      return { data, errors, token }

    } else {
      return await res.json()
    }
  },
}