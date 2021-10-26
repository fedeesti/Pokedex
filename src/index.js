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
    setupModalHanlder();
}

function setupModalHanlder() {
    document.addEventListener('click', async e => {
        if(e.target.matches('#tablero > figure > img')) {
            e.preventDefault();
            let id = e.target.getAttribute('alt');
            let pokemon = await cargarPokemon(id);
            mostrarModal(pokemon);
        }
    });
    cerrarModal();
}

iniciar();

export function iniciar() {
    cargarPagina(0);
}