import { cargarPokemon } from "./pokemon.js";
import { eliminarPokemones } from "../ui/pokecard.js";
import { crearSpinner } from "../ui/spinner.js";

const $paginador = document.querySelector('.paginador');
let $anteriorLink, $siguienteLink;
const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

export function cambiarPagina(anterior, siguiente) {
    $anteriorLink = anterior ? `<a href="${anterior}">&larr; Anterior</a>` : '';
    $siguienteLink = siguiente ? `<a href="${siguiente}">Siguiente &rarr;</a>` : '';
    $paginador.innerHTML = $anteriorLink + ' ' + $siguienteLink;

    document.addEventListener('click', e => {
        if(e.target.matches('.paginador a')) {
            e.preventDefault();
            eliminarPokemones();
            crearSpinner();
            cargarPokemon(e.target.getAttribute('href'));
        }

       if(e.target.matches('.titulo')) {
            e.preventDefault();
            eliminarPokemones();
            crearSpinner();
            cargarPokemon(URL_BASE);
        }
    })
}