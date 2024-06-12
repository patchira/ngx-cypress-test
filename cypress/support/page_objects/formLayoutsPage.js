

export class FormLayoutsPage{
    submitInlineFormWithNameAndEmail(name, email) {
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wait(1000)
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wait(1000)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wait(800)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wait(800)
            cy.wrap(form).submit()
        })
    }
    submitBasicFormWithNameAndEmail(name, password) {
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            cy.wait(1000)
            cy.wrap(form).find('[placeholder="Email"]').type(name)
            cy.wait(1000)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wait(800)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wait(800)
            cy.wrap(form).submit()
        })
    }
}
    export const onFormLayoutsPage = new FormLayoutsPage()