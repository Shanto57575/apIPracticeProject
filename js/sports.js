const loadPlayer = () => {
  const getPlayer = document.getElementById('playerName').value;
  document.getElementById('playerAllDetails').innerHTML = '';
  document.getElementById('playerName').value = '';
  document.getElementById('male').classList.add('d-none');
  document.getElementById('female').classList.add('d-none');
  //spinner
  document.getElementById('spinner').classList.remove('d-none');
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${getPlayer}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      showPlayers(data.player)
    })
}

const showPlayers = (players) => {
  document.getElementById('spinner').classList.add('d-none');
  const getAllPlayer = document.getElementById('showAllPlayer');
  getAllPlayer.innerHTML = ' ';

  if(players === null){
    getAllPlayer.innerHTML = `
    <h1 class="text-danger">No player found with this name</h1>
    `;
    return;
  }
  players.forEach(player => {
    console.log(player);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-75">
           <img class="img-fluid h-75" src="${player.strThumb ? player.strThumb : 'https://loremflickr.com/320/240'}" class="card-img-top" alt="...">
          <div class="card-body shadow p-3 mb-5 bg-body-tertiary rounded">
            <h6>${player.strPlayer}</h6>
            <button onclick="playerDetails('${player.idPlayer}')" class="btn btn-primary" type="button">Details</button>
          </div>
        </div>
    `
    getAllPlayer.appendChild(div);
  });
}

const playerDetails = (playerId) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`
  fetch(url)
    .then(res => res.json())
    .then(result => showDetails(result.players[0]))
}

const showDetails = (details) => {
  console.log(details);
  const { strNationality, strBirthLocation, strDescriptionEN } = details;//destructuring
  const getDetails = document.getElementById('playerAllDetails');
  const div = document.createElement('div');
  console.log(details.strGender);
  if (details.strGender === "Male") {
    document.getElementById('male').classList.remove('d-none');
  }
  else {
    document.getElementById('female').classList.remove('d-none');
  }
  div.innerHTML = `
  <div class="card mb-3" style="h-100 w-100">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${details.strThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title text-black">${details.strNationality}</h5>
        <h6>${strNationality}</h6>
        <h6>${strBirthLocation}</h6>
        <h6>${strDescriptionEN.slice(0, 150) + "..."}</h6>
      </div>
    </div>
  </div>
</div>
  `
  getDetails.appendChild(div);
}