import ComponentTypes from "./../../../ComponentTypes";
import RenderableC from "../../Components/RenderableC";
import Images from "../../../Assets/ImageGenerator";
import ChargeC from "../Components/ChargeC";
import CollidableC from "../Components/CollidableC";
import Helper from "../../../Helper";
import Vec2 from "../../../Vec2";
import Sounds from "../../../Assets/SoundGenerator";
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
      const spritesC = entity.components[ComponentTypes.MULTI_SPRITES];
      const animationC = entity.components[ComponentTypes.ANIMATED];
      const mouseLocation = window.mouseTracker.getLocation(0);
      const focusC = entity.components[ComponentTypes.FOCUS];
      if (renderC && weaponsC && controllC) {
        let lastAction;
        if (renderC.image === Images.Yoda) {
          if (
            controllC.mouseState.leftClick ||
            controllC.mouseState.rightClick
          ) {
            if (lastAction === "NotClicked") animationC.restart = true;
            spritesC.sprites.idle = mouseLocation.x < renderC.posX ? 48 : 96;
            spritesC.sprites.left = 48;
            spritesC.sprites.right = 96;
            lastAction = "Clicked";
          } else {
            if (lastAction === "Clicked") animationC.repeat = true;
            spritesC.sprites.idle = 0;
            spritesC.sprites.left = 384;
            spritesC.sprites.right = 432;
            lastAction = "NotClicked";
          }
        }

        if (
          controllC.mouseState.leftClick &&
          new Date().getTime() - weaponsC.lastShot > weaponsC.fireRate &&
          focusC.currentFocus > weaponsC.orbCost
        ) {
          weaponsC.lastShot = new Date().getTime();
          const orb = Helper.generateEntity("Orb", this.entityManager);
          const orbRenderC = orb.components[ComponentTypes.RENDERABLE];
          focusC.currentFocus -= weaponsC.orbCost;
          Sounds.OrbSound().play();
          orbRenderC.posX =
            renderC.posX + orbRenderC.offset.x * renderC.scaledWidth;
          orbRenderC.posY =
            renderC.posY + orbRenderC.offset.y * renderC.scaledHeight;
          orbRenderC.offset = { x: 1, y: 1 };
          const orbChargeC = orb.components[ComponentTypes.CHARGE];
          const mouseLocationVector = new Vec2(
            mouseLocation.x,
            mouseLocation.y
          );
          const angle = mouseLocationVector.angle(
            new Vec2(orbRenderC.posX, orbRenderC.posY)
          );
          orbRenderC.rotation = angle;
          orbChargeC.location = mouseLocation;
        }
        if (
          controllC.mouseState.rightClick &&
          focusC.currentFocus > weaponsC.fireBallCost
        ) {
          if (!weaponsC.FireBallEntity) {
            const fireBall = Helper.generateEntity(
              "FireBall",
              this.entityManager
            );
            weaponsC.fireBallSound = Sounds.FireBall();
            weaponsC.fireBallSound.play();
            const fireBallRenderC =
              fireBall.components[ComponentTypes.RENDERABLE];
            fireBallRenderC.posX =
              renderC.posX +
              renderC.scaledWidth / 2 -
              fireBallRenderC.scaledWidth / 2;
            fireBallRenderC.posY =
              renderC.posY +
              renderC.scaledHeight / 4 -
              fireBallRenderC.scaledHeight / 2;
            weaponsC.FireBallEntity = fireBall;
          } else {
            focusC.currentFocus -= weaponsC.fireBallCost;
          }
        } else {
          if (weaponsC.FireBallEntity) {
            weaponsC.FireBallEntity.remove();
            weaponsC.FireBallEntity = null;
          }
          if (weaponsC.fireBallSound) {
            weaponsC.fireBallSound.pause();
            weaponsC.fireBallSound.currentTime = 0;
            weaponsC.fireBallSound.parentNode.removeChild(
              weaponsC.fireBallSound
            );
            weaponsC.fireBallSound = null;
          }
        }
      }
    }
  }
}
