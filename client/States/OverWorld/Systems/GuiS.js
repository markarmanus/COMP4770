import ComponentTypes from "./../../../ComponentTypes";
import Helper from "../../../Helper";
export default class GuiS {
  constructor(entityManager) {
    this.entityManager = entityManager;

    window.addEventListener("click", function(e) {
      this.handlePlanetClicked(e)
    }.bind(this), false);
  }

  handlePlanetClicked(e) {
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

    if (e.clientX >= redPlanetBoundBox[0] && e.clientX <= redPlanetBoundBox[1] && e.clientY >= redPlanetBoundBox[2] && e.clientY <= redPlanetBoundBox[3]) {
      this.drawPlanetMenu(redPlanet);
    }
    else if (e.clientX >= greenPlanetBoundBox[0] && e.clientX <= greenPlanetBoundBox[1] && e.clientY >= greenPlanetBoundBox[2] && e.clientY <= greenPlanetBoundBox[3]) {
      this.drawPlanetMenu(greenPlanet);
    }
    else if (e.clientX >= bluePlanetBoundBox[0] && e.clientX <= bluePlanetBoundBox[1] && e.clientY >= bluePlanetBoundBox[2] && e.clientY <= bluePlanetBoundBox[3]) {
      this.drawPlanetMenu(bluePlanet);
    }
    else if (e.clientX >= pinkPlanetBoundBox[0] && e.clientX <= pinkPlanetBoundBox[1] && e.clientY >= pinkPlanetBoundBox[2] && e.clientY <= pinkPlanetBoundBox[3]) {
      this.drawPlanetMenu(pinkPlanet);
    }
  }

  drawPlanetMenu(planet) {
  let p = planet.descriptor;
  let menu;
  let createLevels;
  let editLevels;
  let playLevels;
  switch(p) {
    case 'RedPlanet':
      menu = 'RedPlanetMenu';
      createLevels = false;
      editLevels = false;
      playLevels = true;
      break;
    case 'BluePlanet':
      menu = 'BluePlanetMenu';
      createLevels = false;
      editLevels = false;
      playLevels = true;
      break;
    case 'GreenPlanet':
      menu = 'GreenPlanetMenu';
      createLevels = false;
      editLevels = false;
      playLevels = true;
      break;
    case 'PinkPlanet':
      menu = 'PinkPlanetMenu';
      createLevels = true;
      editLevels = true;
      playLevels = false;
      break;
    default :
      break;
  }

    const planetMenu = Helper.generateEntity(menu, this.entityManager);
    const planetMenuRenderC = planetMenu.components[ComponentTypes.RENDERABLE];
    planetMenuRenderC.posX = window.innerWidth/2 -256;
    planetMenuRenderC.posY = window.innerHeight/2 - 256;



    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        planetMenu.remove();
      }
    });



  }


  update(planets) {
    const p = planets;
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const lifeTimeC = entity.components[ComponentTypes.LIFE_TIME];
      const healthC = entity.components[ComponentTypes.HEALTH];
      const renderC = entity.components[ComponentTypes.RENDERABLE];

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
