import { cargarPokemon } from "./servicios/servicios.js";
import { mostrarPokemonCard } from "./ui/pokecard.js";
import { mostrarModal, cerrarModal } from "./ui/modal.js";
import { cambiarPagina } from "./ui/paginador.js";

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

function iniciar() {
    cargarPagina(URL_BASE);
}

export async function cargarPagina(url) {
    let data = await cargarPokemon(url);

    mostrarPokemonCard(data.results);
    cambiarPagina(data.previous, data.next);
    mostrarModal();
    cerrarModal();
}

iniciar();