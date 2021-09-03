import { fetchPokemon } from "./api.js";

const $siguiente = document.querySelector('.siguiente');
const $anterior = document.querySelector('.anterior');
const $tituloPokedex = document.querySelector('.titulo-pokedex');
const $modalContenedor = document.querySelector('.modal-contenedor');

const TOTAL_POKEMONES = 20;
let idPokemon = 1;
let contadorClick = 0;
let contadorPokemones = 0;

export async function cargarPokemones() {
    const pokemonAPI = await fetchPokemon(idPokemon);

    if(contadorPokemones < TOTAL_POKEMONES) {
        mostrarPokemones(pokemonAPI);
        contadorPokemones++;
        bloquearPaginacion();
    }
}

export function mostrarPokemones(pokemon) {
    const $tablero = document.querySelector('#tablero');

    const $figure = document.createElement('figure');
    const $img = document.createElement('img');
    $img.setAttribute('src', `${pokemon.sprites.front_default}`);
    $img.setAttribute('alt', `${pokemon.name}`);
    const $figcaptionName = document.createElement('figcaption');
    const $figcaptionId = document.createElement('figcaption');
    $figcaptionName.textContent = pokemon.name;
    $figcaptionId.textContent = `Nº ${pokemon.id}`;
    $figure.appendChild($figcaptionName);
    $figure.appendChild($figcaptionId);
    $figure.appendChild($img);
    $tablero.appendChild($figure);

    idPokemon++;
    cargarPokemones();
}

export function cargarModal() {
    const $nombre = document.querySelector('.nombre');
    const $id = document.querySelector('.id');
    const $img = document.querySelector('.img-pokemon');
    const $peso = document.querySelector('.peso');
    const $altura = document.querySelector('.altura');

    document.addEventListener('click', async e => {
        if(e.target.matches('#tablero > figure > img')) {
            e.preventDefault();
            let id = e.target.getAttribute('alt');
                const pokemon = await fetchPokemon(id);
                    borrarHabilidades();
                    borrarTipos();
                        $nombre.textContent = (pokemon.name).toUpperCase();
                        $id.textContent = `N° ${pokemon.id}`;
                        $img.setAttribute('src', `${pokemon.sprites.front_default}`);
                        $img.setAttribute('alt', `${pokemon.name}`);
                        $peso.textContent = pokemon.weight;
                        $altura.textContent = pokemon.height;
                    mostrarHabilidades(pokemon);
                    mostrarTipos(pokemon);
            $modalContenedor.style.display = 'block';
        };
    });
}

export function cerrarModal() {
    const $cerrarModal = document.querySelector('.cerrar-modal');

    $cerrarModal.addEventListener('click', () => {
        $modalContenedor.style.display = 'none';
    });
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

export function siguiente() {
    $siguiente.addEventListener('click', e => {
        e.preventDefault();
        $anterior.style.display = 'block';
        eliminarPokemones();
        contadorPokemones = 0 ;
        contadorClick++;
        cargarPokemones();
    });
}

export function anterior() {
    $anterior.addEventListener('click', e => {
        if (contadorClick !== 0) {
            e.preventDefault();
            eliminarPokemones();
            contadorPokemones = 0;
            idPokemon = idPokemon - 40;
            contadorClick--;
            cargarPokemones();
        }

        if (contadorClick === 0) {
            e.preventDefault();
            $anterior.style.display = 'none';
        }
    });
}

export function reiniciarPokedex() {
    $tituloPokedex.addEventListener('click', e => {
        e.preventDefault();
        eliminarPokemones();
        $anterior.style.display = 'none';
        contadorPokemones = 0;
        idPokemon = 1;
        contadorClick = 0;
        cargarPokemones();
    })
}

function bloquearPaginacion() {
    if (contadorPokemones < TOTAL_POKEMONES) {
        $tituloPokedex.style.pointerEvents = 'none';
        $siguiente.style.pointerEvents = 'none';
        $anterior.style.pointerEvents = 'none';
    } else {
        $tituloPokedex.style.pointerEvents = 'auto';
        $siguiente.style.pointerEvents = 'auto';
        $anterior.style.pointerEvents = 'auto';
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

function eliminarPokemones() {
    let $eliminarFigure = document.querySelectorAll('figure');

        for(let i = 0; i < $eliminarFigure.length; i++) {
            $eliminarFigure[i].remove();
        }
}