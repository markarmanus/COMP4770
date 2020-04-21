import ComponentTypes from "./../../../ComponentTypes";
import PickUpC from "../Components/PickUpC";
export default class CollisionS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }
  updateComponents(componentsToChange, entityToChange, pickUpC, saveOld) {
    for (let [component, properties] of componentsToChange) {
      let entityComponent = entityToChange.components[component];
      let willSaveOld = saveOld && pickUpC.lifeTime;
      if (willSaveOld) {
        pickUpC.oldValues[component] = {};
        pickUpC.timeAlive = new Date().getTime();
      }
      if (entityComponent) {
        for (const [property, value] of Object.entries(properties)) {
          if (property === "posX" || property === "posY") willSaveOld = false;
          if (typeof value === "string") {
            if (value[0] === "-") {
              const numericValue = value.substring(1);
              if (willSaveOld)
                pickUpC.oldValues[component][property] = "+" + numericValue;
              entityComponent[property] -= numericValue;
            } else if (value[0] === "+") {
              const numericValue = value.substring(1);
              if (willSaveOld)
                pickUpC.oldValues[component][property] = "-" + numericValue;
              entityComponent[property] += numericValue;
            }
          } else {
            if (willSaveOld)
              pickUpC.oldValues[component][property] =
                entityComponent[property];
            if (property === "sprites") {
              entityComponent[property].left = value.left;
              entityComponent[property].idle = value.idle;
              entityComponent[property].right = value.right;
            } else {
              entityComponent[property] = value;
            }
          }
        }
      }
    }
  }
  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const pickUpC = entity.components[ComponentTypes.PICK_UP];
      const renderC = entity.components[ComponentTypes.RENDERABLE];

      if (pickUpC && renderC) {
        if (pickUpC.wasPickedUp) {
          const pickedUpBy = pickUpC.pickedUpBy;
          if (pickedUpBy && pickUpC.componentsToChange) {
            if (pickUpC.timeAlive && pickUpC.lifeTime) {
              if (new Date().getTime() - pickUpC.timeAlive > pickUpC.lifeTime) {
                const componentsToChange = Object.entries(pickUpC.oldValues);

                this.updateComponents(
                  componentsToChange,
                  pickedUpBy,
                  pickUpC,
                  false
                );
                pickUpC.kill = true;
              }
            } else {
              pickUpC.timeAlive = new Date().getTime();
              const componentsToChange = Object.entries(
                pickUpC.componentsToChange
              );
              this.updateComponents(
                componentsToChange,
                pickedUpBy,
                pickUpC,
                true
              );
            }
            if (pickUpC.lifeTime && !pickUpC.kill) {
              if (!pickUpC.drewGuiTimer) renderC.shouldRender = false;
            } else {
              entity.remove();
            }
          }
        }
      }
    }
  }
}
