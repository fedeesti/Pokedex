
import {
    cargarPokemones,
    cargarModal,
    cerrarModal,
    siguiente,
    anterior,
    reiniciarPokedex
} from "./ui.js";

function iniciar() {
    cargarPokemones();
    cargarModal();
    cerrarModal();
}

function cambiarPagina () {
    siguiente();
    anterior();
    reiniciarPokedex();
}

iniciar();
cambiarPagina();