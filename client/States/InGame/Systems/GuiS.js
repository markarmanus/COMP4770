import ComponentTypes from "../../../ComponentTypes";
import Images from "../../../Assets/ImageGenerator";

export default class GuiS {
  constructor(scale, entityManager) {
    this.guiScale = scale;
    this.defaultPadding = {
      x: 30,
      y: 10,
    };
    this.canvasOffset = {};
    this.entityManager = entityManager;
  }
  updateCanvasOffset() {
    const canvasTransform = canvasContext.getTransform();
    this.canvasOffset = {
      x: canvasTransform.e,
      y: canvasTransform.f,
    };
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
  drawCurrency(currentCurrency, place, image, padding, currencyScale) {
    image.width = image.naturalWidth * this.guiScale * currencyScale;
    image.height = image.naturalHeight * this.guiScale * currencyScale;
    const imagePosX =
      place === "right"
        ? canvas.width - image.width - padding.x - 80
        : padding.x - 80;
    const imagePosY = padding.y;
    const textPosX = imagePosX + 80;
    const textPosY = imagePosY;
    canvasContext.drawImage(
      image,
      imagePosX - this.canvasOffset.x,
      imagePosY - this.canvasOffset.y,
      image.width,
      image.height
    );
    canvasContext.font = `${this.guiScale * currencyScale * 360}px serif`;
    canvasContext.fillStyle = "black";
    canvasContext.textBaseline = "top";
    canvasContext.fillText(
      currentCurrency,
      textPosX - this.canvasOffset.x,
      textPosY + image.height / 6 - this.canvasOffset.y
    );
  }
  update() {
    this.updateCanvasOffset();
    const entities = this.entityManager.getEntities();
    for (const entity of entities) {
      const healthC = entity.components[ComponentTypes.HEALTH];
      const focusC = entity.components[ComponentTypes.FOCUS];
      const currencyC = entity.components[ComponentTypes.CURRENCY];
      if (healthC || focusC || currencyC) {
        if (currencyC) {
          this.drawCurrency(
            currencyC.currentCurrency,
            currencyC.positionOnGUI,
            Images.currency,
            this.defaultPadding,
            0.3
          );
        }
        if (healthC) {
          const healthPrcnt =
            Math.max(healthC.currentHealth, 0) / healthC.maxHealth;
          if (healthC.folllowEntity) {
            this.drawSmallBar(
              Images.fullSmallHealthBar,
              Images.emptySmallHealthBar,
              0.5,
              healthPrcnt,
              entity
            );
          } else {
            const offset = 80;
            this.drawBar(
              Images.fullHealthBar,
              Images.emptyHealthBar,
              this.defaultPadding,
              offset,
              healthPrcnt,
              healthC.positionOnGUI
            );
          }
        }

        if (focusC) {
          const padding = {
            x: this.defaultPadding.x,
            y:
              Images.fullHealthBar.naturalHeight * this.guiScale +
              this.defaultPadding.y,
          };
          const focusPercent = focusC.currentFocus / focusC.maxFocus;
          const offset = 80;
          this.drawBar(
            Images.fullFocusBar,
            Images.emptyFocusBar,
            padding,
            offset,
            focusPercent,
            focusC.positionOnGUI
          );
        }
      }
    }
  }
}
