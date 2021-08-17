const $modalPokemon = document.querySelector('.modal-pokemon');
const $modalContenedor = document.querySelector('.modal-contenedor');
const $nombre = document.querySelector('.nombre');
const $id = document.querySelector('.id');
const $img = document.querySelector('.img-pokemon');
const $peso = document.querySelector('.peso');
const $altura = document.querySelector('.altura');
const $cerrarModal = document.querySelector('.cerrar-modal');

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

function iniciar(URL_BASE) {
    fetch(`${URL_BASE}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            const { count: totalPokemones, results: pokemones, next: siguiente, previous: anterior } = respuesta;
            cargarPokemones(pokemones);
            eliminarPokemones();
            cambiarPagina(siguiente, anterior);
            cargarModal();
        });
}

function cargarPokemones(pokemones) {
    let $tablero = document.querySelector('#tablero');

    pokemones.forEach((pokemon)=> {
        fetch(pokemon.url)
            .then(pokemon=>pokemon.json())
            .then(pokemon=> {
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
            });
    })
}

function cambiarPagina (siguiente, anterior) {
    let $anteriorLink = anterior ? document.querySelector('.anterior').setAttribute('href', `${anterior}`) : '';
    let $siguienteLink = siguiente ? document.querySelector('.siguiente').setAttribute('href', `${siguiente}`) : '';

    document.addEventListener('click', e => {
        if (e.target.matches('.paginador a')) {
            e.preventDefault();
            console.log(e.target);
            iniciar(e.target.getAttribute('href'));
        }
    });
}

function cargarModal(url) {
    document.addEventListener('click', e => {
        if(e.target.matches('#tablero > figure > img')) {
            e.preventDefault();
            let id = e.target.getAttribute('alt');
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(res => res.json())
                .then(pokemon => {
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
                });
                $modalContenedor.style.display = 'block';
        }
    });
}

$cerrarModal.addEventListener('click', () => {
    $modalContenedor.style.display = 'none';
})

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

iniciar(URL_BASE);