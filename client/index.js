import { fetchAllPlayers, removePlayer } from "./ajaxHelpers";
import { renderAllPlayers, renderNewPlayerForm } from "./renderHelpers";

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
