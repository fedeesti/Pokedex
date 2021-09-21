 /// <reference types="Cypress" />

describe('Pokedex', () => {
    let fetchPolyfill;

    before(() => {
        const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

        cy.request(polyfillUrl)
            .then((response) => {
                fetchPolyfill = response.body;
            });

        cy.visit('http://127.0.0.1:5500/',  {
            onBeforeLoad(contentWindow) {
                delete contentWindow.fetch;
                contentWindow.eval(fetchPolyfill);
                contentWindow.fetch = contentWindow.unfetch;
            },
        });
    });

    it('Carga la primera página', () => {
        cy.get('#tablero .spinner').should('have.css', 'display', 'block');
        cy.get('.paginador .siguiente').should('be.visible');
        cy.get('.paginador .anterior').should('not.exist');
        cy.get('.modal-contenedor').should('not.be.visible');

        cy.get('#tablero figure', { timeout: 20000 }).should('have.length', 20);
    });

    it('Carga Modal', () => {
        cy.intercept('https://pokeapi.co/api/v2/pokemon/charizard').as('obtenerCharizard');

        cy.get('#tablero figure:nth-child(6)').click();

        cy.get('.modal-contenedor', { timeout: 1000 }).should('be.visible');

        cy.get('.cerrar-modal').click();
        cy.get('.modal-contenedor').should('not.be.visible');
    });

     it('Usa el paginador', () => {

        cy.intercept('https://pokeapi.co/api/v2/pokemon/', 'fixture:pagina-principal')
            .as('ObtenerPrimeraPagina');

        cy.get('.paginador .siguiente').as('paginaSiguiente').click();
        cy.wait(10000);
        cy.get('.paginador .anterior').as('paginaAnterior').parent().should('be.visible');
        cy.get('@paginaAnterior').click();
        cy.wait(1000);
        cy.get('.paginador .anterior').should('not.exist');
    })
});