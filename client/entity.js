class Entity {
  constructor(id, descriptor) {
    this.id = id;
    this.descriptor = descriptor;
    this.active = true;
  }

  get remove() {
    this.active = false;
  }

  get getStatus() {
    return this.active;
  }

  get getId() {
    return this.id;
  }

  get getDescriptor() {
    return this.descriptor;
  }
}
