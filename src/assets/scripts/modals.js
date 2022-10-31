import { ApiRequest } from "./requests.js"
import {showPosts} from "./render.js"
import { toast } from "./toast.js"

export function createModalPost() {
    const modal = document.createElement("section")
    const divModal = document.createElement("div")
    const divTitle = document.createElement("div")
    const titleModal = document.createElement("p")
    const buttonClose = document.createElement("button")
    const postForm = document.createElement("form")
    const divInputTitle = document.createElement("div")
    const postTitle = document.createElement("label")
    const postTitleInput = document.createElement("input")
    const divInputContent = document.createElement("div")
    const postContent = document.createElement("label")
    const postContentInput = document.createElement("input")
    const divButton = document.createElement("div")
    const buttonCancel = document.createElement("button")
    const buttonPublish = document.createElement("button")

    modal.classList.add("modal-wrapper")
    divModal.classList.add("modal-create-post")
    divTitle.classList.add("div-title-modal")
    buttonClose.classList.add("button-close-modal")
    postForm.classList.add("modal-create-post-form")
    divInputTitle.classList.add("div-post-input-title")
    divInputContent.classList.add("div-post-input-content")
    divButton.classList.add("div-buttons-modal")
    buttonCancel.classList.add("button-cancel-modal-form")
    buttonPublish.classList.add("button-publish-modal-form")

    titleModal.innerText = "Criando novo post"
    buttonClose.innerText = "x"
    postTitle.innerText = "Título do post"
    postContent.innerText = "Conteúdo do post"
    buttonCancel.innerText = "Cancelar"
    buttonPublish.innerText = "Publicar"

    postTitle.name = "title"
    postTitleInput.name = "title"
    postTitleInput.type = "text"

    postContent.name = "content"
    postContentInput.name = "content"
    postContentInput.type = "text"
    buttonPublish.type = "submit"

    postForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        let inputs = {}

        const submit = [...event.target]

        submit.forEach(({name, value}) => {
            if(name) {
                inputs[name] = value
            }
        })
        await ApiRequest.createPost(inputs)
        modal.remove()
        showPosts()
    })

    buttonClose.addEventListener("click", (event) => {
        modal.remove()
    })
    buttonCancel.addEventListener("click", (event) => {
        modal.remove()
    })

    divTitle.append(titleModal, buttonClose)
    divInputTitle.append(postTitle, postTitleInput)
    divInputContent.append(postContent, postContentInput)
    divButton.append(buttonCancel, buttonPublish)
    postForm.append(divInputTitle, divInputContent, divButton)
    divModal.append(divTitle, postForm)
    modal.append(divModal)

    return modal
}



