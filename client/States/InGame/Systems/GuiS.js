import ComponentTypes from "../../../ComponentTypes";
import Images from "../../../Assets/ImageGenerator";
import Helper from "../../../Helper";
import Messages from "../../../Configuration/Messages";
export default class GuiS {
  constructor(scale, entityManager, onEndLevel, togglePause, level) {
    this.guiScale = scale;
    this.defaultPadding = {
      x: 30,
      y: 10,
    };
    this.canvasOffset = {};
    this.entityManager = entityManager;
    this.pauseMenu = [];
    this.onEndLevel = onEndLevel;
    this.togglePause = togglePause;
    this.pickUpGuiSize = 64;
    this.level = level;
    this.drawingScroll;
    this.pickUps = [];
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && this.drawingScroll) {
        this.onEndLevel();
      }
    });
    canvas.addEvent;
  }
  updateCanvasOffset() {
    this.canvasOffset = Helper.getCanvasOffset();
  }
  drawSmallBar(fullBar, emptyBar, barScale, percent, entity) {
    let scale = this.guiScale * barScale;
    fullBar.width = fullBar.naturalWidth * scale;
    fullBar.height = fullBar.naturalHeight * scale;
    emptyBar.width = emptyBar.naturalWidth * scale;
    emptyBar.height = emptyBar.naturalHeight * scale;
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    let entityCenterPoint = {
      x: renderC.posX + renderC.scaledWidth / 2,
      y: renderC.posY,
    };
    const posX = entityCenterPoint.x - fullBar.width / 2;
    const posY = entityCenterPoint.y - fullBar.height / 2;
    canvasContext.drawImage(
      emptyBar,
      posX,
      posY,
      emptyBar.width,
      emptyBar.height
    );

    canvasContext.drawImage(
      fullBar,
      0,
      0,
      percent * fullBar.naturalWidth,
      fullBar.naturalHeight,
      posX,
      posY,
      fullBar.width * percent,
      fullBar.height
    );
  }
  drawBar(fullBar, emptyBar, padding, offset, percent, place, entity) {
    fullBar.width = fullBar.naturalWidth * this.guiScale;
    fullBar.height = fullBar.naturalHeight * this.guiScale;
    emptyBar.width = emptyBar.naturalWidth * this.guiScale;
    emptyBar.height = emptyBar.naturalHeight * this.guiScale;
    let posX =
      place === "right" ? canvas.width - fullBar.width - padding.x : padding.x;
    let posY = padding.y;
    canvasContext.drawImage(
      emptyBar,
      posX - this.canvasOffset.x,
      posY - this.canvasOffset.y,
      emptyBar.width,
      emptyBar.height
    );
    canvasContext.drawImage(
      fullBar,
      offset,
      0,
      percent * (fullBar.naturalWidth - offset),
      fullBar.naturalHeight,
      posX + offset * this.guiScale - this.canvasOffset.x,
      posY - this.canvasOffset.y,
      (fullBar.width - offset * this.guiScale) * percent,
      fullBar.height
    );
  }
  drawCurrency(
    currentCurrency,
    place,
    image,
    padding,
    currencyScale,
    fontScale
  ) {
    image.width = image.naturalWidth * this.guiScale * currencyScale;
    image.height = image.naturalHeight * this.guiScale * currencyScale;
    const imagePosX =
      place === "right"
        ? canvas.width - image.width - padding.x - 80
        : padding.x - 80;
    const imagePosY = padding.y;
    const textPosX = imagePosX + 100;
    const textPosY = imagePosY;
    canvasContext.drawImage(
      image,
      imagePosX - this.canvasOffset.x,
      imagePosY - this.canvasOffset.y,
      image.width,
      image.height
    );
    canvasContext.font = `${this.guiScale * fontScale * 360}px serif`;
    canvasContext.fillStyle = "black";
    canvasContext.textBaseline = "top";
    canvasContext.fillText(
      currentCurrency,
      textPosX - this.canvasOffset.x,
      textPosY + image.height / 6 - this.canvasOffset.y
    );
  }
  drawScroll() {
    this.togglePause(true);
    if (!this.drawingScroll) {
      const scroll = Helper.generateEntity("MessageScroll", this.entityManager);
      const renderC = scroll.components[ComponentTypes.RENDERABLE];
      renderC.posX =
        canvas.width / 2 - renderC.scaledWidth / 2 - this.canvasOffset.x;
      renderC.posY =
        canvas.height / 2 - renderC.scaledHeight / 2 - this.canvasOffset.y;
      this.drawingScroll = scroll;
    } else {
      const renderC = this.drawingScroll.components[ComponentTypes.RENDERABLE];
      canvasContext.font = "30px Arial";
      const messages = Messages[this.level.data.planet];
      for (let i = 0; i < messages.length; i++) {
        canvasContext.fillText(
          messages[i],
          renderC.posX + 200,
          renderC.posY + 250 + 100 * i
        );
      }
      canvasContext.fillText(
        "Press Enter",
        renderC.posX + renderC.scaledWidth / 2 - 100,
        renderC.posY + renderC.scaledHeight - 250
      );
    }
  }
  drawPauseScreen() {
    if (!this.pauseMenu.length > 0) {
      const pauseMenu = Helper.generateEntity("PauseMenu", this.entityManager);
      const pauseRenderC = pauseMenu.components[ComponentTypes.RENDERABLE];
      pauseRenderC.posX =
        canvas.width / 2 -
        Helper.getCanvasOffset().x -
        pauseRenderC.scaledWidth / 2;
      pauseRenderC.posY =
        canvas.height / 2 -
        Helper.getCanvasOffset().y -
        pauseRenderC.scaledHeight / 2;
      const continueItem = Helper.generateEntity(
        "ContinueMenuItem",
        this.entityManager
      );
      const exit = Helper.generateEntity("ExitMenuItem", this.entityManager);
      const continueRenderC =
        continueItem.components[ComponentTypes.RENDERABLE];
      const exitRenderC = exit.components[ComponentTypes.RENDERABLE];
      continueRenderC.posX =
        pauseRenderC.posX +
        pauseRenderC.scaledWidth / 2 -
        continueRenderC.scaledWidth / 2;
      continueRenderC.posY = pauseRenderC.posY + 220;
      exitRenderC.posX =
        pauseRenderC.posX +
        pauseRenderC.scaledWidth / 2 -
        exitRenderC.scaledWidth / 2;
      exitRenderC.posY = continueRenderC.posY + 80;
      this.pauseMenu.push(
        { entity: pauseMenu },
        { entity: exit, handler: this.onEndLevel },
        { entity: continueItem, handler: this.togglePause }
      );
    }
  }
  checkForClicks(controllsC) {
    if (controllsC.mouseState.leftClick) {
      const lastMousePosition = window.mouseTracker.getLocation(0);
      for (const menuItem of this.pauseMenu) {
        const renderC = menuItem.entity.components[ComponentTypes.RENDERABLE];
        const isClicked =
          renderC.posX < lastMousePosition.x &&
          renderC.posX + renderC.scaledWidth > lastMousePosition.x &&
          renderC.posY < lastMousePosition.y &&
          renderC.posY + renderC.scaledHeight > lastMousePosition.y;
        if (isClicked && menuItem.handler !== undefined) menuItem.handler();
      }
    }
  }
  getTimerEntity(size) {
    const timer = Helper.generateEntity("Timer", this.entityManager);
    const renderC = timer.components[ComponentTypes.RENDERABLE];
    renderC.scaledWidth = size;
    renderC.scaledHeight = size;
    return timer;
  }
  drawPickUps() {
    const margin = 10;
    let newPickUps = [];
    for (let i = 0; i < this.pickUps.length; i++) {
      const pickUp = this.pickUps[i].pickUp;
      const timer = this.pickUps[i].timer;
      if (pickUp && pickUp.active) {
        newPickUps.push({
          pickUp,
          timer,
        });
      }
      const pickUpRenderC = pickUp.components[ComponentTypes.RENDERABLE];
      const timerRenderC = timer.components[ComponentTypes.RENDERABLE];
      const position = {
        x: 280 + i * this.pickUpGuiSize + margin * i - this.canvasOffset.x,
        y: this.defaultPadding.y + 20 - this.canvasOffset.y,
      };
      pickUpRenderC.posX = position.x + this.pickUpGuiSize / 4;
      pickUpRenderC.posY = position.y + this.pickUpGuiSize / 4;
      timerRenderC.posX = position.x;
      timerRenderC.posY = position.y;
      this.pickUps = newPickUps;
    }
  }
  createPickUpTimer(entity) {
    const pickUpC = entity.components[ComponentTypes.PICK_UP];
    const renderC = entity.components[ComponentTypes.RENDERABLE];
    const timer = this.getTimerEntity(this.pickUpGuiSize);
    const timerAnimationC = timer.components[ComponentTypes.ANIMATED];
    renderC.scaledWidth = this.pickUpGuiSize / 2;
    renderC.scaledHeight = this.pickUpGuiSize / 2;
    renderC.shouldRender = true;

    timerAnimationC.repeat = false;
    timerAnimationC.animationSpeed =
      pickUpC.lifeTime / timerAnimationC.spritesCount;
    this.pickUps.push({ pickUp: entity, timer });
    pickUpC.drewGuiTimer = true;
  }
  updatePickUpArray() {
    let newArray = [];
    for (const pickUp of this.pickUps) {
      if (pickUp && pickUp.isActive) {
        newArray.push(entity);
      }
    }
    this.pickUps = newArray;
  }
  update(isPaused) {
    if (this.drawingScroll) this.drawScroll();
    this.drawPickUps();
    this.updateCanvasOffset();
    if (isPaused && !this.drawingScroll) {
      this.drawPauseScreen();
    } else {
      while (this.pauseMenu.length > 0) {
        const menuItem = this.pauseMenu.pop();
        menuItem.entity.remove();
      }
    }
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const healthC = entity.components[ComponentTypes.HEALTH];
      const focusC = entity.components[ComponentTypes.FOCUS];
      const currencyC = entity.components[ComponentTypes.CURRENCY];
      const controllsC = entity.components[ComponentTypes.CONTROLABLE];
      const pickUpC = entity.components[ComponentTypes.PICK_UP];
      if (controllsC) this.checkForClicks(controllsC);
      if (pickUpC) {
        if (entity.descriptor === "Scroll" && pickUpC.wasPickedUp) {
          this.drawScroll();
        } else if (
          pickUpC.wasPickedUp &&
          pickUpC.lifeTime &&
          !pickUpC.drewGuiTimer
        ) {
          this.createPickUpTimer(entity);
        }
      }
      if (currencyC && !this.drawingScroll) {
        this.drawCurrency(
          currencyC.currentCurrency,
          currencyC.positionOnGUI,
          Images.CurrencyImage,
          this.defaultPadding,
          3,
          0.3
        );
      }
      if (healthC && !this.drawingScroll) {
        const healthPrcnt =
          Math.max(healthC.currentHealth, 0) / healthC.maxHealth;
        if (healthC.folllowEntity) {
          this.drawSmallBar(
            Images.FullSmallHealthBar,
            Images.EmptySmallHealthBar,
            0.5,
            healthPrcnt,
            entity
          );
        } else {
          const offset = 80;
          this.drawBar(
            Images.FullHealthBar,
            Images.EmptyHealthBar,
            this.defaultPadding,
            offset,
            healthPrcnt,
            healthC.positionOnGUI
          );
        }
      }
      if (focusC && !this.drawingScroll) {
        const padding = {
          x: this.defaultPadding.x,
          y:
            Images.FullHealthBar.naturalHeight * this.guiScale +
            this.defaultPadding.y,
        };
        const focusPercent = focusC.currentFocus / focusC.maxFocus;
        const offset = 80;
        this.drawBar(
          Images.FullFocusBar,
          Images.EmptyFocusBar,
          padding,
          offset,
          focusPercent,
          focusC.positionOnGUI
        );
      }
    }
  }
}
