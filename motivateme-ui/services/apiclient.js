import axios from "axios"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }
   
    setToken(token) {
        this.token = token
        window.localStorage.setItem("user_token", token)
    }

    async request({ endpoint, method="GET", data={} }) {
       const url = `${this.remoteHostUrl}/${endpoint}`
       const headers =  {
           "Content-Type": "application/json",
       }
       if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`
       }
    
       try {
        const res = await axios({url, method, data, headers})
            return { data: res.data, error: null }

       } catch(error) {
            const message = error?.response?.data?.error?.message
            return { data:null, error: message || String(error) }
       }
    }

    logout() {
        this.setToken(null)        
        window.localStorage.removeItem("user_token")
    }

    async login(userInfo) {
       return await this.request({ endpoint:`auth/login`, method:`POST`, data:userInfo })
    }
    async googleLogin(userInfo) {
        return await this.request({ endpoint:`auth/googlelogin`, method:`POST`, data:userInfo })
    }
    async register(userInfo) {
        return await this.request({ endpoint:`auth/register`, method:`POST`, data:userInfo })
    }
    async fetchUserFromToken() {
       return await this.request({ endpoint: `auth/me`, method: `GET` })
    }
    async getAllTasks() {
        return await this.request({ endpoint: `todo/alltasks`, method: `GET` })
    }
    async completeTask(completedTask) {
        return await this.request({ endpoint:`todo/completetask`, method:`POST`, data:completedTask })
    }
    async addTask(newTask) {
        return await this.request({ endpoint:`todo/addtask`, method:`POST`, data:newTask })
    }
    async updateTask(updatedTask) {
        return await this.request({ endpoint:`todo/updatetask`, method:`PUT`, data:updatedTask })
    }
    async deleteTask(objectWithTaskId) {
        return await this.request({ endpoint:`todo/deletetask`, method:`DELETE`, data:objectWithTaskId })
    }
    async getSummary() {
        return await this.request({ endpoint: `recap/summary`, method: `GET` })
    }
    async getLatestGrade() {
        return await this.request({ endpoint: `recap/latestgrade`, method: `GET` })
    }
    async getActivity() {
        return await this.request({ endpoint: `social/activity`, method: `GET` })
    }
    async follow(usernameObject) {
        return await this.request({ endpoint:`social/follow`, method:`POST`, data:usernameObject })
    }
    async unfollow(usernameObject) {
        return await this.request({ endpoint:`social/unfollow`, method:`DELETE`, data:usernameObject })
    }
    async followers() {
        return await this.request({ endpoint: `social/followers`, method: `GET` })
    }
    async following() {
        return await this.request({ endpoint: `social/following`, method: `GET` })
    }
    async notFollowing() {
        return await this.request({ endpoint: `social/notfollowing`, method: `GET` })
    }
    async recommended() {
        return await this.request({ endpoint: `social/recommended`, method: `GET` })
    }
    async editPassword(twoPasswords) {
        return await this.request({ endpoint:`auth/editpassword`, method:`PUT`, data: twoPasswords })
    }
    async editUsername(username) {
        return await this.request({ endpoint:`auth/editusername`, method:`PUT`, data: { username } })
    }
    async editFirstName(firstName) {
        return await this.request({ endpoint:`auth/editfirstname`, method:`PUT`, data: { firstName } })
    }
    async editLastName(lastName) {
        return await this.request({ endpoint:`auth/editlastname`, method:`PUT`, data: { lastName } })
    }
    async editImage(image) {
        return await this.request({ endpoint:`auth/editimage`, method:`PUT`, data: { image } })
    }
    async editPhone(phone) {
        return await this.request({ endpoint:`auth/editphone`, method:`PUT`, data: { phone } })
    }
    async getAwsCredentials() {
        return await this.request({ endpoint:`auth/imagecredentials`, method:`GET` })
    }
}

// export default new ApiClient("http://localhost:3000")
// Switch when developing / deploying 
export default new ApiClient("https://motivateme-project.herokuapp.com")
