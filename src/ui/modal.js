
const $modalContenedor = document.querySelector('.modal-contenedor');

export function mostrarModal (pokemon) {
    const { id, name, fotoPrincipal, weight, height, tipos, habilidades } = pokemon;
    borrarHabilidades();
    borrarTipos();
    mostrarDatos( id, name, fotoPrincipal, weight, height );
    mostrarHabilidades(habilidades);
    mostrarTipos(tipos);
    $modalContenedor.style.display = 'block';
}

export function cerrarModal() {
    const $cerrarModal = document.querySelector('.cerrar-modal');

    $cerrarModal.addEventListener('click', () => {
        $modalContenedor.style.display = 'none';
    })
}

function mostrarDatos( id, name, fotoPrincipal, weight, height ) {
    const $nombre = document.querySelector('.nombre');
    const $id = document.querySelector('.id');
    const $img = document.querySelector('.img-pokemon');
    const $peso = document.querySelector('.peso');
    const $altura = document.querySelector('.altura');

    $nombre.textContent = (name).toUpperCase();
    $id.textContent = `N° ${id}`;
    $img.setAttribute('src', `${fotoPrincipal}`);
    $img.setAttribute('alt', `${name}`);
    $peso.textContent = `${weight} hg`;
    $altura.textContent = `${height} dm`;
}

function mostrarHabilidades(habilidades) {
    const $habilidades = document.querySelector('.habilidades');

    habilidades.forEach((habilidad) => {
        let $habilidad = document.createElement('li');
        $habilidad.textContent = habilidad;
        $habilidades.appendChild($habilidad);
    })
}

function mostrarTipos(tipos) {
    const $tipos = document.querySelector('.tipos');

    tipos.forEach((tipo)=>{
        let $tipo = document.createElement('strong');
        $tipo.textContent = tipo;
        $tipo.classList.add(`${tipo}`);
        $tipos.appendChild($tipo);
    })
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
