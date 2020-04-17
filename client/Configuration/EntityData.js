import ComponentTypes from "../ComponentTypes";

import Images from "../Assets/ImageGenerator";
const EntityData = {
  Player: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.yoda,
      width: 32,
      height: 64,
      scale: 2.5,
      visionOffset: {
        x: 0.1,
        y: 0.2,
      },
    },
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
      left: 128,
      right: 192,
      idle: 0,
    },
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 300,
      imgSrc: Images.yoda,
      spritesCount: 6,
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
    [ComponentTypes.WEAPONS]: {
    },
  },
  StormTropper: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.yoda,
      width: 32,
      height: 64,
      visionOffset: {
        x: 0.1,
        y: 0.2,
      },
      scale: 2.5,
    },
    [ComponentTypes.MULTI_SPRITES]: {
      left: 128,
      right: 192,
      idle: 0,
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
      imgSrc: Images.yoda,
      spritesCount: 6,
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
        },
        patrol: {
          speed: 1.5,
        }
      }
    },

  },
  Drone: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.currency,
      width: 500,
      height: 500,
      visionOffset: {
        x: 0.1,
        y: 0.2,
      },
      scale: 0.15,
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
          accerlation: 0.1
        }
      }
    },
    [ComponentTypes.DAMAGE]: {
      damage: 20,
    }
  },
  Orb: {
    [ComponentTypes.RENDERABLE]: {
      image: Images.currency,
      width: 500,
      height: 500,
      scale: 0.09,
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
    }
  },
  LaserBullet: {

    [ComponentTypes.RENDERABLE]: {
      image: Images.currency,
      width: 500,
      height: 500,
      scale: 0.09,
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
    }
  },
  Currency: {
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 40,
      imgSrc: Images.currencyAnimated,
      spritesCount: 10,
    },
    [ComponentTypes.RENDERABLE]: {
      image: Images.currencyAnimated,
      width: 51,
      height: 51,
      scale: 1,
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
    [ComponentTypes.FOLLOW]: {
      entityToFollow: "mouse",
      delay: 5,
      speed: 1,
      offset: {
        x: 0.5,
        y: 0.5,
      },
    },
  },
  Explosion: {
    [ComponentTypes.ANIMATED]: {
      animationSpeed: 40,
      imgSrc: Images.currencyAnimated,
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
};
export default EntityData;
