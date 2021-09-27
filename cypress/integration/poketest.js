 /// <reference types="Cypress" />

const URL = 'http://127.0.0.1:5500/';

describe('Pokedex', () => {
    before(()=>{
        cy.intercept('https://pokeapi.co/api/v2/pokemon/', { fixture: 'primeraPagina.json' }).as('PrimeraPagina');
    })

    it('Carga la primera página', () => {

        cy.visit(URL);

        cy.get('#tablero .spinner')
            .should('have.css', 'display', 'block');

        cy.get('.paginador .siguiente')
            .should('be.visible');

        cy.get('.paginador .anterior')
            .should('not.exist');

        cy.get('.modal-contenedor')
            .should('not.be.visible');

        cy.get('#tablero figure', { timeout: 30000 })
            .should('have.length', 20);
    });

    it('Carga Modal', () => {

        cy.intercept('https://pokeapi.co/api/v2/pokemon/', { fixture: 'primeraPagina.json' }).as('PrimeraPagina');
        cy.intercept('https://pokeapi.co/api/v2/pokemon/charizard', { fixture: 'charizard.json' }).as('obtenerCharizard');

        cy.get('#tablero figure:nth-child(6)')
            .click();

        cy.get('.modal-contenedor', { timeout: 1000 })
            .should('be.visible')
            .as('obtenerModal');

        cy.get('.cerrar-modal')
            .click();

        cy.get('@obtenerModal')
            .should('not.be.visible');
    });

     it('Usa el paginador', () => {

        cy.intercept('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20', { fixture: 'segundaPagina.json' }).as('SegundaPagina');

        cy.get('.paginador .siguiente')
            .as('paginaSiguiente')
            .click();

        cy.wait(10000);

        cy.get('.paginador .anterior')
            .as('paginaAnterior')
            .parent()
            .should('be.visible');

        cy.get('@paginaAnterior')
            .click();

        cy.wait(1500);

        cy.get('@paginaAnterior')
            .should('not.exist');
    })
});