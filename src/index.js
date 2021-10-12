import { cargarPokemones, cargarPokemon } from "./servicios/servicios.js";
import { mostrarPokemonCard } from "./ui/pokecard.js";
import { mostrarModal, cerrarModal } from "./ui/modal.js";
import { cambiarPagina } from "./ui/paginador.js";

async function cargarPagina(pagina) {

    const POKEMONES_POR_PAGINA = 20;
    let offset = pagina * POKEMONES_POR_PAGINA;
    let limit = POKEMONES_POR_PAGINA;

    const listadoPokemones = await cargarPokemones(offset, limit);

    mostrarPokemonCard(listadoPokemones.results);
    cambiarPagina(listadoPokemones.previous, listadoPokemones.next,cargarPagina);
    mostrarModal();
    cerrarModal();
}

iniciar();

export function iniciar() {
    cargarPagina(0);
}