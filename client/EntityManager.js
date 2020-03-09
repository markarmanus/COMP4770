import Entity from "./Entity";

export default class EntityManager {
  constructor() {
    this.entityCount = 0;
    this.newEntities = [];
    this.entityArray = [];
  }

  update() {
    if (this.newEntities.length)
      this.entityArray = this.entityArray.concat(this.newEntities);
    this.newEntities = [];
    this.removeEntities();
  }

  addEntity(descriptor) {
    const entity = new Entity(this.entityCount++, descriptor);
    this.newEntities.push(entity);
    return entity;
  }

  getEntities() {
    return this.entityArray;
  }

  removeEntities() {
    this.entityArray = this.entityArray.filter(entity => {
      return entity.getStatus();
    });
  }
}
