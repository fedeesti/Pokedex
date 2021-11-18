import {
    fetchPokemon as cargarPokemonAPI,
    fetchPokemones as cargarPokemonesAPI
} from "../api/api.js";

import {
    cargarPokemon as cargarPokemonLocalStorage,
    guardarPokemon as guardarPokemonLocalStorage
} from "../storage/storage.js";

import { mapearPokemon, mapearListadoPokemon } from '../mapeadores/mapeadores.js';

function obtenerKeyPokemon(id) {
    return `pokemon_${id}`;
}

function obtenerKeyPokemones(offset, limit) {
    return `pokemones_${offset}_${limit}`;
}

export async function cargarPokemon(id) {

    if (id === undefined) {
        throw new Error('Se necesita un id para cargar un pokemón');
    }

    let pokemon;
    let key = obtenerKeyPokemon(id);

    try {
        pokemon = cargarPokemonLocalStorage(key);
    } catch (e) {
        const pokemonData = await cargarPokemonAPI(id);
        pokemon = mapearPokemon(pokemonData);
        guardarPokemonLocalStorage(key, JSON.stringify(pokemon));
    }

    return pokemon;
}

export async function cargarPokemones(offset, limit) {
    let pokemones;
    let key = obtenerKeyPokemones(offset, limit);

    try {
        pokemones = cargarPokemonLocalStorage(key);
    } catch(e) {
        const pokemonesData = await cargarPokemonesAPI(offset, limit);
        pokemones = mapearListadoPokemon(pokemonesData);
        guardarPokemonLocalStorage(key, JSON.stringify(pokemones));
    }

    return pokemones;
}