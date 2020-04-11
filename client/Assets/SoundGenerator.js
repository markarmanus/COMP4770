const createSound = (src) => {
  let sound = document.createElement("audio");
  sound.src = src;
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  sound.muted = false;
  sound.onended = () => {
    sound.parentNode.removeChild(sound);
  };
  document.body.appendChild(sound);
  return sound;
};
const Sounds = {
  explosion: () => createSound("./Sounds/explosion.mp3"),
};

export default Sounds;
