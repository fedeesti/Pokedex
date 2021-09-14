import { cargarPokemon } from "./servicios/pokemon.js";
import { cargarModal, cerrarModal } from "./servicios/modal.js";

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

function iniciar() {
    cargarPokemon(URL_BASE);
    cargarModal();
    cerrarModal(URL_BASE);
}

iniciar();