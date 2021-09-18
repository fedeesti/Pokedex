import { mostrarPokemonCard } from "../ui/pokecard.js";
import { cambiarPagina } from "./paginador.js";
import { fetchPokemon } from "../api/api.js";

export async function cargarPokemon(url) {

    let api = await fetchPokemon(url);
        mostrarPokemonCard(api.results);
        cambiarPagina(api.previous, api.next);
}