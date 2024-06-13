import { navigateTo } from "../support/page_objects/naviagationPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"


describe('Test with Page Object', () =>{

    beforeEach('open application',() =>{
        cy.visit("/")
    })

    it('Verify navigations across the pages', () =>{
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.toolTipPage()
    })

    it('Should submit inline and basic form and select tommorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Patrick', 'patrick@test.com')
        cy.wait(1000)
        onFormLayoutsPage.submitBasicFormWithNameAndEmail('patrick@test.com', 'password')
        cy.wait(1000)
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePickerFromToday(1);
        cy.wait(1000)
        onDatePickerPage.selectDatePickerWithRangeFromToday(7,14);
        cy.wait(1000)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName("Patrick", "Wachira")
        cy.wait(1000)
        onSmartTablePage.updateAgeByFirstName("Patrick", "26")
        cy.wait(1000)
        onSmartTablePage.deleteRowByIndex(1);
    })
})