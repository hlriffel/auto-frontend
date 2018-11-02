class User {

  name = null;
  email = null;
  cpf = null;
  imageUrl = null;
  admin = false;
  
  setName(name) {
    this.name = name;
  }

  setEmail(email) {
    this.email = email;
  }

  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }

  setCpf(cpf) {
    this.cpf = cpf;
  }

  setAdmin(admin) {
    this.admin = admin;
  }
  
  setUserData(userData) {
    this.name = userData.name;
    this.email = userData.email;
    this.cpf = userData.cpf;
    this.imageUrl = userData.imageUrl;
    this.admin = userData.admin;
  }

  getUserAsObject() {
    return {
      name: this.name,
      email: this.email,
      cpf: this.cpf,
      imageUrl: this.imageUrl,
      admin: this.admin
    }
  }

  getUserAsBackendObject() {
    return {
      name: this.name,
      email: this.email,
      cpf: this.cpf,
      admin: this.admin
    }
  }

  clearUserData() {
    this.name = null;
    this.email = null;
    this.cpf = null;
    this.imageUrl = null;
    this.admin = false;
  }
}

const user = new User();

export default user;
