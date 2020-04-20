import ComponentTypes from "./../../../ComponentTypes";
import Helper from "../../../Helper";
export default class GuiS {
  constructor(entityManager) {
    this.entityManager = entityManager;

    let canvas = document.getElementById('canvas').getContext('2d');
    canvas.font = "40px DistantGalaxy";
    canvas.fillStyle = 'yellow';

    this.menuText = [];

  }

  drawMenuText() {
    let canvas = document.getElementById('canvas').getContext('2d');
    canvas.font = "40px DistantGalaxy";
    canvas.fillStyle = 'yellow';
    canvas.strokeStyle = "black";
    for (let i = 0; i < this.menuText.length; i ++) {
      canvas.fillText(this.menuText[i][0], this.menuText[i][1], this.menuText[i][2]);
      canvas.strokeText(this.menuText[i][0], this.menuText[i][1], this.menuText[i][2])
    }
  }

  handlePlanetClicked(x, y) {
    const entities = this.entityManager.getEntities();
    let redPlanet = entities[0];
    let redPlanetRenderC = redPlanet.components[ComponentTypes.RENDERABLE];
    let redPlanetBoundBox = [redPlanetRenderC.posX, redPlanetRenderC.posX + 128, redPlanetRenderC.posY, redPlanetRenderC.posY + 128 ];

    let bluePlanet = entities[2];
    let bluePlanetRenderC = bluePlanet.components[ComponentTypes.RENDERABLE];
    let bluePlanetBoundBox = [bluePlanetRenderC.posX, bluePlanetRenderC.posX + 128, bluePlanetRenderC.posY, bluePlanetRenderC.posY + 128 ];

    let greenPlanet = entities[4];
    let greenPlanetRenderC = greenPlanet.components[ComponentTypes.RENDERABLE];
    let greenPlanetBoundBox = [greenPlanetRenderC.posX, greenPlanetRenderC.posX + 128, greenPlanetRenderC.posY, greenPlanetRenderC.posY + 128 ];

    let pinkPlanet = entities[6];
    let pinkPlanetRenderC = pinkPlanet.components[ComponentTypes.RENDERABLE];
    let pinkPlanetBoundBox = [pinkPlanetRenderC.posX, pinkPlanetRenderC.posX + 128, pinkPlanetRenderC.posY, pinkPlanetRenderC.posY + 128 ];

    if (x >= redPlanetBoundBox[0] && x <= redPlanetBoundBox[1] && y >= redPlanetBoundBox[2] && y <= redPlanetBoundBox[3]) {
      this.drawPlanetMenu(redPlanet);
    }
    else if (x >= greenPlanetBoundBox[0] && x <= greenPlanetBoundBox[1] && y >= greenPlanetBoundBox[2] && y <= greenPlanetBoundBox[3]) {
      this.drawPlanetMenu(greenPlanet);
    }
    else if (x >= bluePlanetBoundBox[0] && x <= bluePlanetBoundBox[1] && y >= bluePlanetBoundBox[2] && y <= bluePlanetBoundBox[3]) {
      this.drawPlanetMenu(bluePlanet);
    }
    else if (x >= pinkPlanetBoundBox[0] && x <= pinkPlanetBoundBox[1] && y >= pinkPlanetBoundBox[2] && y <= pinkPlanetBoundBox[3]) {
      this.drawPlanetMenu(pinkPlanet);
    }
    else {
      //no planet was clicked
    }
  }

  drawPlanetMenu(planet) {
  let p = planet.descriptor;
  let menu;
  let createLevels;
  let level1;
  let level2;

  switch(p) {
    case 'RedPlanet':
      menu = 'RedPlanetMenu';
      createLevels = false;
      level1 = true;
      level2 = false;
      break;
    case 'BluePlanet':
      menu = 'BluePlanetMenu';
      createLevels = false;
      level1 = true;
      level2 = false;
      break;
    case 'GreenPlanet':
      menu = 'GreenPlanetMenu';
      createLevels = false;
      level1 = true;
      level2 = true;
      break;
    case 'PinkPlanet':
      menu = 'PinkPlanetMenu';
      createLevels = true;
      level1 = false;
      level2 = false;
      break;
    default :
      break;
  }

    const planetMenu = Helper.generateEntity(menu, this.entityManager);
    const planetMenuRenderC = planetMenu.components[ComponentTypes.RENDERABLE];
    planetMenuRenderC.posX = window.innerWidth/2 -256;
    planetMenuRenderC.posY = window.innerHeight/2 -256;

    let canvas = document.getElementById('canvas').getContext('2d');
    canvas.font = "40px DistantGalaxy";
    canvas.fillStyle = 'yellow';


    if (createLevels) {
      this.menuText.push(['create a level', window.innerWidth/2 -175, window.innerHeight/2 ])
    }
    if (level1) {
      this.menuText.push(['level 1', window.innerWidth/2 -75, window.innerHeight/2 -50])
    }

    if (level2) {
      this.menuText.push(['level 2', window.innerWidth/2 -75, window.innerHeight/2 + 50])
    }



    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        planetMenu.remove();
        this.menuText = [];
      }
    });

  }


  update(planets) {
    this.drawMenuText();
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const lifeTimeC = entity.components[ComponentTypes.LIFE_TIME];
      const healthC = entity.components[ComponentTypes.HEALTH];
      const renderC = entity.components[ComponentTypes.RENDERABLE];
      const controllsC = entity.components[ComponentTypes.CONTROLABLE];

      if(controllsC) {
        if (controllsC.mouseState.leftClick) {
          this.handlePlanetClicked(window.mouseTracker.getLocation(0)['x'], window.mouseTracker.getLocation(0)['y']);

        }
      }

      if (lifeTimeC) {
        if (lifeTimeC.lifeTime === "animationCycle") {
          const animationC = entity.components[ComponentTypes.ANIMATED];
          if (animationC && !animationC.isAnimating) {
            entity.remove();
          }
        } else {
          if (new Date().getTime() - lifeTimeC.timeAlive > lifeTimeC.lifeTime) {
            entity.remove();
          }
        }
      }
      if (healthC) {
        if (
          healthC.currentHealth < 0 ||
          (renderC &&
            renderC.posY - canvas.height > this.cameraLimit.min.y * -1)
        ) {
          if (entity.descriptor === "Player") {
            this.killPlayer(entity);
          } else {
            entity.remove();
          }
        }
      }
    }

  }
}
