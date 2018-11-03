class User {

  id = null;
  name = null;
  email = null;
  cpf = null;
  imageUrl = null;
  admin = false;

  setId(id) {
    this.id = id;
  }
  
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
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.cpf = userData.cpf;
    this.imageUrl = userData.imageUrl;
    this.admin = userData.admin;
  }

  getUserAsObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      cpf: this.cpf,
      imageUrl: this.imageUrl,
      admin: this.admin
    }
  }

  getUserAsBackendObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      cpf: this.cpf,
      admin: this.admin
    }
  }

  clearUserData() {
    this.id = null;
    this.name = null;
    this.email = null;
    this.cpf = null;
    this.imageUrl = null;
    this.admin = false;
  }
}

const user = new User();

export default user;