export function createModalEditPost(element) {
    const modal = document.createElement("section")
    const divModal = document.createElement("div")
    const divTitle = document.createElement("div")
    const titleModal = document.createElement("p")
    const buttonClose = document.createElement("button")
    const postForm = document.createElement("form")
    const divInputTitle = document.createElement("div")
    const postTitle = document.createElement("label")
    const postTitleInput = document.createElement("input")
    const divInputContent = document.createElement("div")
    const postContent = document.createElement("label")
    const postContentInput = document.createElement("input")
    const divButton = document.createElement("div")
    const buttonCancel = document.createElement("button")
    const buttonEdit = document.createElement("button")

    modal.classList.add("modal-wrapper")
    divModal.classList.add("modal-create-post")
    divTitle.classList.add("div-title-modal")
    buttonClose.classList.add("button-close-modal")
    postForm.classList.add("modal-create-post-form")
    divInputTitle.classList.add("div-post-input-title")
    divInputContent.classList.add("div-post-input-content")
    divButton.classList.add("div-buttons-modal")
    buttonCancel.classList.add("button-cancel-modal-form")
    buttonEdit.classList.add("button-publish-modal-form")

    titleModal.innerText = "Edição"
    buttonClose.innerText = "x"
    postTitle.innerText = "Título do post"
    postContent.innerText = "Conteúdo do post"
    buttonCancel.innerText = "Cancelar"
    buttonEdit.innerText = "Salvar Alterações"

    postTitle.name = "title"
    postTitleInput.name = "title"
    postTitleInput.type = "text"

    postContent.name = "content"
    postContentInput.name = "content"
    postContentInput.type = "text"
    buttonEdit.type = "submit"

   
    
    postTitleInput.value = element.title
    postContentInput.value = element.content

    buttonClose.addEventListener("click", (event) => {
        modal.remove()
    })
    buttonCancel.addEventListener("click", (event) => {
        modal.remove()
    })

    postForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        let inputs = {}

        const submit = [...event.target]

        submit.forEach(({name, value}) => {
            if(name) {
                inputs[name] = value
            }
        })
        
        await ApiRequest.editPost(inputs,element.id)
        modal.remove()
        toast("Post editado com sucesso!", "O post selecionado foi alterado. Você já pode visualizá-lo no seu feed ")
        showPosts()
    })

    divTitle.append(titleModal, buttonClose)
    divInputTitle.append(postTitle, postTitleInput)
    divInputContent.append(postContent, postContentInput)
    divButton.append(buttonCancel, buttonEdit)
    postForm.append(divInputTitle, divInputContent, divButton)
    divModal.append(divTitle, postForm)
    modal.append(divModal)

    return modal
}
export function deletePostModal() {
    const modal = document.createElement("section")
    const divModal = document.createElement("div")
    const divTitle = document.createElement("div")
    const title = document.createElement("p")
    const buttonClose = document.createElement("button")
    const confirm = document.createElement("h3")
    const description = document.createElement("p")
    const divButton = document.createElement("div")
    const buttonCancel = document.createElement("button")
    const buttonDelete = document.createElement("button")

    modal.classList.add("modal-wrapper")
    divModal.classList.add("modal-delete")
    divTitle.classList.add("modal-delete-title")
    divButton.classList.add("div-modal-delete-buttons")
    buttonCancel.classList.add("btn-cancel-delete")
    buttonDelete.classList.add("btn-delete")

    title.innerText = "Confirmação de Exclusão"
    buttonClose.innerText = "x"
    confirm.innerText = "Tem certeza que deseja excluir este post?"
    description.innerText = "Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir"
    buttonCancel.innerText = "Cancelar"
    buttonDelete.innerText = "Sim, excluir este post"

    buttonClose.addEventListener("click", (event) => {
        modal.remove()
    })
    buttonCancel.addEventListener("click", (event) => {
        modal.remove()
    })
    buttonDelete.addEventListener("click", async (event) => {
        const postId = localStorage.getItem("@PetInfo:postId")

        console.log(postId)
        await ApiRequest.deletePost(postId)
        localStorage.removeItem("@PetInfo:postId")
        modal.remove()
        toast("Post deletado com sucesso!", "O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed ")

        showPosts()
    })

    divTitle.append(title, buttonClose)
    divButton.append(buttonCancel, buttonDelete)
    divModal.append(divTitle, confirm, description, divButton)
    modal.append(divModal)

    return modal
}
export function modalPost(element) {
    const modal = document.createElement("section")
    const divModal = document.createElement("div")
    const divTitle = document.createElement("div")
    const divInfo = document.createElement("div")
    const figPhoto = document.createElement("figure")
    const photo = document.createElement("img")
    const username = document.createElement("p")
    const bar = document.createElement("span")
    const date = document.createElement("p")
    const buttonClose = document.createElement("button")
    const title = document.createElement("h3")
    const text = document.createElement("p")

    modal.classList.add("modal-wrapper")
    divModal.classList.add("modal-post")
    divTitle.classList.add("modal-post-title")
    divInfo.classList.add("post-Info")
    username.classList.add("post-username")
    bar.classList.add("bar")
    date.classList.add("post-date")
    text.classList.add("post-text")

    let day = new Date(element.createdAt)
    let options = {year: 'numeric', month: 'long'};
    date.innerText = day.toLocaleDateString('pt-BR', options)

    username.innerText = element.user.username
    bar.innerText = "|"
    
    buttonClose.innerText = "x"
    title.innerText = element.title
    text.innerText = element.content

    photo.src = element.user.avatar

    buttonClose.addEventListener("click", (event) => {
        modal.remove()
    })

    figPhoto.append(photo)
    divInfo.append(figPhoto, username, bar, date)
    divTitle.append(divInfo, buttonClose)
    divModal.append(divTitle, title, text)
    modal.append(divModal)

    return modal
}