import { mostrarPokemonCard, eliminarPokemones } from "../pokecard.js";
import primerPagina from "../../../cypress/fixtures/primeraPagina.json";
import fixture from "./pokedex.fixture.js";

document.body.innerHTML = fixture;
global.fetch = jest.fn(()=>
    Promise.resolve({
        json: () => Promise.resolve(primerPagina)
    }),
);
test('Muestra cartas pokemon', ()=>{
    //
});