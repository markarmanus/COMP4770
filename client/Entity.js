import ComponentTypes from "./ComponentTypes";
export default class Entity {
  constructor(id, descriptor) {
    this.id = id;
    this.descriptor = descriptor;
    this.active = true;
    this.components = {};
  }

  remove() {
    this.active = false;
  }

  getStatus() {
    return this.active;
  }

  getId() {
    return this.id;
  }

  getComponents() {
    return this.components;
  }

  getDescriptor() {
    return this.descriptor;
  }
  addComponent(component) {
    this.components[component.type] = component;
  }
}
