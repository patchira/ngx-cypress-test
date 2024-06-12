/// <reference types="cypress" />

describe('First test suite', () =>{

    // describe('suite section', () =>{

    //     beforeEach('login', () =>{
    //         //repeat for every test
    //     })
    // })

    it('first test', () =>{

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Forms').click()
        cy.wait(1000)
        cy.contains('Form Layouts').click()

        //by Tag name
        cy.get('input')

        //by id
        cy.get('#inputEmail1')

        //class
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[fullwidth]')

        //by attribute and value
        cy.get('[placeholder="Email"]')

        //by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by two attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by tag, attribute id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by cypress test ID
        cy.get('[data-cy="imputEmail1"]')

        cy.wait(1000)
    })



    it('Second Test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //theory
        //get() - find elemnts on the page by locator globally
        //find() - find child elements by locator
        //contains() - find HTML text and by text and locator

        cy.wait(1000)
        cy.contains('Sign in')
        cy.wait(1000)
        cy.contains('[status="warning"]','Sign in')
        cy.wait(1000)
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.wait(1000)
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')
        cy.wait(1000)
        cy.contains('nb-card', 'Horizontal form').get('button')

        //cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })


    it('Save subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.wait(1000)

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.wait(1000)
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //CANT DO THIS LIKE THIS
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

        //1 Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.wait(1000)
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.wait(1000)

        //cypress Then() method
        cy.contains('nb-card', 'Using the Grid').then( usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
        cy.wait(1000)
    })

    it('Extract Test value', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.wait(1000)

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.wait(1000)

        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })
        cy.wait(1000)
        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

        //4
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        //5 invoke property. type to tell cypress to type something
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.wait(1000)
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then(property =>{
            expect(property).to.equal('test@test.com')
        })       
    })

    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.wait(1000)

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons =>{
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wait(1000)
            cy.wrap(radioButtons).eq(1).check({force: true})
            cy.wait(1000)
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wait(1000)
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
        cy.wait(1000)
    })

    it('Check boxes', () => {
        cy.visit('/')
        cy.wait(1000)
        cy.contains('Modal & Overlays').click()
        cy.wait(1000)
        cy.contains('Toastr').click()

    //  cy.get('[type="checkbox"]').uncheck({force: true})
        cy.wait(1000)
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.wait(1000)
        cy.get('[type="checkbox"]').eq(1).check({force: true})
    })

    it('Date Picker ', () => {

        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day) 
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute =>{
                if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                    cy.get('[data-name="chevron-right"]').click()
                    cy.wait(1000)
                    selectDayFromCurrent(day)
                }else{
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                }  
            })
            return dateToAssert
        }


        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()     
            const dateToAssert = selectDayFromCurrent(200)
            cy.wrap(input).invoke('prop', 'value').should('contain',dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })
        cy.wait(1000)
    
    })

    it('List and dropdowns', () =>{
        cy.visit('/')
        cy.wait(1000)
        //1 select a single option
        cy.get('nav nb-select').click()
        cy.wait(1000)
        cy.get('.options-list').contains('Dark').click()
        cy.wait(1000)
        cy.get('nav nb-select').should('contain', 'Dark')

        //2 loop all options
        cy.get('nav nb-select').then(dropDown =>{
            cy.wrap(dropDown).click()
            cy.wait(1000)
            cy.get('.options-list nb-option').each( (listItem, index) =>{
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                cy.wait(1000)
                if(index < 3){
                    cy.wrap(dropDown).click()
                }

            })
        })

    })
})
