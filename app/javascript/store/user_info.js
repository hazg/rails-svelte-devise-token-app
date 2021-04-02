import { writable } from 'svelte/store';

export let userLoaded = false
export const userInfo = writable({})

export async function updateUserInfo() {
	await api.get('users/info').then((data) => {
		userInfo.set(data)
	})
}


/*import { writable } from 'svelte/store'

function createUserInfo() {
	const { subscribe, set } = writable(api.get('users/info'))
	let info = await api.get('users/info')
	set(info)
	return {
		subscribe,
		update: async (x) => set(await api.get('users/info'))
  }

}

export const userInfo = createUserInfo()*/