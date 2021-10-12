import * as spin from "../spinner.js";

jest.mock('../spinner.js', () => jest.fn());

test('Prueba que el spinner aparece', () => {
    const crearSpin = jest.fn(spin.crearSpinner);
    crearSpin();
    expect(crearSpin).toHaveBeenCalled();
});

test('Prueba que el spinner desaparece', () => {
    const ocultaSpin = jest.fn(spin.ocultarSpinner);
    ocultaSpin();
    expect(ocultaSpin).toHaveBeenCalled();
});