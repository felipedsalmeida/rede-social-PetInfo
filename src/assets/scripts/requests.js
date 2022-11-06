import { toast, errorMessage } from "./toast.js";


export class ApiRequest {
    static baseURL = "http://localhost:3333";
    static token = localStorage.getItem("@PetInfo:token") || "";
    
    static async login(body, button) {
        try {
            const userLogin = await fetch(`${this.baseURL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            
            if(userLogin.ok) {
                const response = await userLogin.json()
                localStorage.setItem("@PetInfo:token", response.token);
                
                window.location.assign("src/pages/home.html")
            } else {
                const response = await userLogin.json()

                button.innerHTML = ""
                button.innerText = "Acessar"
                errorMessage(response.message)
                
            }

           
        } catch(error) {
            console.log(error)
        }
      
      
    }

    static async signup(body, button) {
        try{
            const newUser = await fetch (`${this.baseURL}/users/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            if(newUser.ok) {
                
                toast("Sua conta foi criada com sucesso!", "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login")

                
                setTimeout(() => {
                    window.location.assign("index.html")
                }, 4000)
                
            } else {
                button.innerHTML = ""
                button.innerText = "Cadastrar"
                const response = await newUser.json()
                console.log(response)
            }

        } catch(error){

        }


        
    }

    static async getUser() {
        try {
            const user = await fetch(`${this.baseURL}/users/profile`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })

            const response = await user.json()
            localStorage.setItem("@PetInfo:UserId", response.id);
            return response
            
        } catch(err) {

        }


    }

    static async createPost(body) {
        const post = await fetch(`${this.baseURL}/posts/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        
        .catch((err) => console.log(err))

        return post
    }

    static async getPost() {
        const posts = await fetch(`${this.baseURL}/posts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then((res) => res.json())
        
        .catch((err) => console.log(err))

        return posts
    }

    static async editPost(inputData, idPost) {

        try {
            const post = await fetch(`${this.baseURL}/posts/${idPost}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify(inputData)
            })
            const response = await post.json()
            console.log(response)
        } catch(error) {
            console.log(error)
        }
        
    }

    static async deletePost(idPost) {
        const post = await fetch(`${this.baseURL}/posts/${idPost}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then((res) => {
            console.log(res)
        } )
    }
}
