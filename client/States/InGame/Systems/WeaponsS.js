import ComponentTypes from "./../../../ComponentTypes";
import RenderableC from "../../Components/RenderableC";
import Images from "../../../Assets/ImageGenerator";
import ChargeC from "../Components/ChargeC";
import CollidableC from "../Components/CollidableC";
import Helper from "../Helper";
export default class WeaponsS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      const weaponsC = entity.components[ComponentTypes.WEAPONS];
      const controllC = entity.components[ComponentTypes.CONTROLABLE];
      if (renderC && weaponsC && controllC) {
        if (
          controllC.mouseState.leftClick &&
          new Date().getTime() - weaponsC.lastShot > weaponsC.fireRate
        ) {
          weaponsC.lastShot = new Date().getTime();
          const orb = Helper.generateEntity("Orb", this.entityManager);
          const orbRenderC = orb.components[ComponentTypes.RENDERABLE];
          orbRenderC.posX = renderC.posX + renderC.scaledWidth;
          orbRenderC.posY = renderC.posY;
          const orbChargeC = orb.components[ComponentTypes.CHARGE];
          orbChargeC.location = window.mouseTracker.getLocation(0);
        }
      }
    }
  }
}
