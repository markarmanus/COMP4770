class EntityManager {
  constructor() {
    this.entityCount = 0;
    this.newEntities = [];
    this.entityArray = [];
  }

  update() {
    this.entityArray = this.entityArray.concat(this.newEntities);
    this.newEntities = [];
    this.removeEntities();
  }

  addEntity(descriptor) {
    entity = new Entity(entityCount++, descriptor);
    this.newEntities.push(entity);
    return entity;
  }

  get getEntities() {
    return this.entityArray;
  }

  removeEntities() {
    this.entityArray = this.entityArray.filter(entity => {
      return entity.getStatus();
    });
  }
}
