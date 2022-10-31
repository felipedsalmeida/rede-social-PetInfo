import { ApiRequest } from "./requests.js";

function signup() {
    const form = document.getElementById("signup-form")

    const buttonLogin = document.createElement("button")
    
    buttonLogin.classList.add("button-form")
    
    buttonLogin.innerText = "Cadastrar"
    
    buttonLogin.id = "button-form"

       
    buttonLogin.type = "submit"

    form.append(buttonLogin)

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const inputs = [...event.target]

        const newUserData = {}

        inputs.forEach(({name,value}) => {
            if(name) {
                newUserData[name] = value
            }
        })
        console.log(newUserData)
        ApiRequest.signup(newUserData, buttonLogin)
    })
}
signup()


function login() {
    const signup = document.querySelector (".button-user-login")
    const backLogin = document.querySelector(".backToLogin")

    signup.addEventListener("click", (event) => {       
        event.preventDefault() 
        
        window.location.assign("../../index.html")
    })
    backLogin.addEventListener("click", (event) => {       
        event.preventDefault() 
        
        window.location.assign("../../index.html")
    })
}
login()

function searchSignup() {
    const buttonSignup = document.getElementById("button-form")

    buttonSignup.addEventListener("click", () => {
        buttonSignup.innerHTML = ""

        const imgSpin = document.createElement("img")

        imgSpin.src = "../assets/img/spinner.svg"
        imgSpin.alt = "spinner"
        imgSpin.classList.add("load")

        buttonSignup.append(imgSpin)
    })
}
searchSignup()