/// <reference types="Jest" />

import { fetchPokemon } from "../api.js";

beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('Cargar 1 pokemon', () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r({});
        });
        resolve({ json: () => jsonPromise });
      }));

      fetchPokemon('https://pokeapi.co/api/v2/pokemon/bulbasaur');
      expect(global.fetch)
        .toHaveBeenCalledTimes(1);
  });

   test('Cargar listado pokemon', () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r([]);
        });
        resolve({ json: () => jsonPromise });
      }));

      fetchPokemon('https://pokeapi.co/api/v2/pokemon/');
       expect(global.fetch)
        .toHaveBeenCalledTimes(1);
   });
