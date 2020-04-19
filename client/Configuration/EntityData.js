import ComponentTypes from "../ComponentTypes";
import Images from "../Assets/ImageGenerator";
const EntityData = {
  Player: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.yoda,
      width: 64,
      height: 43,
      scale: 1,
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
      gravityForceScaler: 0.3,
      doubleJumpForceScale: 1,
      dashSpeed: 200,
      dashCooldown: 500,
    },
    [ComponentTypes.MULTI_SPRITES]: {
      left: 386,
      right: 430,
      idle: 1,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 300,
      spritesCount: 4,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: 1,
    },
    [ComponentTypes.HEALTH]: {
      maxHealth: 100,
      positionOnGUI: "left",
    },
    [ComponentTypes.FOCUS]: {
      maxFocus: 100,
      positionOnGUI: "left",
    },
    [ComponentTypes.CURRENCY]: {
      currentCurrency: user.imperialCredits,
      positionOnGUI: "right",
    },
    [ComponentTypes.WEAPONS]: {},
  },
  PauseMenu: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.mainMenu,
      width: 860,
      height: 961,
      scale: 0.6,
    },
  },
  ContinueMenuItem: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.continue,
      width: 150,
      height: 29,
      scale: 1.2,
    },
  },
  EmptyCrib: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.emptyCrib,
      width: 32,
      height: 32,
      scale: 2,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: 1,
    },
    [ComponentTypes.PICK_UP]: {
      componentsToChange: {
        [ComponentTypes.PHYSICAL]: {
          maxGravity: 0,
        },
        [ComponentTypes.RENDERABLE]: {
          image: Images.currency,
          posY: "-50",
        },
        [ComponentTypes.MOVABLE]: {
          gravityForceScaler: 0,
          jumpForce: 0,
        },
      },
    },
  },

  ExitMenuItem: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.exit,
      width: 105,
      height: 33,
      scale: 1.25,
    },
  },
  ForceField: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.forceField,
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
      subSquareRatio: 0.2,
    },
    [ComponentTypes.DAMAGE]: {
      damage: 0.3,
    },
  },
  StormTropper: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.stormtrooper,
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
      subSquareRatio: 1,
    },
    [ComponentTypes.AI]: {
      recognitionSpeed: 500,
      AIType: "StormTropper",
      properties: {
        shooter: {
          fireRate: 200,
          shootingOffset: { x: 20, y: 30 },
          accuracy: 60,
        },
        patrol: {
          speed: 1.5,
        },
      },
    },
  },
  Drone: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.drone,
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
      subSquareRatio: 1,
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
      image: Images.orb,
      width: 21,
      height: 15,
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
      subSquareRatio: 1,
    },
    [ComponentTypes.DAMAGE]: {
      damage: 3,
    },
  },
  LaserBullet: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.laserBullet,
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
      subSquareRatio: 1,
    },
    [ComponentTypes.DAMAGE]: {
      damage: 0,
    },
  },
  Currency: {
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 60,
      spritesCount: 7,
    },
    [ComponentTypes.RENDERABLE]: {
      image: Images.currencyAnimated,
      width: 64,
      height: 64,
      scale: 1.5,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: 1,
    },
  },
  Floor: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.floor,
      width: 400,
      height: 400,
      blocksView: true,
      scale: 0.08,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: 1,
    },
  },
  Explosion: {
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 40,
      spritesCount: 10,
      repeat: false,
    },
    [ComponentTypes.RENDERABLE]: {
      image: Images.currencyAnimated,
      width: 51,
      height: 51,
      scale: 0.3,
    },
    [ComponentTypes.LIFE_TIME]: {
      lifeTime: "animationCycle",
    },
  },
  CheckPoint: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.campFireOff,
      width: 32,
      height: 11,
      scale: 4,
    },
    [ComponentTypes.COLLIDABLE]: {
      subSquareRatio: 1,
    },
    [ComponentTypes.PHYSICAL]: {
      airFriction: 0.7,
      maxGravity: 16,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 300,
      spritesCount: 3,
    },
  },
};
export default EntityData;
