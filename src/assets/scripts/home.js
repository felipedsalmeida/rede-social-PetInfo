import { ApiRequest } from "./requests.js";
import {createModalPost, createModalEditPost, deletePostModal, modalPost} from "./modals.js"
import {showPosts} from "./render.js"
import {toast} from "./toast.js"
const token = localStorage.getItem("@PetInfo:token")
if(!token) {
    window.location.assign("../../index.html")
}
export async function showProfileInfo() {
    const data = document.getElementById("info-user")
    const user = await ApiRequest.getUser()
    const card = createUserInfoCard(user)

    
    data.append(card)
    

}
function buttonPublish() {
    const info = document.getElementById("info-user")
    const main = document.getElementById("main")
    const buttonCreatePost = document.createElement("button")

    buttonCreatePost.classList.add("button-create-post")

    buttonCreatePost.innerText = "Criar Publicação"

    buttonCreatePost.addEventListener("click", (event) => {
        event.preventDefault()
        const modal = createModalPost()

        main.append(modal)
        
    })

    info.append(buttonCreatePost)
}


function createUserInfoCard(element) {
    
    const infoUser = document.createElement("div")
    const figPhotoProfile = document.createElement("figure")
    const photoProfile = document.createElement("img")
    const divUser = document.createElement("div")
    const name = document.createElement("p")
    const divLogout = document.createElement("div")
    const figLogoutImage = document.createElement("figure")
    const logoutImage = document.createElement("img")
    const logout = document.createElement("p")

    
    infoUser.classList.add("div-info-user")
    divUser.classList.add("div-hover-user-info")
    divLogout.classList.add("div-logout")
    logout.classList.add("logout")

    
    photoProfile.src = element.avatar
    name.innerText = `@${element.username}`
    logoutImage.src = "../assets/img/sign-out-alt.png"
    logout.innerText = "Sair da conta"

    logout.id = "logout"

    logout.addEventListener("click", (event) => {
        event.preventDefault()
        localStorage.removeItem("@PetInfo:token")
        localStorage.removeItem("@PetInfo:UserId")
        window.location.assign("../../index.html");
    })

    figPhotoProfile.append(photoProfile)
    figLogoutImage.append(logoutImage)
    divLogout.append(figLogoutImage, logout)
    divUser.append(name, divLogout)
    infoUser.append(figPhotoProfile, divUser)

    return infoUser
}



export function createPostCard(element) {
    const userId = localStorage.getItem("@PetInfo:UserId")
    
    const list = document.createElement("li")
    const divPostTitle = document.createElement("div")
    const divInfo = document.createElement("div")
    const figPhoto = document.createElement("figure")
    const photo = document.createElement("img")
    const divDate = document.createElement("div")
    const name = document.createElement("p")
    const date = document.createElement("p")
    const divDescription = document.createElement("div")
    const title = document.createElement("h2")
    const content = document.createElement("p")
    const access = document.createElement("p")
    
    list.classList.add("post")
    divPostTitle.classList.add("div-post-title")
    divInfo.classList.add("div-info-post")
    figPhoto.classList.add("photo-profile")
    divDate.classList.add("div-date-post")
    name.classList.add("username-post")
    date.classList.add("date")
    divDescription.classList.add("post-description")
    content.classList.add("post-message")
    access.classList.add("acess-full-message")
    
    name.innerText = element.user.username
    
    
    let day = new Date(element.createdAt)
    let options = {year: 'numeric', month: 'long'};
    date.innerText = day.toLocaleDateString('pt-BR', options) 
    title.innerText = element.title
    content.innerText = element.content
    access.innerText = "Acessar Publicação"
    
    photo.src = element.user.avatar

    access.addEventListener("click", (event) => {
        event.preventDefault()
        
        const main = document.getElementById("main")
        const post = modalPost(element)
        main.append(post)
    })
    
    
    figPhoto.append(photo)
    divDate.append(name, date)
    divInfo.append(figPhoto, divDate)
    divPostTitle.append(divInfo)
    divDescription.append(title, content, access)
    list.append(divPostTitle, divDescription)
            
    if(element.user.id === userId) {
        const divButtons = document.createElement("div")
        const editButton = document.createElement("button")
        const deleteButton = document.createElement("button")
                
        divButtons.classList.add("div-buttons-post")
        editButton.classList.add("button-edit")
        deleteButton.classList.add("button-delete")
                
        editButton.innerText = "Editar"
        deleteButton.innerText = "Excluir"
                
        editButton.addEventListener("click", (event) => {
           
            const modal = createModalEditPost(element)
                    
            main.append(modal)
        })
                    
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault()
            localStorage.setItem("@PetInfo:postId", element.id)
            const main = document.getElementById("main")
            const modal = deletePostModal()

            main.append(modal)

        })
                
        divButtons.append(editButton, deleteButton)
        divPostTitle.append(divButtons)
    }

    return list
}

// function logout() {
//     const disconect = document.getElementById("logout")

//     disconect.addEventListener("click", (event) => {
//         event.preventDefault()
//         console.log("oi")
//     })
// }

buttonPublish()
showProfileInfo()
showPosts()
// logout()