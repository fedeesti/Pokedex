
const $modalContenedor = document.querySelector('.modal-contenedor');

export function mostrarModal (pokemon) {
    const { name,id, sprites, weight, height, abilities, types } = pokemon;
    borrarHabilidades();
    borrarTipos();
    mostrarDatos(name,id, sprites, weight, height);
    mostrarHabilidades(abilities);
    mostrarTipos(types);
    $modalContenedor.style.display = 'block';
}

export function cerrarModal() {
    const $cerrarModal = document.querySelector('.cerrar-modal');

    $cerrarModal.addEventListener('click', () => {
        $modalContenedor.style.display = 'none';
    })
}

function mostrarDatos(name,id, sprites, weight, height) {
    const $nombre = document.querySelector('.nombre');
    const $id = document.querySelector('.id');
    const $img = document.querySelector('.img-pokemon');
    const $peso = document.querySelector('.peso');
    const $altura = document.querySelector('.altura');

    $nombre.textContent = (name).toUpperCase();
    $id.textContent = `N° ${id}`;
    $img.setAttribute('src', `${sprites.front_default}`);
    $img.setAttribute('alt', `${name}`);
    $peso.textContent = `${weight} hg`;
    $altura.textContent = `${height} dm`;
}

function mostrarHabilidades(abilities) {
    const $habilidades = document.querySelector('.habilidades');

    for(let i=0;i<abilities.length;i++) {
        let $habilidad = document.createElement('li');
        $habilidad.textContent = abilities[i].ability.name;
        $habilidades.appendChild($habilidad);
    }
}

function mostrarTipos(types) {
    const $tipos = document.querySelector('.tipos');

    for(let i=0;i<types.length;i++) {
        let $tipo = document.createElement('strong');
        $tipo.textContent = types[i].type.name;
        $tipo.classList.add(`${types[i].type.name}`);
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
