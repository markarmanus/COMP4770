import ComponentTypes from "./../../../ComponentTypes";
import RenderableC from "../../Components/RenderableC";
import Images from "../../../Assets/ImageGenerator";
import ChargeC from "../Components/ChargeC";
import CollidableC from "../Components/CollidableC";
export default class WeaponsS {
  constructor() {}

  update(entityManager) {
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (
        entity.components[ComponentTypes.RENDERABLE] &&
        entity.components[ComponentTypes.WEAPONS] &&
        entity.components[ComponentTypes.CONTROLABLE]
      ) {
        const renderC = entity.components[ComponentTypes.RENDERABLE];
        const weaponsC = entity.components[ComponentTypes.WEAPONS];
        const controllC = entity.components[ComponentTypes.CONTROLABLE];
        if (
          controllC.mouseState.leftClick &&
          new Date().getTime() - weaponsC.lastShot > weaponsC.fireRate
        ) {
          weaponsC.lastShot = new Date().getTime();
          const bullet = entityManager.addEntity("Bullet");
          let bulletRenderC = new RenderableC({
            posX: renderC.posX + renderC.scaledWidth,
            posY: renderC.posY,
            image: Images.currency,
            width: 500,
            height: 500,
            scale: 0.05,
          });
          let bulletChargeC = new ChargeC({
            speed: weaponsC.shootingSpeed,
            location: window.mouseTracker.getLocation(0),
          });
          let bulletCollisionC = new CollidableC({ subSquareRatio: 1 });
          bullet.addComponent(bulletRenderC);
          bullet.addComponent(bulletChargeC);
          // bullet.addComponent(bulletCollisionC);
          setTimeout(() => {
            bullet.remove();
          }, weaponsC.bulletLifeTime);
        }
      }
    }
  }
}
