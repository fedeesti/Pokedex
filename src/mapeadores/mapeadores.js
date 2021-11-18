import { Pokemon, ListadoPokemon } from '../entidades/entidades.js';

export function mapearPokemon(datosApi) {
    const {
        id,
        name,
        sprites: { front_default: fotoPrincipal },
        height,
        weight,
        types: tipos,
        abilities: habilidades
    } = datosApi;

    return new Pokemon(
        id,
        name,
        fotoPrincipal,
        height,
        weight,
        tipos.map((item)=> item.type.name),
        habilidades.map((item)=> item.ability.name)
    )
}

export function mapearListadoPokemon(datosApi) {
    const {
        previous: anteriorUrl,
        next: siguienteUrl,
        results: resultados
    } = datosApi;

    return new ListadoPokemon(
        anteriorUrl,
        siguienteUrl,
        resultados
    )
}
