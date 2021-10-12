export function cargarPokemon (id) {
  if (id === undefined) {
    throw new Error('Se necesita un id para cargar un pokemón');
  }

  let pokemon;
    pokemon = JSON.parse(localStorage.getItem(id));

    if(pokemon === null) {
      throw new Error(`${id} no se encuentra en local Storage`);
    }

    return pokemon;
}

export function guardarPokemon (key, data) {
    return localStorage.setItem(key, data);
}