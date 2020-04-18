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
  getNewEntities() {
    return this.newEntities;
  }
  getEntityCount() {
    return this.entityCount;
  }
  setEntities(entities) {
    this.entityArray = entities;
  }
  setNewEntities(newEntities) {
    this.newEntities = newEntities;
  }
  setEntityCount(count) {
    this.entityCount = count;
  }
  getEntitiesOfType(type) {
    return this.entityArray.filter((entity) => entity.descriptor === type);
  }
  removeEntities() {
    this.entityArray = this.entityArray.filter((entity) => {
      return entity.getStatus();
    });
  }
}
