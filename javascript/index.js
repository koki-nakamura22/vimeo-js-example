import * as vimeo from "./vimeo-api-practice.js";

window.onload = () => {
  let playerInformation = new vimeo.PlayerInformation("player", {
    playButtonId: "play-button",
    pauseButtonId: "pause-button",
    playPauseButtonId: "play-pause-button"
  });
  vimeo.settingPlayer(playerInformation);
};
