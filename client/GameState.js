import EntityManager from "./EntityManager";

export default class GameState {
  constructor() {
    this.entityManager = new EntityManager();
  }

  update() {
    // this should call all the relevant systems in the gamestate
    this.entityManager.update();
  }
}
