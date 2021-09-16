import { fetchPokemon } from "../api/api.js";
import { mostrarModal } from "../ui/modal.js";
import {
    cargarPokemon as cargarPokemonLocalStorage,
    guardarPokemon as guardarPokemonLocalStorage
} from "../storage/pokemon.js";

const $modalContenedor = document.querySelector('.modal-contenedor');
const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

export function cargarModal() {
    let pokemonID;
    document.addEventListener('click', async e => {
        if(e.target.matches('#tablero > figure > img')) {
            e.preventDefault();
            let id = `${URL_BASE}${e.target.getAttribute('alt')}`;

            try {
                pokemonID = cargarPokemonLocalStorage(id);
                console.log('local storage');
            } catch (e) {
                pokemonID = await fetchPokemon(id);
                guardarPokemonLocalStorage(id, JSON.stringify(pokemonID));
                console.log('fetch');
            }

        mostrarModal(pokemonID);
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