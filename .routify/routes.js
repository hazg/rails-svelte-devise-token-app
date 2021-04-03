
/**
 * @roxi/routify 2.15.1
 * File generated Fri Apr 02 2021 18:16:49 GMT+0300 (GMT+03:00)
 */

export const __version = "2.15.1"
export const __timestamp = "2021-04-02T15:16:49.256Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "root": true,
  "children": [
    {
      "isIndex": true,
      "isPage": true,
      "path": "/index",
      "id": "_index",
      "component": () => import('../app/javascript/pages/index.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/login",
      "id": "_login",
      "component": () => import('../app/javascript/pages/login.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/register",
      "id": "_register",
      "component": () => import('../app/javascript/pages/register.svelte').then(m => m.default)
    }
  ],
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

