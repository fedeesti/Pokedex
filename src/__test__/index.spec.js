import { iniciar } from '../index.js';
import fixture from './pokedex.fixture.js';
import listadoPokemon from '../../cypress/fixtures/primeraPagina.json';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('Carga la primera página', () => {
  document.body.innerHTML = fixture;
   global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r(listadoPokemon);
        });
        resolve({ json: () => jsonPromise });
      }));

      iniciar()
        .then(() => {
          expect(document.querySelectorAll('#tablero figure'))
          .toHaveLength(20);
        });
  });