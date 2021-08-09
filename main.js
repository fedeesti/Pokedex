const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';


function iniciar(URL_BASE) {

    fetch(`${URL_BASE}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            eliminarPokemones();
            console.log(respuesta);
            const { count: totalPokemones, results: pokemones, next: siguiente, previous: anterior } = respuesta;
            //mostrarListadoPokemones(pokemones);
            mostrarTotalPokemones(totalPokemones);
            cargarPokemones(pokemones);
            cambiarPagina(siguiente, anterior);
        });
}

    function mostrarTotalPokemones(totalPokemones) {
        document.querySelector('#total-pokemones').textContent = 'La cantidad de pokemones es: ' + totalPokemones;
    }

    function cargarPokemones(pokemones) {
        let $tablero = document.querySelector('#tablero');

        for(let i=0; i < pokemones.length;i++) {
            fetch(pokemones[i].url)
                .then(pokemon => pokemon.json())
                .then(pokemon => {
                    const $figure = document.createElement('figure');
                    const $img = document.createElement('img');
                    $img.setAttribute('src', `${pokemon.sprites.front_default}`);
                    $img.setAttribute('alt', `${pokemon.name}`);
                    $figure.appendChild($img);
                    const $figcaption = document.createElement('figcaption');
                    $figcaption.textContent = pokemon.name;
                    $figure.appendChild($figcaption);
                    $tablero.appendChild($figure);
                });
            }
            //eliminarPokemones();
    }

    function mostrarListadoPokemones(pokemones) {
        let $indice = document.querySelector('.indice');

        //eliminarPokemones(pokemones);

        pokemones.forEach((pokemon) => {
            const {name: nombre, url} = pokemon;
            const $link = document.createElement('a');
            $link.setAttribute('href', '#');
            $link.textContent = nombre;
            $link.addEventListener('click', () => {
                console.log(`Ir a buscar data a ${url}`);
                mostrarHabilidades(url);
            });
            $indice.appendChild($link);
        });

    }

    function cambiarPagina (siguiente, anterior) {

        // console.log('anterior: ' + anterior);
        // console.log('siguiente: ' + siguiente);
        let $anteriorLink = anterior ? document.querySelector('.anterior').setAttribute('href', `${anterior}`) : '';
        let $siguienteLink = siguiente ? document.querySelector('.siguiente').setAttribute('href', `${siguiente}`) : '';

        document.addEventListener('click', e => {
            if (e.target.matches('.paginador a')) {
                e.preventDefault();
               
                iniciar(e.target.getAttribute('href'));
            }
        });
    }

//    function mostrarHabilidades(url) {
//
//     }

    function eliminarPokemones () {
        let $eliminarFigure = document.querySelectorAll('figure');


        if ($eliminarFigure.length !== 0) {
            for(let i = 0; i < $eliminarFigure.length; i++) {
                $eliminarFigure[i].remove();
            }
        }
        console.log($eliminarFigure);
    }

    iniciar(URL_BASE);