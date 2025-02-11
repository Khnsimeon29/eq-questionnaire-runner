import PercentagePage from "../../../../generated_pages/mutually_exclusive/mutually-exclusive-percentage.page";
import SummaryPage from "../../../../generated_pages/mutually_exclusive/mutually-exclusive-percentage-section-summary.page";

describe("Component: Mutually Exclusive Percentage With Single Checkbox Override", () => {
  beforeEach(async () => {
    await browser.openQuestionnaire("test_mutually_exclusive.json");
    await browser.pause(100);
    await browser.url("/questionnaire/mutually-exclusive-percentage");
  });

  describe("Given the user has entered a value for the non-exclusive percentage answer", () => {
    it("When then user clicks the mutually exclusive checkbox answer, Then only the mutually exclusive checkbox should be answered.", async () => {
      // Given
      await $(PercentagePage.percentage()).setValue("99");
      await expect(await $(PercentagePage.percentage()).getValue()).to.contain("99");

      // When
      await $(PercentagePage.percentageExclusiveIPreferNotToSay()).click();

      // Then
      await expect(await $(PercentagePage.percentageExclusiveIPreferNotToSay()).isSelected()).to.be.true;
      await expect(await $(PercentagePage.percentage()).getValue()).to.contain("");

      await $(PercentagePage.submit()).click();

      await expect(await $(SummaryPage.percentageExclusiveAnswer()).getText()).to.have.string("I prefer not to say");
      await expect(await $(SummaryPage.percentageExclusiveAnswer()).getText()).to.not.have.string("99");
    });
  });

  describe("Given the user has clicked the mutually exclusive checkbox answer", () => {
    it("When the user enters a value for the non-exclusive percentage answer and removes focus, Then only the non-exclusive percentage answer should be answered.", async () => {
      // Given
      await browser.url("/questionnaire/mutually-exclusive-percentage");
      await $(PercentagePage.percentageExclusiveIPreferNotToSay()).click();
      await expect(await $(PercentagePage.percentageExclusiveIPreferNotToSay()).isSelected()).to.be.true;

      // When
      await $(PercentagePage.percentage()).setValue("99");

      // Then
      await expect(await $(PercentagePage.percentage()).getValue()).to.contain("99");
      await expect(await $(PercentagePage.percentageExclusiveIPreferNotToSay()).isSelected()).to.be.false;

      await $(PercentagePage.submit()).click();

      await expect(await $(SummaryPage.percentageAnswer()).getText()).to.have.string("99");
      await expect(await $(SummaryPage.percentageAnswer()).getText()).to.not.have.string("I prefer not to say");
    });
  });

  describe("Given the user has not clicked the mutually exclusive checkbox answer", () => {
    it("When the user enters a value for the non-exclusive percentage answer, Then only the non-exclusive percentage answer should be answered.", async () => {
      // Given
      await expect(await $(PercentagePage.percentageExclusiveIPreferNotToSay()).isSelected()).to.be.false;

      // When
      await $(PercentagePage.percentage()).setValue("99");

      // Then
      await expect(await $(PercentagePage.percentage()).getValue()).to.contain("99");
      await expect(await $(PercentagePage.percentageExclusiveIPreferNotToSay()).isSelected()).to.be.false;

      await $(PercentagePage.submit()).click();

      await expect(await $(SummaryPage.percentageAnswer()).getText()).to.have.string("99");
      await expect(await $(SummaryPage.percentageAnswer()).getText()).to.not.have.string("I prefer not to say");
    });
  });

  describe("Given the user has not answered the non-exclusive percentage answer", () => {
    it("When the user clicks the mutually exclusive checkbox answer, Then only the exclusive checkbox should be answered.", async () => {
      // Given
      await expect(await $(PercentagePage.percentage()).getValue()).to.contain("");

      // When
      await $(PercentagePage.percentageExclusiveIPreferNotToSay()).click();
      await expect(await $(PercentagePage.percentageExclusiveIPreferNotToSay()).isSelected()).to.be.true;

      // Then
      await $(PercentagePage.submit()).click();

      await expect(await $(SummaryPage.percentageExclusiveAnswer()).getText()).to.have.string("I prefer not to say");
      await expect(await $(SummaryPage.percentageExclusiveAnswer()).getText()).to.not.have.string("British\nIrish");
    });
  });

  describe("Given the user has not answered the question and the question is optional", () => {
    it("When the user clicks the Continue button, Then it should display `No answer provided`", async () => {
      // Given
      await expect(await $(PercentagePage.percentage()).getValue()).to.contain("");
      await expect(await $(PercentagePage.percentageExclusiveIPreferNotToSay()).isSelected()).to.be.false;

      // When
      await $(PercentagePage.submit()).click();

      // Then
      await expect(await $(SummaryPage.percentageAnswer()).getText()).to.contain("No answer provided");
    });
  });
});
