const $modalContenedor = document.querySelector('.modal-contenedor');
const $tituloPokedex = document.querySelector('.titulo');
const $paginador = document.querySelector('.paginador');
const $spinner = document.querySelector('.spinner');

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

function iniciar() {
    cargarPokemon(URL_BASE);
    cargarModal();
    cerrarModal();
}

async function cargarPokemon(url) {
    let $anteriorLink, $siguienteLink;
    let api = await fetchPokemon(url);

        mostrarPokemonCard(api.results);
        cambiarPagina(api.previous, api.next);
}

async function mostrarPokemonCard (pokemones) {
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

function cambiarPagina(anterior, siguiente) {
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

function cargarModal() {
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

function cerrarModal() {
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

function eliminarPokemones () {
    let $eliminarFigure = document.querySelectorAll('figure');

        for(let i = 0; i < $eliminarFigure.length; i++) {
                $eliminarFigure[i].remove();
        }
}

function fetchPokemon(url) {
    return fetch(`${url}`).then(res => res.json())
}

function crearSpinner () {
    const $tablero = document.querySelector('#tablero');
    let spin = `<div class="spinner"></div>`;

    $tablero.innerHTML = spin;
}

function ocultarSpinner() {
    $spinner.style.display = 'none';
}

iniciar();