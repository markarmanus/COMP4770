import ComponentTypes from "../../../ComponentTypes";
import Vec2 from "../../../Vec2";
import RenderableC from "../../Components/RenderableC";
import ChargeC from "../Components/ChargeC";

import Images from "../../../Assets/ImageGenerator";
import CollidableC from "../Components/CollidableC";
import Helper from "../Helper";
import SeekC from "../Components/SeekC";
export default class BehaviourS {
  constructor(entityManager) {
    this.debug = false;
    window.addEventListener("keydown", (e) => {
      if (e.key === "C") {
        this.debug = !this.debug;
      }
    });
    this.entityManager = entityManager;
    this.firstTime = false;
  }
  handleFollow(entity) {
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    const followC = entity.components[ComponentTypes.FOLLOW];
    if (followC.isActive) {
      let locationTofollow = null;
      if (followC.entityToFollow === "mouse") {
        locationTofollow = window.mouseTracker.getLocation(0);
      }
      followC.locationStack.push(locationTofollow);
      if (followC.locationStack.length > followC.delay) {
        let newLocation = followC.locationStack.shift();
        renderC.posX = newLocation.x + followC.offset.x;
        renderC.posY = newLocation.y + followC.offset.y;
      }
    }
  }
  handleCharge(entity) {
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    const chargeC = entity.components[ComponentTypes.CHARGE];
    if (!chargeC.speedVector || !chargeC.behaveLikeBullet)
      chargeC.speedVector = new Vec2(
        chargeC.location.x - renderC.posX,
        chargeC.location.y - renderC.posY
      );
    renderC.posY += chargeC.speedVector.normalY * chargeC.speed;
    renderC.posX += chargeC.speedVector.normalX * chargeC.speed;
  }
  handlePatrol(entity) {
    let grid = Helper.getInitialLevelGrid(this.entityManager);
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    const partrolC = entity.components[ComponentTypes.PATROL];
    let gridPosition = Helper.toGridPosition({
      x: renderC.posX,
      y: renderC.posY + renderC.scaledHeight,
    });
    let direction = partrolC.direction;
    let nextLocation = {
      x: gridPosition.x + direction.x,
      y: gridPosition.y + direction.y,
    };
    if (
      grid[nextLocation.y] &&
      grid[nextLocation.y][nextLocation.x] &&
      grid[nextLocation.y][nextLocation.x].includes("Floor")
    ) {
      renderC.posX += direction.x * partrolC.speed;
    } else {
      partrolC.direction.x = partrolC.direction.x * -1;
    }
  }
  debugPath(path) {
    if (path.length > 0) {
      for (const position of path) {
        canvasContext.beginPath();
        canvasContext.arc(position.x, position.y, 10, 0, 2 * Math.PI);
        canvasContext.fillStyle = "green";
        canvasContext.fill();
        canvasContext.strokeStyle = "#003300";
        canvasContext.stroke();
      }
    }
  }
  handleSeek(entity) {
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    const seekC = entity.components[ComponentTypes.SEEK];
    let directVector;
    if (seekC.entityToSeek) {
      const entityToSeekRenderC =
        seekC.entityToSeek.components[ComponentTypes.RENDERABLE];
      directVector = new Vec2(
        entityToSeekRenderC.posX + seekC.offset.x - renderC.posX,
        entityToSeekRenderC.posY + seekC.offset.y - renderC.posY
      );
    } else {
      directVector = new Vec2(
        seekC.locationToSeek.x + seekC.offset.x - renderC.posX,
        seekC.locationToSeek.y + seekC.offset.y - renderC.posY
      );
    }
    seekC.currentSpeed += seekC.speed * seekC.accerlation;
    seekC.currentSpeed =
      seekC.currentSpeed > seekC.maxSpeed ? seekC.maxSpeed : seekC.currentSpeed;
    if (Math.abs(directVector.x) < 10 && Math.abs(directVector.y) < 10) {
      seekC.currentSpeed = 0;
    }
    renderC.posY += directVector.normalY * seekC.currentSpeed;
    renderC.posX += directVector.normalX * seekC.currentSpeed;
  }
  handleShooter(entity) {
    const shooterC = entity.components[ComponentTypes.SHOOTER];
    const shooterRenderC = entity.components[ComponentTypes.RENDERABLE];
    const toShootAt = shooterC.toShootAt;
    const shootAtRenderC = toShootAt.components[ComponentTypes.RENDERABLE];
    if (
      shootAtRenderC &&
      new Date().getTime() - shooterC.lastShotTime > shooterC.fireRate
    ) {
      const bullet = Helper.generateEntity("LaserBullet", this.entityManager);
      const renderC = bullet.components[ComponentTypes.RENDERABLE];
      renderC.posX = shooterRenderC.posX + shooterC.shootingOffset.x;
      renderC.posY = shooterRenderC.posY + shooterC.shootingOffset.y;

      bullet.components[ComponentTypes.CHARGE].location = {
        x: shootAtRenderC.posX + shootAtRenderC.scaledWidth / 2,
        y: shootAtRenderC.posY + shootAtRenderC.scaledHeight / 2,
      };
      shooterC.lastShotTime = new Date().getTime();
    }
  }
  handleDrone(entity) {
    const droneC = entity.components[ComponentTypes.DRONE];
    const droneRenderC = entity.components[ComponentTypes.RENDERABLE];
    const toAttack = droneC.toAttack;
    const toAttackRenderC = toAttack.components[ComponentTypes.RENDERABLE];
    let start = Helper.toCameraPos({
      x: droneRenderC.posX,
      y: droneRenderC.posY,
    });
    let goal = Helper.toCameraPos({
      x: toAttackRenderC.posX,
      y: toAttackRenderC.posY,
    });
    start = Helper.toGridPosition(start);
    goal = Helper.toGridPosition(goal);
    let path = Helper.AStar(start, goal, this.entityManager, true);
    if (path.length > 0) {
      path = path.map((position) =>
        Helper.toOriginalPosition(Helper.toPixelPosition(position))
      );
      if (this.debug) this.debugPath(path);
      let seekC = entity.components[ComponentTypes.SEEK];
      if (!seekC) {
        seekC = new SeekC({
          maxSpeed: droneC.maxSpeed,
          speed: droneC.speed,
          offset: droneC.offset,
          locationToSeek: path.shift(),
          accerlation: droneC.accerlation,
        });
        entity.addComponent(seekC);
      } else {
        seekC.locationToSeek = path.shift();
      }
    }
  }
  update() {
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      if (entity.components[ComponentTypes.RENDERABLE]) {
        if (entity.components[ComponentTypes.SEEK]) {
          this.handleSeek(entity);
        }
        if (entity.components[ComponentTypes.CHARGE]) {
          this.handleCharge(entity);
        }
        if (entity.components[ComponentTypes.FOLLOW]) {
          this.handleFollow(entity);
        }
        if (entity.components[ComponentTypes.SHOOTER]) {
          this.handleShooter(entity);
        }
        if (entity.components[ComponentTypes.DRONE]) {
          this.handleDrone(entity);
        }
        if (entity.components[ComponentTypes.PATROL]) {
          this.handlePatrol(entity);
        }
      }
    }
  }
}
