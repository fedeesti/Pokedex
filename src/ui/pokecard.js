import { fetchPokemon } from "../api/api.js";
import { ocultarSpinner } from "./spinner.js";

export async function mostrarPokemonCard (pokemones) {
    const $tablero = document.querySelector('#tablero');
    let $pokemonCard = '';

    for(let i = 0; i < pokemones.length; i++) {
        let pokemon = await fetchPokemon(pokemones[i].url);
        $pokemonCard += `
            <figure>
                <figcaption>${pokemon.name}</figcaption>
                <p>N° ${pokemon.id}</p>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
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