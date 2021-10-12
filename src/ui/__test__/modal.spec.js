jest.mock('../modal.js', () => ({
    mostrarModal: jest.fn(),
    cerrarModal: jest.fn()
}));


import { mostrarModal, cerrarModal } from "../modal.js";
import{ cargarPokemon } from "../../servicios/servicios.js";
import { fetchPokemon } from "../../api/api.js";
import fixture from "./pokedex.fixture.js";
import charizard from "../../../cypress/fixtures/charizard.json";

document.body.innerHTML = fixture;

test('Prueba cerrar modal', () => {
    const cierraModal = jest.fn(cerrarModal);
    cierraModal();
    expect(cierraModal).toHaveBeenCalled();
});

test('Prueba abrir el modal', async ()=> {
    const abrirModal = jest.fn(mostrarModal);
    abrirModal();
    expect(abrirModal).toHaveBeenCalled();
});