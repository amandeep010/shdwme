
export const saveDataToLocalStorage = (token: string, user: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", user)
}

export const emptyDataFromLocalstorage = () => {
    localStorage.setItem('token', '')
	localStorage.setItem('user', '')
}