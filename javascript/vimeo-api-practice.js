let tag = document.createElement("script");
tag.src = "https://player.vimeo.com/api/player.js";
document.getElementsByTagName("head")[0].appendChild(tag);

export function settingPlayer(playerInformation) {
  if (playerInformation instanceof Array) {
    playerInformation.forEach(element => {
      if (!element instanceof PlayerInformation)
        throw new TypeError("playerInformation array is invalid.");
      settingEachPlayerInformation(element);
    });
  } else {
    settingEachPlayerInformation(playerInformation);
  }

  function settingEachPlayerInformation(eachPlayerInformation) {
    let iframe = document.getElementById(eachPlayerInformation.playerId);
    let player = new Vimeo.Player(iframe);
    document
      .getElementById(eachPlayerInformation.playButtonId)
      .addEventListener("click", event => {
        player.play();
      });
    document
      .getElementById(eachPlayerInformation.pauseButtonId)
      .addEventListener("click", event => {
        player.pause();
      });
    document
      .getElementById(eachPlayerInformation.playPauseButtonId)
      .addEventListener("click", event => {
        player.getPaused().then(paused => {
          paused ? player.play() : player.pause();
        });
      });
  }
}

export class PlayerInformation {
  constructor(playerId, buttonIds) {
    if (!playerId) throw new TypeError("playerId is null.");
    this.playerId = playerId;

    if (!buttonIds) throw new TypeError("buttonIds is null.");
    if (buttonIds.playButtonId) {
      if (!this.existsById(buttonIds.playButtonId))
        throw new TypeError("Not found the play button.");
      this.playButtonId = buttonIds.playButtonId;
    }
    if (buttonIds.pauseButtonId) {
      if (!this.existsById(buttonIds.pauseButtonId))
        throw new TypeError("Not found the pause button.");
      this.pauseButtonId = buttonIds.pauseButtonId;
    }
    if (buttonIds.playPauseButtonId) {
      if (!this.existsById(buttonIds.playPauseButtonId))
        throw new TypeError("Not found the play and pause button.");
      this.playPauseButtonId = buttonIds.playPauseButtonId;
    }
  }

  existsById(id) {
    return document.getElementById(id) ? true : false;
  }
}
