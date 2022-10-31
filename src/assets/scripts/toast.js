export const toast = (title, message) => {
    const body = document.querySelector("body")

    const container = document.createElement("div")
    const divTitle = document.createElement("div")
    const btnCheck = document.createElement("button")
    const check = document.createElement("img")
    const toastTitle = document.createElement("p")
    const toastMessage = document.createElement("p")
    

    container.classList.add("toast-container")
    divTitle.classList.add("toast-title")
    btnCheck.classList.add("toast-check")
    toastMessage.classList.add("toast-message")



    toastTitle.innerText = title
    toastMessage.innerText = message

    btnCheck.append(check)
    divTitle.append(btnCheck, toastTitle)
    container.append(divTitle, toastMessage)

    body.append(container)
}

export const errorMessage = (message) => {
    const divPass = document.getElementById("passwordID")
    const error = document.createElement("p")

    error.innerText = message

    divPass.append(error)
}