import { ocultarSpinner } from "./spinner.js";
import { cargarPokemon } from "../servicios/servicios.js";

export async function mostrarPokemonCard (pokemones) {
    const $tablero = document.querySelector('#tablero');

    let $pokemonCard = '';

    for(let i = 0; i < pokemones.length; i++) {
        const pokemon = await cargarPokemon(pokemones[i].name);
        $pokemonCard += `
            <figure>
                <figcaption>${pokemon.name}</figcaption>
                <p>N° ${pokemon.id}</p>
                <img src="${pokemon.fotoPrincipal}" alt="${pokemon.name}">
            </figure>
        `
    }

    ocultarSpinner();
    $tablero.innerHTML = $pokemonCard;
}

export function eliminarPokemones () {
    let $eliminarFigure = document.querySelectorAll('figure');

    for(let i = 0; i < $eliminarFigure.length; i++) {
            $eliminarFigure[i].remove();
    }
}