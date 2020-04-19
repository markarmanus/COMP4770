import ComponentTypes from "./../../../ComponentTypes";
import Helper from "../../../Helper";
export default class GuiS {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  drawPlanetMenu(planet) {
  let p = planet.descriptor;
  let menu;
  switch(p) {
    case 'RedPlanet':
      menu = 'RedPlanetMenu';
      break;
    case 'BluePlanet':
      menu = 'BluePlanetMenu';
      break;
    case 'GreenPlanet':
      menu = 'GreenPlanetMenu';
      break;
    case 'PinkPlanet':
      menu = 'PinkPlanetMenu';
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

    let redPlanet = planets[0];
    let redPlanetRenderC = redPlanet.components[ComponentTypes.RENDERABLE];
    let redPlanetPosition = [redPlanetRenderC.posX, redPlanetRenderC.posY];
    let redPlanetBoundBox = [redPlanetRenderC.posX, redPlanetRenderC.posX + 128, redPlanetRenderC.posY, redPlanetRenderC.posY + 128 ];

    let bluePlanet = planets[1];
    let bluePlanetRenderC = bluePlanet.components[ComponentTypes.RENDERABLE];
    let bluePlanetPosition = [bluePlanetRenderC.posX, bluePlanetRenderC.posY];
    let bluePlanetBoundBox = [bluePlanetRenderC.posX, bluePlanetRenderC.posX + 128, bluePlanetRenderC.posY, bluePlanetRenderC.posY + 128 ];

    let greenPlanet = planets[2];
    let greenPlanetRenderC = greenPlanet.components[ComponentTypes.RENDERABLE];
    let greenPlanetPosition = [greenPlanetRenderC.posX, greenPlanetRenderC.posY];
    let greenPlanetBoundBox = [greenPlanetRenderC.posX, greenPlanetRenderC.posX + 128, greenPlanetRenderC.posY, greenPlanetRenderC.posY + 128 ];

    let pinkPlanet = planets[3];
    let pinkPlanetRenderC = pinkPlanet.components[ComponentTypes.RENDERABLE];
    let pinkPlanetPosition = [pinkPlanetRenderC.posX, pinkPlanetRenderC.posY];
    let pinkPlanetBoundBox = [pinkPlanetRenderC.posX, pinkPlanetRenderC.posX + 128, pinkPlanetRenderC.posY, pinkPlanetRenderC.posY + 128 ];

    let canvas = document.getElementById('canvas');
    canvas.addEventListener("click", function(e) {
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
    }.bind(this), false);
  }
}
