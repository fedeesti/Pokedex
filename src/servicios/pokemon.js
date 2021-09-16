import { mostrarPokemonCard } from "../ui/pokecard.js";
import { cambiarPagina } from "./paginador.js";
import { fetchPokemon } from "../api/api.js";
import {
    cargarPokemon as cargarPokemonLocalStorage,
    guardarPokemon as guardarPokemonLocalStorage
} from "../storage/pokemon.js";

export async function cargarPokemon(url) {
    let pokemones;

    try {
        pokemones = cargarPokemonLocalStorage(url);
        console.log('local storage');
    } catch (e) {
        pokemones = await fetchPokemon(url);
        guardarPokemonLocalStorage(url, JSON.stringify(pokemones));
        console.log('fetch');
    }

        mostrarPokemonCard(pokemones.results);
        cambiarPagina(pokemones.previous, pokemones.next);
}