
export class Pokemon{
    constructor(id,
        name,
        fotoPrincipal,
        height,
        weight,
        tipos = [],
        habilidades= []) {
            this.id = id;
            this.name = name;
            this.fotoPrincipal = fotoPrincipal;
            this.height = height;
            this.weight = weight;
            this.tipos = tipos;
            this.habilidades = habilidades;
    }
}

export class ListadoPokemon{
    constructor(
        anteriorUrl,
        siguienteUrl,
        resultados = []
    ) {
        this.anteriorUrl = anteriorUrl;
        this.siguienteUrl = siguienteUrl;
        this.resultados = resultados;
    }
}