export function mostrarDatos(pokemon) {
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

export function mostrarHabilidades(pokemon) {
    const $habilidades = document.querySelector('.habilidades');

    for(let i=0;i<pokemon.abilities.length;i++) {
        let $habilidad = document.createElement('li');
        $habilidad.textContent = pokemon.abilities[i].ability.name;
        $habilidades.appendChild($habilidad);
    }
}

export function mostrarTipos(pokemon) {
    const $tipos = document.querySelector('.tipos');

    for(let i=0;i<pokemon.types.length;i++) {
        let $tipo = document.createElement('strong');
        $tipo.textContent = pokemon.types[i].type.name;
        $tipo.classList.add(`${pokemon.types[i].type.name}`);
        $tipos.appendChild($tipo);
    }
}

export function borrarTipos() {
    const $borrarTipos = document.querySelectorAll('.tipos strong');

    for(let i = 0; i < $borrarTipos.length; i++) {
        $borrarTipos[i].remove();
    }
}

export function borrarHabilidades() {
    const $borrarHabilidades = document.querySelectorAll('.habilidades li');

    for(let i = 0; i < $borrarHabilidades.length; i++) {
        $borrarHabilidades[i].remove();
    }
}