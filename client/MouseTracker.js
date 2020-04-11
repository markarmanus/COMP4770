export default class MouseTracker {
  constructor(interval, size) {
    this.indexOfLastRecording = -1;
    this.size = size;
    this.maxIndex = size - 1;
    this.mouseHistory = new Array(size).fill({ x: -100, y: -100 });
    this.timer = null;
    this.interval = interval;
    this.lastEvent = null;

    canvas.addEventListener("mousemove", (event) => {
      this.lastEvent = event;
      if (!this.timer) {
        this.timer = setInterval(() => {
          let rect = canvas.getBoundingClientRect();
          const canvasTransform = canvasContext.getTransform();
          const canvasOffset = {
            x: canvasTransform.e,
            y: canvasTransform.f,
          };
          let x = this.lastEvent.clientX - rect.left - canvasOffset.x;
          let y = this.lastEvent.clientY - rect.top - canvasOffset.y;
          let newIndex = (this.indexOfLastRecording + 1) % this.size;
          this.mouseHistory[newIndex] = { x, y };
          this.indexOfLastRecording = newIndex;
        }, this.interval);
      }
    });
  }
  // Retruns the location of the mouse at index, where i=0 is the latest location
  // and i=8 is the 9th latest location.
  getLocation(index) {
    let correctedIndex = index > this.maxIndex ? this.maxIndex : index;
    let actualIndex = this.indexOfLastRecording - correctedIndex;
    actualIndex = actualIndex < 0 ? actualIndex + this.size : actualIndex;
    return this.mouseHistory[actualIndex];
  }
  getMaxHistoryIndex() {
    return this.maxIndex;
  }
  isAtMouseLocation(x, y) {
    let lastMouseLocation = this.getLocation(0);
    return lastMouseLocation.x === x && lastMouseLocation.y === y;
  }
}
