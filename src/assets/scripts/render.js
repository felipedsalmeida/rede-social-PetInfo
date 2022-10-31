import { ApiRequest } from "./requests.js"
import { createPostCard } from "./home.js"


export async function showPosts() {
    const postList = document.getElementById("post-list")
    const post = await ApiRequest.getPost()

    postList.innerHTML = ""
    
    post.reverse().forEach((element) => {
        
        const card =  createPostCard(element)

        postList.append(card)
    })

}
