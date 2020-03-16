import GameState from "./../../GameState";
import RenderS from "./Systems/RenderS";
import ControllsS from "./Systems/ControllsS";
import AnimationS from "./Systems/AnimationS";
import MovementS from "./Systems/MovementS";
import PhysicsS from "./Systems/PhysicsS";
import CollisionS from "./Systems/CollisionS";
import RenderableC from "../Components/RenderableC";
import AnimatedC from "../Components/AnimatedC";
import MovableC from "./Components/MovableC";
import MultiSpritesC from "./Components/MultiSpritesC";
import ControllableC from "./Components/ControllableC";
import CollidableC from "./Components/CollidableC";
import PhysicalC from "./Components/PhysicalC";

export default class inGameState extends GameState {
  constructor() {
    super();
    this.paused = false;
    this.renderS = new RenderS();
    this.controllsS = new ControllsS();
    this.animationS = new AnimationS();
    this.movementS = new MovementS();
    this.collisionS = new CollisionS();
    this.physicsS = new PhysicsS(0.4);
    this.loadLevel();
    window.addEventListener("keydown", e => {
      if (e.key === "p") this.paused = !this.paused;
    });
  }
  update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    const background = new Image();
    background.src = "https://i.ytimg.com/vi/Ic3ZdD5ko7k/maxresdefault.jpg";
    const patern = canvasContext.createPattern(background, "repeat");
    canvasContext.fillStyle = patern;
    canvasContext.fillRect(
      canvas.width * 2 * -1,
      canvas.height * 2 * -1,
      canvas.width * 10,
      canvas.height * 10
    );
    // canvasContext.drawImage(background, 0, 0);

    this.controllsS.update(this.entityManager);
    if (!this.paused) {
      super.update();
      this.animationS.update(this.entityManager);
      this.physicsS.update(this.entityManager);
      this.movementS.update(this.entityManager);
      this.collisionS.update(this.entityManager);
    }
    this.renderS.update(this.entityManager);
    // canvasContext.restore();
  }
  //Here we will load the level that the user clicked on.
  loadLevel() {
    const image = new Image();
    image.src =
      "https://allacrost.org/wiki/images/e/eb/Sprite_old_woman_walk.png";
    const player = this.entityManager.addEntity("Player");
    const renderC = new RenderableC(640, 530, image, 32, 64, 2.5);
    const physicsC = new PhysicalC(0.7, 16);
    const controllC = new ControllableC({
      leftBttn: "a",
      rightBttn: "d",
      jumpBttn: " ",
      upBttn: "w",
      downBttn: "s"
    });
    const movementC = new MovableC(1, 5, 0.1, 0.9, 10, 2, 200, 0.3, 1);
    const spritesC = new MultiSpritesC({
      left: 128,
      right: 192,
      idle: 0
    });
    const animationC = new AnimatedC(300, image, 6);
    const collisionC = new CollidableC(1);
    player.addComponent(renderC);
    player.addComponent(controllC);
    player.addComponent(movementC);
    player.addComponent(animationC);
    player.addComponent(spritesC);
    player.addComponent(collisionC);
    player.addComponent(physicsC);
    const enemy = this.entityManager.addEntity("Enemy");
    const renderC2 = new RenderableC(300, 530, image, 32, 64, 2.5);
    const controllC2 = new ControllableC({
      leftBttn: "k",
      rightBttn: ";"
    });
    const animationC2 = new AnimatedC(100, image, 6);
    const collisionC2 = new CollidableC(1);
    const movementC2 = new MovableC(1, 3, 0.3, 0.9);
    const physicsC2 = new PhysicalC(0.6, 8);

    // enemy.addComponent(renderC2);
    // enemy.addComponent(controllC2);
    // enemy.addComponent(movementC2);
    // enemy.addComponent(animationC2);
    // enemy.addComponent(spritesC);
    // enemy.addComponent(collisionC2);
    // enemy.addComponent(physicsC2);

    for (let i = 0; i <= 30; i++) {
      const entity = this.entityManager.addEntity("Block");
      const image2 = new Image();
      image2.src =
        "https://lh3.googleusercontent.com/AHWXzzc6p16egz8BWySU4jw-EYVVZDhLxyhBv5RJrLC7LdCbEKkeMF8sh0N9UpZSzDu3tQ9DBxiiCV5KPZcyubY";
      const renderC3 = new RenderableC(32 * i, 700, image2, 400, 400, 0.08);
      const collisionC3 = new CollidableC(1);
      entity.addComponent(renderC3);
      entity.addComponent(collisionC3);
    }
    for (let i = 0; i <= 30; i++) {
      const entity = this.entityManager.addEntity("Block");
      const image2 = new Image();
      image2.src =
        "https://lh3.googleusercontent.com/AHWXzzc6p16egz8BWySU4jw-EYVVZDhLxyhBv5RJrLC7LdCbEKkeMF8sh0N9UpZSzDu3tQ9DBxiiCV5KPZcyubY";
      const renderC3 = new RenderableC(32 * i, 100, image2, 400, 400, 0.08);
      const collisionC3 = new CollidableC(1);
      entity.addComponent(renderC3);
      entity.addComponent(collisionC3);
    }
  }
}
