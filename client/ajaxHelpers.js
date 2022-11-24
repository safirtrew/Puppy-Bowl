import { renderAllPlayers } from "./renderHelpers";

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2207-FT-ET-WEB-PT";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

export const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}/players`);
    const result = await response.json();
    if (result.error) {
      throw result.error;
    }
    return result.data.players;
  } catch (error) {
    console.error("Uh oh, trouble fetching players!", error);
  }
};

export const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const result = await response.json();
    const data = result.data;
    console.log(result);
    return data.player;
  } catch (err) {
    console.error(err);
  }
};

export const addNewPlayer = async (playerObj) => {
  try {
    console.log(playerObj);
    const response = await fetch(`${APIURL}/players/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const removePlayer = async (playerId) => {
  fetch(`${APIURL}/players/${playerId}`, {
    method: "DELETE",
  });
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.error) throw result.error;
    console.log(result);
  } catch (err) {
    console.error(err);
  }
  let deleteButtons = [...document.getElementsByClassName("remove-button")];
  for (let i = 0; i < deleteButtons.length; i++) {
    const button = deleteButtons[i];
    button.addEventListener("click", async () => {
      await removePlayer(button.dataset.id);
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
    });
  }
};
