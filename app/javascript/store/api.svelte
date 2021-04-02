<script>
/*
  Fetch api data
*/
import { User } from './user'
import { queryString } from 'object-query-string'
import { SvelteToast, toast } from 'svelte-toast'
import plural from 'pluralize'

// Auth headers
let defaults = {
  method: 'GET',
  headers: Object.assign({},
    {'Content-Type': 'application/json'},
    User.auth()
  )
}

// GET request
export async function get(url, searchParams = false, params = {}) {
  return request(url, searchParams, params, 'GET')
}

// POST request
export async function post(url, params = {}, root = false) {
  params = root ? {[root]:params} : {[plural.singular(url)]: params}
  return request(url, false, {body: JSON.stringify(params)}, 'POST')
}

// PUT request
export async function put(url, params = {}, root = false) {
  params = root ? {[root]:params} : {[plural.singular(url)]: params}
  return request(url, false, {body: JSON.stringify(params)}, 'PUT')
}

// DELETE request
export async function destroy(url, params = {}, root = false) {
  params = root ? {[root]:params} : {[plural.singular(url)]: params}
  return request(url, false, {body: JSON.stringify(params)}, 'DELETE')
}


// Make request
export async function request(url, searchParams = false, params = {}, method) {

  url = window.location.origin + '/api/v1/' + url + '.json'

  // Params to url
  if (searchParams) {
    url = url + '?' + queryString(searchParams)
  }

  // Merge default params with incoming params
  params = Object.assign({}, defaults, params)
  params['method'] = method

  // Fetch request
  let res = await fetch(url, params)

  // Can't use $isActive('/login').
  // First API request in bundle.js No routes now

  // if (res.status == 401 && window.location.pathname != '/login') {
  //   window.location = '/login'
  // }

  let json = false
  // If status not "no content" try to get json
  if(res.status != 204 /* no content */ ){

    json = await res.json()

    // On errors try to show error
    if (res.status != 200){
      let status = ''
      let message = ''
      if(json.message)  { message += json.message + "\n"  }
      if(json.errors)   { message += json.errors }
      // All errors get status code. 200 to 226 - no status code.
      if(!(res.status > 200 && res.status < 226)){
        status = res.status + ' '
      }
      toast.push(status + message, res)
      console.error(status + message, res)
    }
  }

  return json
}
</script>

<SvelteToast />