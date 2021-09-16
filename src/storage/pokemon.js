export function cargarPokemon (url) {
    let pokemon;
    pokemon = JSON.parse(localStorage.getItem(`${url}`));

    if (pokemon === null) {
        throw new Error('No se encuentra en local storage');
    }

    return pokemon;
}

export function guardarPokemon (link, data) {
    return localStorage.setItem(link, data);
}