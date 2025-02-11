import DropdownMandatoryPage from "../../../generated_pages/dropdown_mandatory/dropdown-mandatory.page";
import DropdownMandatorySummary from "../../../generated_pages/dropdown_mandatory/submit.page";
import DropdownMandatoryOverriddenPage from "../../../generated_pages/dropdown_mandatory_with_overridden_error/dropdown-mandatory-with-overridden-error.page";
import DropdownOptionalPage from "../../../generated_pages/dropdown_optional/dropdown-optional.page";
import DropdownOptionalSummary from "../../../generated_pages/dropdown_optional/submit.page";

describe("Component: Dropdown", () => {
  // Mandatory
  describe("Given I start a Mandatory Dropdown survey", () => {
    beforeEach(async () => {
      await browser.openQuestionnaire("test_dropdown_mandatory.json");
    });

    it("When I have selected a dropdown option, Then the selected option should be displayed in the summary", async () => {
      await $(DropdownMandatoryPage.answer()).selectByAttribute("value", "Rugby is better!");
      await $(DropdownMandatoryPage.submit()).click();
      await expect(await $(DropdownMandatorySummary.dropdownMandatoryAnswer()).getText()).to.contain("Rugby is better!");
    });

    it("When I have not selected a dropdown option and click Continue, Then the default error message should be displayed", async () => {
      await $(DropdownMandatoryPage.submit()).click();
      await expect(await $(DropdownMandatoryPage.errorNumber(1)).getText()).to.contain("Select an answer");
    });

    it("When I have selected a dropdown option and I try to select a default (disabled) dropdown option, Then the already selected option should be displayed in summary", async () => {
      await $(DropdownMandatoryPage.answer()).selectByAttribute("value", "Liverpool");
      await $(DropdownMandatoryPage.answer()).selectByAttribute("value", "");
      await $(DropdownMandatoryPage.submit()).click();
      await expect(await $(DropdownMandatorySummary.dropdownMandatoryAnswer()).getText()).to.contain("Liverpool");
    });

    it("When I click the dropdown label, Then the dropdown should be focused", async () => {
      await $(DropdownMandatoryPage.answerLabel()).click();
      await expect(await $(DropdownMandatoryPage.answer()).isFocused()).to.be.true;
    });

    it("When I'm on the summary page and I click Edit then Continue, Then the answer on the summary page should be unchanged", async () => {
      await $(DropdownMandatoryPage.answer()).selectByAttribute("value", "Rugby is better!");
      await $(DropdownMandatoryPage.submit()).click();
      await expect(await $(DropdownMandatorySummary.dropdownMandatoryAnswer()).getText()).to.contain("Rugby is better!");
      await $(DropdownMandatorySummary.dropdownMandatoryAnswerEdit()).click();
      await $(DropdownMandatoryPage.submit()).click();
      await expect(await $(DropdownMandatorySummary.dropdownMandatoryAnswer()).getText()).to.contain("Rugby is better!");
    });

    it("When I'm on the summary page and I click Edit and change the answer, Then the newly selected answer should be displayed in the summary", async () => {
      await $(DropdownMandatoryPage.answer()).selectByAttribute("value", "Rugby is better!");
      await $(DropdownMandatoryPage.submit()).click();
      await expect(await $(DropdownMandatorySummary.dropdownMandatoryAnswer()).getText()).to.contain("Rugby is better!");
      await $(DropdownMandatorySummary.dropdownMandatoryAnswerEdit()).click();
      await $(DropdownMandatoryPage.submit()).click();
      await expect(await $(DropdownMandatorySummary.dropdownMandatoryAnswer()).getText()).to.contain("Rugby is better!");
      await $(DropdownMandatorySummary.dropdownMandatoryAnswerEdit()).click();
      await $(DropdownMandatoryPage.answer()).selectByAttribute("value", "Liverpool");
      await $(DropdownMandatoryPage.submit()).click();
      await expect(await $(DropdownMandatorySummary.dropdownMandatoryAnswer()).getText()).to.contain("Liverpool");
    });
  });

  describe("Given I start a Mandatory With Overridden Error Dropdown survey", () => {
    before(async () => {
      await browser.openQuestionnaire("test_dropdown_mandatory_with_overridden_error.json");
    });

    it("When I have not selected a dropdown option and click Continue, Then the overridden error message should be displayed", async () => {
      await $(DropdownMandatoryOverriddenPage.submit()).click();
      await expect(await $(DropdownMandatoryOverriddenPage.errorNumber(1)).getText()).to.contain("Overridden test error message.");
    });
  });

  // Optional
  describe("Given I start a Optional Dropdown survey", () => {
    beforeEach(async () => {
      await browser.openQuestionnaire("test_dropdown_optional.json");
    });

    it('When I have not selected a dropdown option, Then the summary should display "No answer provided"', async () => {
      await $(DropdownOptionalPage.submit()).click();
      await expect(await $(DropdownOptionalSummary.dropdownOptionalAnswer()).getText()).to.contain("No answer provided");
    });

    it("When I have selected a dropdown option, Then the selected option should be displayed in the summary", async () => {
      await $(DropdownOptionalPage.answer()).selectByAttribute("value", "Rugby is better!");
      await $(DropdownOptionalPage.submit()).click();
      await expect(await $(DropdownOptionalSummary.dropdownOptionalAnswer()).getText()).to.contain("Rugby is better!");
    });

    it('When I have selected a dropdown option and I reselect the default option (Select an answer), Then the summary should display "No answer provided"', async () => {
      await $(DropdownOptionalPage.answer()).selectByAttribute("value", "Chelsea");
      await $(DropdownOptionalPage.submit()).click();
      await expect(await $(DropdownOptionalSummary.dropdownOptionalAnswer()).getText()).to.contain("Chelsea");
      await $(DropdownOptionalSummary.dropdownOptionalAnswerEdit()).click();
      await $(DropdownOptionalPage.answer()).selectByAttribute("value", "");
      await $(DropdownOptionalPage.submit()).click();
      await expect(await $(DropdownOptionalSummary.dropdownOptionalAnswer()).getText()).to.contain("No answer provided");
    });
  });
});
