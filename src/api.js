export function fetchPokemon(idPokemon) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        .then(respuesta => respuesta.json());
}