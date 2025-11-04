
export const saveDataToLocalStorage = (token: string, user: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", user)
}