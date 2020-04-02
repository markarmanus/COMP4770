import ComponentTypes from "../../../ComponentTypes";
import Images from "../../../Assets/Images";

export default class GuiS {
  constructor(scale) {
    this.scale = scale;
    this.defaultPadding = {
      x: 30,
      y: 10
    };
    this.canvasOffset = {};
  }
  updateCanvasOffset() {
    const canvasTransform = canvasContext.getTransform();
    this.canvasOffset = {
      x: canvasTransform.e,
      y: canvasTransform.f
    };
  }
  drawBar(fullBar, emptyBar, padding, offset, percent, place) {
    fullBar.width = fullBar.naturalWidth * this.scale;
    fullBar.height = fullBar.naturalHeight * this.scale;
    emptyBar.width = emptyBar.naturalWidth * this.scale;
    emptyBar.height = emptyBar.naturalHeight * this.scale;
    const posX =
      place === "right" ? canvas.width - fullBar.width - padding.x : padding.x;
    const posY = padding.y;
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
      posX + offset * this.scale - this.canvasOffset.x,
      posY - this.canvasOffset.y,
      (fullBar.width - offset * this.scale) * percent,
      fullBar.height
    );
  }
  drawCurrency(currentCurrency, place, image, padding, currencyScale) {
    image.width = image.naturalWidth * this.scale * currencyScale;
    image.height = image.naturalHeight * this.scale * currencyScale;
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
    canvasContext.font = `${this.scale * currencyScale * 360}px serif`;
    canvasContext.fillStyle = "black";
    canvasContext.textBaseline = "top";
    canvasContext.fillText(
      currentCurrency,
      textPosX - this.canvasOffset.x,
      textPosY + image.height / 6 - this.canvasOffset.y
    );
  }
  update(entityManager) {
    this.updateCanvasOffset();
    const entities = entityManager.getEntities();
    for (const entity of entities) {
      if (
        entity.components[ComponentTypes.HEALTH] ||
        entity.components[ComponentTypes.FOCUS] ||
        entity.components[ComponentTypes.CURRENCY]
      ) {
        const healthC = entity.components[ComponentTypes.HEALTH];
        const focusC = entity.components[ComponentTypes.FOCUS];
        const currencyC = entity.components[ComponentTypes.CURRENCY];
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
          const healthPrcnt = healthC.currentHealth / healthC.maxHealth;
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

        if (focusC) {
          const padding = {
            x: this.defaultPadding.x,
            y:
              Images.fullHealthBar.naturalHeight * this.scale +
              this.defaultPadding.y
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
