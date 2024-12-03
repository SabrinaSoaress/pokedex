const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const searchInput = document.querySelector('.searchInput');

const maxRecords = 151;
const limit = 26;
let offset = 0;

let allPokemons = []; 

// Função para converter um Pokémon em um item de lista HTML
function convertPokemonToLi(pokemon) {
    return `
       <li class="pokemon ${pokemon.type}"onClick="showdetalhesPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

// Função de busca de Pokémons com base no nome ou tipo
function searchPokemons(query) {
    const lowerCaseQuery = query.toLowerCase();
    const filteredPokemons = allPokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(lowerCaseQuery) || 
        pokemon.types.some(type => type.toLowerCase().includes(lowerCaseQuery))
    );

    // Exibe os Pokémons filtrados
    pokemonList.innerHTML = filteredPokemons.map(convertPokemonToLi).join('');
}

// Evento de input para pesquisa
searchInput.addEventListener('input', (Event) => {
    const query = Event.target.value.trim();
    if (query === '') {
        pokemonList.innerHTML = '';  
    } else {
        searchPokemons(query); 
    }
});

// Função para carregar Pokémons da API
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        allPokemons = [...allPokemons, ...pokemons];  
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;  
    });
}

// Carrega os primeiros Pokémons
loadPokemonItens(offset, limit);

// Evento para o botão "Carregar mais"
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton);  
    } else {
        loadPokemonItens(offset, limit);
    }
});