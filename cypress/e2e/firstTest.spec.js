/// <reference types="cypress" />

const { table } = require("console")

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

    it.only('Web Tables', () =>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.wait(1000)
        cy.contains('Smart Table').click()
        cy.wait(1000)

        //1 get the row by text
        cy.get('tbody').contains('tr', 'Larry').then( tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wait(1000)
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '35')
            cy.wait(1000)
        })
        
        //2 get row by index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow =>{
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Patrick')
            cy.wait(1000)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Wachira')
            cy.wait(1000)
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumns =>{
            cy.wrap(tableColumns).eq(2).should('contain', 'Patrick')
            cy.wrap(tableColumns).eq(3).should('contain', 'Wachira')
        })

         //3 Get each row validation
         const age = [20, 30, 40, 200];

         cy.wrap(age).each( age => {
             cy.get('thead [placeholder="Age"]').clear().type(age);
             cy.wait(1000);
             cy.get('tbody tr').each( tableRow => {
                 if ( age === 200) {
                     cy.wrap(tableRow).should('contain', 'No data found');
                 } else {
                     cy.wrap(tableRow).find('td').eq(6).should('contain', age);
                 }
             })
         })
 
     })
 
     it.only("Tooltip", () => {
         cy.visit("/");
         cy.contains("Modal & Overlays").click();
         cy.wait(1000);
         cy.contains("Tooltip").click();
         cy.wait(1000);
 
         cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
         cy.get('nb-tooltip').should('contain', 'This is a tooltip');
 
         cy.wait(1000);
     })
 
     it.only("dialog box", () => {
         cy.visit("/");
         cy.contains("Tables & Data").click();
         cy.wait(1000);
         cy.contains("Smart Table").click();
         cy.wait(1000);
 
         // 1
         cy.get('tbody tr').first().find('.nb-trash').click();
         cy.wait(1000);
         cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
         })
 
         // 2
         const stub = cy.stub();
         cy.on('window:confirm', stub);
         cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
         })
     })

})
