
export function fetchPokemon(url) {
    return fetch(`${url}`).then(res => res.json())
}