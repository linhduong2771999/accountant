class UserFactory { 
    constructor(data){
        if(typeof data === "object"){
            this.id = data._id || ""
            this.name = data.name || ""
            this.createAt = data.createAt || Date.now();    
            this.email = data.email || ""   
            this.role = data.role || ""   
            this.phone = data.phone || ""   
            this.address = data.address || ""   
            this.level = data.level || ""   
            this.position = data.position || ""    
            this.department = data.department || ""   
            this.dob = data.dob || ""   
            this.age = data.age || ""   
            this.nickName = data.nickName || ""    
            this.photoUrl = data.photoUrl || "" 
            this.gender = data.gender || ""    
            this.description = data.description || ""    
            this.rating = data.rating || ""
            this.social = data.social || ""  
            this.active = data.active || ""   
            this.disableMessage = data.disableMessage  || ""  
            this.reportMessage = data.reportMessage || ""  
            this.slug = data.slug || ""
    
            return this;
        }

        return;
    }
}


export default UserFactory;