import { ApiRequest } from "./requests.js"
function login() {
    
    const form = document.getElementById("login-form")
    
    const buttonLogin = document.createElement("button")
    
    buttonLogin.classList.add("button-form")
    
    buttonLogin.innerText = "Acessar"
    
    buttonLogin.id = "button-form"

    
    buttonLogin.type = "submit"

    form.append(buttonLogin)
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        

        const inputs = [...event.target]

        const userData = {}
        
        inputs.forEach(({name, value}) => {
            
            // if(value.length === undefined) {
            //     buttonLogin.disabled = "true"
            // }
            if(name) {
                userData[name] = value
            }
        })
        // buttonLogin.disabled = "false"
        
        // console.log(button)
        // if(inputs.value.length > 0) {
        //     buttonLogin.disabled = "false"
        // } else {
        //     buttonLogin.disabled = "true"
        // }
        
        await ApiRequest.login(userData, buttonLogin)

    })
}
login()

function newAccount() {
    const signup = document.querySelector (".button-new-account")

    signup.addEventListener("click", (event) => {
        event.preventDefault()
        window.location.assign("../../src/pages/signup.html")
    })
}
newAccount()

function searchLogin() {
    const buttonLogin = document.getElementById("button-form")

    buttonLogin.addEventListener("click", () => {
        buttonLogin.innerHTML = ""

        const imgSpin = document.createElement("img")

        imgSpin.src = "./src/assets/img/spinner.svg"
        imgSpin.alt = "spinner"
        imgSpin.classList.add("load")

        buttonLogin.append(imgSpin)
    })
}
searchLogin()

