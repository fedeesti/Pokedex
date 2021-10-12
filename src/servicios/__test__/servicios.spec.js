jest.mock('../../storage/storage.js', () => ({
    guardarPokemon: jest.fn(),
    cargarPokemon: jest.fn()
}));

jest.mock('../../api/api.js', () => {
    return jest.fn(()=> "test");
  });

import { fetchPokemon } from "../../api/api.js";
import * as storage from "../../storage/storage.js";
import { cargarPokemon, cargarPokemones } from "../servicios.js";

describe('Prueba el módulo de servicios', ()=>{
    /* beforeEach(()=>{jest.clearAllMocks});

    test('Prueba función cargarPokemon', async () => {
        storage.cargarPokemon
            .mockImplementationOnce((x)=> `{"result": "${x}"}`);
        storage.guardarPokemon
            .mockImplementationOnce((key) => key);

            // try {
            let pokemon = await cargarPokemon('bulbasaur');
            const result = storage.cargarPokemon(pokemon);
            expect(storage.cargarPokemon).toHaveBeenCalledTimes(2);
            expect(storage.cargarPokemon).toHaveBeenCalledWith("bulbasaur");
            expect(pokemon).toEqual({"result": "bulbasaur"});
        // }
        // catch(e) {

            // let bulbasaur = await cargarPokemon('https://pokeapi.co/api/v2/pokemon/bulbasaur');
            const fetch = jest.fn(fetchPokemon);
            fetch();
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(storage.guardarPokemon).toHaveBeenCalledTimes(1);
            expect(storage.guardarPokemon).toHaveBeenCalledWith('bulbasaur', 'test');


            // const ejemplo = {key: "value"};
            // storage.guardarPokemon("key", ejemplo);
            // expect(storage.cargarPokemon).toHaveBeenCalledTimes(1);
            // expect(storage.cargarPokemon).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/bulbasaur");
        // }
    });

    // test('Prueba función cargarPokemones') */
})


