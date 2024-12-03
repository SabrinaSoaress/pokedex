const overlay = document.getElementById("overlay");
const detalhesPokemon = document.getElementById("detalhesPokemon");
let currentPokemonId = 1;

function PokemonByID(pokemon) {
  return `
    <div class="modal ${pokemon.type}">
    <div class="top-detail">
      <span class="close" onclick="closedetalhesPokemon()"> &times; </span>
      <span class="favorite" onclick="salvarPokemon()"> 
        <img id="favoriteImage" src="/assets/imagens/favoriteIt.png" alt="salvar pokemon">
      </span>
    </div>

      <div class="top-nameType">

      <div class="number-name">
        <span class="top-name"> ${pokemon.name} </span>
        <span class="top-number"> #${pokemon.number} </span>
      </div>
        <ul> ${pokemon.types.map((type) => 
          `<li class="top-types ${type}">${type}</li>`).join("")}
        </ul>
      </div>
      
      <div class="info">
          <div class="photo">
            <img src="${pokemon.photo}" alt="${pokemon.name}"> 
          </div>
          
          <div class="about">
            <div class="title"> photo o ${pokemon.name} </div>
            <p>Altura: ${pokemon.altura}</p>
            <p>Peso: ${pokemon.peso}</p>
            
            <ul class="stats-container">
              <div class="title">Status</div>
              ${Object.entries(pokemon.stats).map(([statName]) => 
                `<li class='stats'>
                  <p>${statName}</p>
                  <p>${pokemon.stats[statName].base_stat}</p>
                  <span class='progress-bar dark'>
                    <span style="width: ${pokemon.stats[statName].base_stat > 100 ? 100 : pokemon.stats[statName].base_stat}%" class='progress ${pokemon.type}' />
                  </span>
                </li>`).join("")}
            </ul>
          </div>
        </div>
    </div>
  `;
}

const fade = [{ opacity: 0 }, { opacity: 1 }];

const fadeTiming = {
  duration: 350,
  iterations: 1,
};
let animation;
let visible = false;

function fadeActivate() {
  animation = detalhesPokemon.animate(fade, fadeTiming);
}

function showdetalhesPokemon(pokemonId) {
  if (!visible) {
    fadeActivate();
    visible = true;
    pokeApi.getPokemonByID(pokemonId).then((data) => {
      currentPokemonId = pokemonId;
      const singlePokemon = PokemonByID(data);
      Modal(singlePokemon);
    });
    if (visible) {
      overlay.addEventListener("click", () => {
        closedetalhesPokemon();
      });
    }
  }
}

function Modal(singlePokemon) {
  overlay.style.display = "block";
  detalhesPokemon.style.display = "block";
  detalhesPokemon.innerHTML = singlePokemon;
}

function closedetalhesPokemon() {
  if (visible) {
    animation.reverse();
    animation.addEventListener("finish", function () {
      overlay.style.display = "none";
      detalhesPokemon.style.display = "none";
    });
    visible = false;
  }
}

function fetchPokemonById(pokemonId) {
  return pokeApi.getPokemonByID(pokemonId);
}

function showdetalhesPokemonById(pokemonId) {
  fetchPokemonById(pokemonId).then((data) => {
    const singlePokemon = PokemonByID(data);
    Modal(singlePokemon);
  });
}

function salvarPokemon() {
  alert("Pokemon salvo!");

  var img = document.getElementById("favoriteImage");
  img.src = "/assets/imagens/favorite.png";
}