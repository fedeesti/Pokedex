import { fetchPokemon } from "../api/api.js";
import {
    mostrarDatos,
    mostrarHabilidades,
    mostrarTipos,
    borrarHabilidades,
    borrarTipos
} from "../ui/datos-modal.js"

const $modalContenedor = document.querySelector('.modal-contenedor');
const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

export function cargarModal() {
    document.addEventListener('click', e => {
        if(e.target.matches('#tablero > figure > img')) {
            e.preventDefault();
            let id = e.target.getAttribute('alt');
            fetchPokemon(`${URL_BASE}${id}`).then(pokemon => {
                borrarHabilidades();
                borrarTipos();
                mostrarDatos(pokemon);
                mostrarHabilidades(pokemon);
                mostrarTipos(pokemon);
            })
        $modalContenedor.style.display = 'block';
        }
    });
}

export function cerrarModal() {
    const $cerrarModal = document.querySelector('.cerrar-modal');

    $cerrarModal.addEventListener('click', () => {
        $modalContenedor.style.display = 'none';
    })
}