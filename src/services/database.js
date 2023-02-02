
export function setUser(user){
    user = JSON.stringify(user)
    localStorage.setItem('user',user)
}

export function getUser(){
    try {
        return JSON.parse(localStorage.getItem('user'))    
    } catch (error) {
        return null
    }
}

export function clear(){
    localStorage.clear();
}