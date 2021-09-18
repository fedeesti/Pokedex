import { fetchPokemon } from "../api/api.js";
import {
    cargarPokemon as cargarPokemonLocalStorage,
    guardarPokemon as guardarPokemonLocalStorage
} from "../storage/pokemon.js";

export async function cargarPokemon(url) {
    let pokemon;

    try {
        pokemon = cargarPokemonLocalStorage(url);
        console.log('local storage');
    } catch (e) {
        pokemon = await fetchPokemon(url);
        guardarPokemonLocalStorage(url, JSON.stringify(pokemon));
        console.log('fetch');
    }

    return pokemon;
}