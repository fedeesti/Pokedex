const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/'

export function fetchPokemon(nombre) {
    return fetch(`${URL_BASE}${nombre}`).then(res => res.json());
}

export function fetchPokemones(offset, limit) {
    return fetch(`${URL_BASE}?offset=${offset}&limit=${limit}`).then(res=>res.json());
}