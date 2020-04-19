import ComponentTypes from "../ComponentTypes";
import Images from "../Assets/ImageGenerator";
const EntityData = {
  Player: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Yoda,
      width: 72,
      height: 47,
      scale: 1.2,
      alpha: 1,
      visionOffset: {
        x: 0.1,
        y: 0.2,
      },
    },
    [ComponentTypes.CHECKPOINT]: {},
    [ComponentTypes.PHYSICAL]: {
      airFriction: 0.2,
      maxGravity: 16,
    },
    [ComponentTypes.CONTROLABLE]: {
      leftBttn: "a",
      rightBttn: "d",
      jumpBttn: " ",
      upBttn: "w",
      downBttn: "s",
    },
    [ComponentTypes.MOVABLE]: {
      velocity: 1,
      maxVelocity: 5,
      friction: 0.3,
      accerlationSpeed: 0.9,
      jumpForce: 10,
      maxJumps: 2,
      jumpCooldown: 200,
      dashCost: 10,
      gravityForceScaler: 0.3,
      doubleJumpForceScale: 1,
      dashSpeed: 200,
      dashCooldown: 500,
    },
    [ComponentTypes.MULTI_SPRITES]: {
      left: 384,
      right: 432,
      idle: 0,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 300,
      spritesCount: 4,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 0.7,
        y: 1,
      },
    },
    [ComponentTypes.HEALTH]: {
      maxHealth: 100,
      positionOnGUI: "left",
    },
    [ComponentTypes.FOCUS]: {
      maxFocus: 100,
      positionOnGUI: "left",
      timeToReGen: 800,
    },
    [ComponentTypes.CURRENCY]: {
      currentCurrency: user.currency,
      positionOnGUI: "right",
    },
    [ComponentTypes.WEAPONS]: {
      fireRate: 400,
      orbCost: 2,
      fireBallCost: 0.5,
    },
  },
  PauseMenu: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.PauseMenu,
      width: 860,
      height: 961,
      scale: 0.6,
    },
  },
  ContinueMenuItem: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.Continue,
      width: 150,
      height: 29,
      scale: 1.2,
    },
  },
  MandalorianCaged: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.MandalorianCaged,
      width: 98,
      height: 93,
      scale: 1.4,
    },
  },
  Carrot: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Carrot,
      width: 64,
      height: 67,
      scale: 0.8,
    },
  },
  Chest: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Chest,
      width: 74,
      height: 63,
      scale: 1,
    },
  },
  Chicken: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Chicken,
      width: 32,
      height: 33,
      scale: 1.2,
    },
  },
  Clover: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Clover,
      width: 31,
      height: 36,
      scale: 1.2,
    },
  },
  CoinPile: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.CoinPile,
      width: 250,
      height: 96,
      scale: 0.4,
    },
  },
  Ring: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Ring,
      width: 64,
      height: 82,
      scale: 0.6,
    },
  },
  Scroll: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Scroll,
      width: 32,
      height: 35,
      scale: 1.2,
    },
    [ComponentTypes.PICK_UP]: {},
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
  },
  SmallSmoke: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.SmallSmoke,
      width: 24,
      height: 23,
      scale: 1.2,
    },
    [ComponentTypes.LIFE_TIME]: {
      lifeTime: 200,
    },
  },
  Smoke: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.Smoke,
      width: 80,
      height: 70,
      scale: 1.2,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 150,
      spritesCount: 7,
      repeat: false,
    },
    [ComponentTypes.LIFE_TIME]: {
      lifeTime: "animationCycle",
    },
  },
  StormTrooperCar: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.StormTrooperCar,
      width: 66,
      height: 66,
      scale: 1.8,
    },
    [ComponentTypes.MULTI_SPRITES]: {
      right: 66,
      left: 0,
      idle: 0,
    },
  },
  Spike: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Spike,
      width: 32,
      height: 16,
      scale: 1.1,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
  },
  MudFloor: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      blocksView: true,
      image: Images.MudFloor,
      width: 67,
      height: 67,
      scale: 0.4776,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
  },
  IceFloor: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      blocksView: true,
      image: Images.IceFloor,
      width: 106,
      height: 106,
      scale: 0.301,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
  },
  LavalFloor: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      blocksView: true,
      image: Images.LavaFloor,
      width: 98,
      height: 98,
      scale: 0.3265,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
    [ComponentTypes.DAMAGE]: {
      damage: 0.1,
    },
  },

  Sword: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Sword,
      width: 64,
      height: 64,
      scale: 0.85,
    },
  },
  Arrow: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Arrow,
      width: 22,
      height: 64,
      scale: 1.1,
    },
  },
  Timer: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.Timer,
      width: 101,
      height: 101,
      scale: 1.2,
    },
    [ComponentTypes.ANIMATED]: {
      spritesCount: 8,
    },
    [ComponentTypes.LIFE_TIME]: {
      lifeTime: "animationCycle",
    },
  },
  Mushroom: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Mushroom,
      width: 40,
      height: 49,
      scale: 1.2,
    },
    [ComponentTypes.PICK_UP]: {
      lifeTime: 3000,
      componentsToChange: {},
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
  },
  EmptyCrib: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.EmptyCrib,
      width: 64,
      height: 55,
      scale: 1,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 300,
      spritesCount: 4,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
    [ComponentTypes.PICK_UP]: {
      lifeTime: 30000,
      componentsToChange: {
        [ComponentTypes.PHYSICAL]: {
          maxGravity: 0,
        },
        [ComponentTypes.RENDERABLE]: {
          image: Images.YodaCrib,
          height: 64,
          width: 76,
        },

        [ComponentTypes.MULTI_SPRITES]: {
          sprites: { idle: 0, right: 0, left: 0 },
        },
        [ComponentTypes.ANIMATED]: {
          spritesCount: 4,
        },
        [ComponentTypes.MOVABLE]: {
          gravityForceScaler: 0,
          jumpForce: 0,
        },
        [ComponentTypes.COLLIDABLE]: {
          isInvincible: false,
        },
      },
    },
  },
  ExitMenuItem: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.Exit,
      width: 105,
      height: 33,
      scale: 1.25,
    },
  },
  FireBall: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.FireBall,
      width: 64,
      height: 64,
      scale: 5,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 35,
      spritesCount: 8,
    },
    [ComponentTypes.SEEK]: {
      speed: 2,
      entityToSeek: "mouse",
      delay: 3,
      offset: { x: 0.5, y: 0.5 },
      accerlation: 1.1,
      maxSpeed: 10,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 0.2,
        y: 0.2,
      },
    },
    [ComponentTypes.DAMAGE]: {
      damage: 3,
    },
  },
  StormTrooper: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.StormTrooper,
      width: 64,
      height: 64,
      visionOffset: {
        x: 0.1,
        y: 0.2,
      },
      scale: 2,
    },
    [ComponentTypes.MULTI_SPRITES]: {
      left: 133,
      right: 199,
      idle: 0,
      shootLeft: 265,
      shootRight: 331,
    },
    [ComponentTypes.HEALTH]: {
      maxHealth: 100,
      folllowEntity: true,
    },
    [ComponentTypes.PHYSICAL]: {
      airFriction: 0.7,
      maxGravity: 16,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 300,
      spritesCount: 3,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 0.7,
        y: 1,
      },
    },
    [ComponentTypes.AI]: {
      recognitionSpeed: 500,
      AIType: "StormTrooper",
      properties: {
        shooter: {
          fireRate: 200,
          shootingOffset: { x: 0.1, y: 0.25 },
          accuracy: 60,
        },
        patrol: {
          speed: 1.5,
        },
      },
    },
  },
  Drone: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Drone,
      width: 64,
      height: 64,
      visionOffset: {
        x: 0.1,
        y: 0.2,
      },
      scale: 1,
    },
    [ComponentTypes.HEALTH]: {
      maxHealth: 100,
      folllowEntity: true,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
    [ComponentTypes.AI]: {
      recognitionSpeed: 500,
      AIType: "Drone",
      properties: {
        drone: {
          maxSpeed: 8,
          speed: 1,
          offset: { x: 0, y: 0 },
          accerlation: 0.1,
        },
      },
    },
    [ComponentTypes.DAMAGE]: {
      damage: 20,
    },
  },
  Orb: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.Orb,
      width: 21,
      offset: {
        x: 0.65,
        y: 0.3,
      },
      height: 15,
      scale: 1.3,
    },
    [ComponentTypes.LIFE_TIME]: {
      lifeTime: 1500,
    },
    [ComponentTypes.CHARGE]: {
      behaveLikeBullet: true,
      speed: 10,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
    [ComponentTypes.DAMAGE]: {
      damage: 3,
    },
  },
  LaserBullet: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.LaserBullet,
      width: 25,
      height: 9,
      scale: 1,
    },
    [ComponentTypes.LIFE_TIME]: {
      lifeTime: 500,
    },
    [ComponentTypes.CHARGE]: {
      behaveLikeBullet: true,
      speed: 10,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
    [ComponentTypes.DAMAGE]: {
      damage: 0,
    },
  },
  Currency: {
    inLevelEditor: true,
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 60,
      spritesCount: 6,
    },
    [ComponentTypes.RENDERABLE]: {
      image: Images.Currency,
      imageCropX: 171,
      width: 57,
      height: 56,
      scale: 0.8,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
  },
  Floor: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      width: 32,
      height: 32,
      blocksView: true,
      scale: 1,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
  },
  Explosion: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.Explosion,
      width: 64,
      height: 64,
      scale: 1,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 70,
      spritesCount: 6,
      repeat: false,
    },
    [ComponentTypes.LIFE_TIME]: {
      lifeTime: "animationCycle",
    },
  },
  CheckPoint: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.CampFireOff,
      width: 64,
      height: 64,
      scale: 2,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 0.3,
        y: 0.3,
      },
    },
    [ComponentTypes.PHYSICAL]: {
      airFriction: 0.7,
      maxGravity: 16,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 300,
      spritesCount: 3,
    },
    [ComponentTypes.CHECKPOINT]: {},
  },
  LeftArrow: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.LeftArrow,
      width: 453,
      height: 719,
      scale: 0.2,
    },
  },
  RightArrow: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.RightArrow,
      width: 453,
      height: 719,
      scale: 0.2,
    },
  },
  Glass: {
    inLevelEditor: true,
    [ComponentTypes.RENDERABLE]: {
      image: Images.Glass,
      width: 23,
      height: 23,
      scale: 1.39,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: {
        x: 1,
        y: 1,
      },
    },
  },
  MessageScroll: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.MessageScroll,
      width: 820,
      height: 436,
      scale: 1.75,
    },
  },
  RedPlanet: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.redPlanet,
      width: 128,
      height: 128,
      scale: 1,
    },
  },
  GreenPlanet: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.greenPlanet,
      width: 128,
      height: 128,
      scale: 1,
    },
  },
  BluePlanet: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.bluePlanet,
      width: 128,
      height: 128,
      scale: 1,
    },
  },
  PinkPlanet: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.pinkPlanet,
      width: 128,
      height: 128,
      scale: 1,
    },
  },
  OverworldYoda: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.overworldYoda,
      width: 64,
      height: 54,
      scale: 1,
    },
    [ComponentTypes.CONTROLABLE]: {
      leftBttn: "a",
      rightBttn: "d",
      upBttn: "w",
      downBttn: "s",
    },
    [ComponentTypes.MOVABLE]: {
      velocity: 1,
      maxVelocity: 5,
      friction: 0.3,
      accerlationSpeed: 0.9,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 300,
      spritesCount: 4,
    },
  },
};
export default EntityData;
