import ComponentTypes from "./../../../ComponentTypes";
export default class CollisionS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const pcikUpC = entity.components[ComponentTypes.PICK_UP];
      if (pcikUpC) {
        if (pcikUpC.wasPickedUp) {
          const pickedUpBy = pcikUpC.pickedUpBy;
          if (pickedUpBy) {
            const componentsToChange = Object.entries(
              pcikUpC.componentsToChange
            );
            for (let [component, properties] of componentsToChange) {
              let entityComponent = pickedUpBy.components[component];
              if (entityComponent) {
                for (const [property, value] of Object.entries(properties)) {
                  if (typeof value === "string") {
                    if (value[0] === "-") {
                      entityComponent[property] -= value.substring(1);
                    } else if (value[0] === "+") {
                      entityComponent[property] += value.substring(1);
                    }
                  } else {
                    entityComponent[property] = value;
                  }
                }
              }
            }
            entity.remove();
          }
        }
      }
    }
  }
}
