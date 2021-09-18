import { cargarPokemon } from "../servicios/servicios.js"

const $modalContenedor = document.querySelector('.modal-contenedor');
const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

export function mostrarModal () {
    document.addEventListener('click', async e => {
        if(e.target.matches('#tablero > figure > img')) {
            e.preventDefault();
            let id = `${URL_BASE}${e.target.getAttribute('alt')}`;
            let pokemon = await cargarPokemon(id);
                borrarHabilidades();
                borrarTipos();
                mostrarDatos(pokemon);
                mostrarHabilidades(pokemon);
                mostrarTipos(pokemon);
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

function mostrarDatos(pokemon) {
    const $nombre = document.querySelector('.nombre');
    const $id = document.querySelector('.id');
    const $img = document.querySelector('.img-pokemon');
    const $peso = document.querySelector('.peso');
    const $altura = document.querySelector('.altura');

    $nombre.textContent = (pokemon.name).toUpperCase();
    $id.textContent = `N° ${pokemon.id}`;
    $img.setAttribute('src', `${pokemon.sprites.front_default}`);
    $img.setAttribute('alt', `${pokemon.name}`);
    $peso.textContent = `${pokemon.weight} hg`;
    $altura.textContent = `${pokemon.height} dm`;
}

function mostrarHabilidades(pokemon) {
    const $habilidades = document.querySelector('.habilidades');

    for(let i=0;i<pokemon.abilities.length;i++) {
        let $habilidad = document.createElement('li');
        $habilidad.textContent = pokemon.abilities[i].ability.name;
        $habilidades.appendChild($habilidad);
    }
}

function mostrarTipos(pokemon) {
    const $tipos = document.querySelector('.tipos');

    for(let i=0;i<pokemon.types.length;i++) {
        let $tipo = document.createElement('strong');
        $tipo.textContent = pokemon.types[i].type.name;
        $tipo.classList.add(`${pokemon.types[i].type.name}`);
        $tipos.appendChild($tipo);
    }
}

function borrarTipos() {
    const $borrarTipos = document.querySelectorAll('.tipos strong');

    for(let i = 0; i < $borrarTipos.length; i++) {
        $borrarTipos[i].remove();
    }
}

function borrarHabilidades() {
    const $borrarHabilidades = document.querySelectorAll('.habilidades li');

    for(let i = 0; i < $borrarHabilidades.length; i++) {
        $borrarHabilidades[i].remove();
    }
}