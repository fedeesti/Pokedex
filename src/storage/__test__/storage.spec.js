import { cargarPokemon, guardarPokemon } from '../storage.js';

beforeAll(() => {
    global.Storage.prototype.setItem = jest.fn((key) => key);
    global.Storage.prototype.getItem = jest.fn().mockImplementationOnce((x)=> `{"result": "${x}"}`);
  });

afterAll(() => {
    global.Storage.prototype.setItem.mockReset();
    global.Storage.prototype.getItem.mockReset();
  });

test('Guardar en localStorage', ()=>{
    const ejemplo = {key: "value"};
    guardarPokemon("key", ejemplo);
    expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(global.Storage.prototype.setItem).toHaveBeenCalledWith("key", {key: "value"});
});

test('Cargar de localStorage', ()=>{
    const result = cargarPokemon("test");
    expect(global.Storage.prototype.getItem).toHaveBeenCalledTimes(1);
    expect(global.Storage.prototype.getItem).toHaveBeenCalledWith("test");
    expect(result).toEqual({"result": "test"});
});