export default `
<h1><img src="src/img/logo/pokemon.png" border="0"  alt="Pokemon logo" class="titulo" id="img-pokedex"></h1>

    <nav class="paginador">
        <!-- <a href="" class="anterior">&larr; Anterior</a> -->
        <!-- <a href="" class="siguiente">Siguiente &rarr;</a> -->
    </nav>

    <div class="grid-fluid" id="tablero">
        <div class="spinner"></div>
    </div>


    <div class="modal-contenedor">
        <div class="modal-pokemon">
            <span class="cerrar-modal">&times;</span>
                <h5>
                    <strong class="nombre"></strong>
                </h5>
                <img src="" class="img-pokemon" alt="">
                <p><strong class="id"></strong> </p>
            <div class="tipos-contenedor">
                <strong>Tipos</strong>
                <div class="tipos">
                </div>
            </div>
            <div class="habilidades-contenedor">
                <strong>Habilidades</strong>
                <ul class="habilidades">
                </ul>
            </div>
            <div class="informacion-complementaria">
                <p>Su peso es : <strong class="peso"></strong></p>
                <p>Su altura es : <strong class="altura"></strong></p>
            </div>
        </div>
    </div>
`