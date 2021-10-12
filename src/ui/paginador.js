import { eliminarPokemones } from "./pokecard.js";
import { crearSpinner } from "./spinner.js";

const $paginador = document.querySelector('.paginador');
let $anteriorLink, $siguienteLink;

export function cambiarPagina(anterior, siguiente, callbackCargarPagina) {
    $anteriorLink = anterior ? `<a href="${anterior}" class="anterior">&larr; Anterior</a>` : '';
    $siguienteLink = siguiente ? `<a href="${siguiente}" class="siguiente">Siguiente &rarr;</a>` : '';
    $paginador.innerHTML = $anteriorLink + ' ' + $siguienteLink;

    document.addEventListener('click', e => {
        if(e.target.matches('.paginador a')) {
            e.preventDefault();
            eliminarPokemones();
            crearSpinner();
            callbackCargarPagina(obtenerNumeroDePagina(e.target.getAttribute('href')));
        }

       if(e.target.matches('.titulo')) {
            e.preventDefault();
            eliminarPokemones();
            crearSpinner();
            callbackCargarPagina(0);
        }
    })
}

function obtenerNumeroDePagina(url) {
    let offset;
    let limit;
    try {
      offset = /offset=([0-9]+)/gi.exec(url).pop();
      limit = /limit=([0-9]+)/gi.exec(url).pop();
    } catch (e) {
      offset = undefined;
      limit = undefined;
    }
    let pagina = offset / limit;

    return pagina;
  }