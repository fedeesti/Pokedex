import {
    fetchPokemon as cargarPokemonAPI,
    fetchPokemones as cargarPokemonesAPI
} from "../api/api.js";

import {
    cargarPokemon as cargarPokemonLocalStorage,
    guardarPokemon as guardarPokemonLocalStorage
} from "../storage/storage.js";

export async function cargarPokemon(id) {

    if (id === undefined) {
        throw new Error('Se necesita un id para cargar un pokemón');
    }

    let pokemon;
    let key = obtenerKeyPokemon(id);

    try {
        pokemon = cargarPokemonLocalStorage(key);
        console.log('local storage');
    } catch (e) {
        pokemon = await cargarPokemonAPI(id);
        guardarPokemonLocalStorage(key, JSON.stringify(pokemon));
        console.log('fetch');
    }

    return pokemon;
}

export async function cargarPokemones(offset, limit) {
    let pokemones;
    let key = obtenerKeyPokemones(offset, limit);

    try {
        pokemones = cargarPokemonLocalStorage(key);
        console.log('local storage');
    } catch(e) {
        pokemones = await cargarPokemonesAPI(offset, limit);
        guardarPokemonLocalStorage(key, JSON.stringify(pokemones));
        console.log('fetch');
    }

    return pokemones;
}

function obtenerKeyPokemon(id) {
    return `pokemon_${id}`;
}

function obtenerKeyPokemones(offset, limit) {
    return `pokemones_${offset}_${limit}`;
}