const $spinner = document.querySelector('.spinner');

export function crearSpinner () {
    const $tablero = document.querySelector('#tablero');
    let spin = `<div class="spinner"></div>`;

    $tablero.innerHTML = spin;
}

export function ocultarSpinner() {
    $spinner.style.display = 'none';
}