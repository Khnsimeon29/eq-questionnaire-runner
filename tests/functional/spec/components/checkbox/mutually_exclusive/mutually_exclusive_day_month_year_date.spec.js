import DatePage from "../../../../generated_pages/mutually_exclusive/mutually-exclusive-date.page";
import SummaryPage from "../../../../generated_pages/mutually_exclusive/mutually-exclusive-date-section-summary.page";

describe("Component: Mutually Exclusive Day Month Year Date With Single Checkbox Override", () => {
  beforeEach(async () => {
    await browser.openQuestionnaire("test_mutually_exclusive.json");
    await browser.pause(100);
    await browser.url("/questionnaire/mutually-exclusive-date");
  });

  describe("Given the user has entered a value for the non-exclusive month year date answer", () => {
    it("When then user clicks the mutually exclusive checkbox answer, Then only the mutually exclusive checkbox should be answered.", async () => {
      // Given
      await $(DatePage.dateday()).setValue("17");
      await $(DatePage.datemonth()).setValue("3");
      await $(DatePage.dateyear()).setValue("2018");
      await expect(await $(DatePage.dateday()).getValue()).to.contain("17");
      await expect(await $(DatePage.datemonth()).getValue()).to.contain("3");
      await expect(await $(DatePage.dateyear()).getValue()).to.contain("2018");

      // When
      await $(DatePage.dateExclusiveIPreferNotToSay()).click();

      // Then
      await expect(await $(DatePage.dateExclusiveIPreferNotToSay()).isSelected()).to.be.true;
      await expect(await $(DatePage.dateday()).getValue()).to.contain("");
      await expect(await $(DatePage.datemonth()).getValue()).to.contain("");
      await expect(await $(DatePage.dateyear()).getValue()).to.contain("");

      await $(DatePage.submit()).click();

      await expect(await $(SummaryPage.dateExclusiveAnswer()).getText()).to.have.string("I prefer not to say");
      await expect(await $(SummaryPage.dateExclusiveAnswer()).getText()).to.not.have.string("17 March 2018");
    });
  });

  describe("Given the user has clicked the mutually exclusive checkbox answer", () => {
    it("When the user enters a value for the non-exclusive month year date answer and removes focus, Then only the non-exclusive month year date answer should be answered.", async () => {
      // Given
      await $(DatePage.dateExclusiveIPreferNotToSay()).click();
      await expect(await $(DatePage.dateExclusiveIPreferNotToSay()).isSelected()).to.be.true;

      // When
      await $(DatePage.dateday()).setValue("17");
      await $(DatePage.datemonth()).setValue("3");
      await $(DatePage.dateyear()).setValue("2018");

      // Then
      await expect(await $(DatePage.dateday()).getValue()).to.contain("17");
      await expect(await $(DatePage.datemonth()).getValue()).to.contain("3");
      await expect(await $(DatePage.dateyear()).getValue()).to.contain("2018");

      await expect(await $(DatePage.dateExclusiveIPreferNotToSay()).isSelected()).to.be.false;

      await $(DatePage.submit()).click();

      await expect(await $(SummaryPage.dateAnswer()).getText()).to.have.string("17 March 2018");
      await expect(await $(SummaryPage.dateAnswer()).getText()).to.not.have.string("I prefer not to say");
    });
  });

  describe("Given the user has not clicked the mutually exclusive checkbox answer", () => {
    it("When the user enters a value for the non-exclusive month year date answer, Then only the non-exclusive month year date answer should be answered.", async () => {
      // Given
      await expect(await $(DatePage.dateExclusiveIPreferNotToSay()).isSelected()).to.be.false;

      // When
      await $(DatePage.dateday()).setValue("17");
      await $(DatePage.datemonth()).setValue("3");
      await $(DatePage.dateyear()).setValue("2018");

      // Then
      await expect(await $(DatePage.dateday()).getValue()).to.contain("17");
      await expect(await $(DatePage.datemonth()).getValue()).to.contain("3");
      await expect(await $(DatePage.dateyear()).getValue()).to.contain("2018");
      await expect(await $(DatePage.dateExclusiveIPreferNotToSay()).isSelected()).to.be.false;

      await $(DatePage.submit()).click();
      await expect(await $(SummaryPage.dateAnswer()).getText()).to.have.string("17 March 2018");
      await expect(await $(SummaryPage.dateAnswer()).getText()).to.not.have.string("I prefer not to say");
    });
  });

  describe("Given the user has not answered the non-exclusive month year date answer", () => {
    it("When the user clicks the mutually exclusive checkbox answer, Then only the exclusive checkbox should be answered.", async () => {
      // Given
      await expect(await $(DatePage.dateday()).getValue()).to.contain("");
      await expect(await $(DatePage.datemonth()).getValue()).to.contain("");
      await expect(await $(DatePage.dateyear()).getValue()).to.contain("");

      // When
      await $(DatePage.dateExclusiveIPreferNotToSay()).click();
      await expect(await $(DatePage.dateExclusiveIPreferNotToSay()).isSelected()).to.be.true;

      // Then
      await $(DatePage.submit()).click();

      await expect(await $(SummaryPage.dateExclusiveAnswer()).getText()).to.have.string("I prefer not to say");
      await expect(await $(SummaryPage.dateExclusiveAnswer()).getText()).to.not.have.string("17 March 2018");
    });
  });

  describe("Given the user has not answered the question and the question is optional", () => {
    it("When the user clicks the Continue button, Then it should display `No answer provided`", async () => {
      // Given
      await expect(await $(DatePage.dateday()).getValue()).to.contain("");
      await expect(await $(DatePage.datemonth()).getValue()).to.contain("");
      await expect(await $(DatePage.dateyear()).getValue()).to.contain("");
      await expect(await $(DatePage.dateExclusiveIPreferNotToSay()).isSelected()).to.be.false;

      // When
      await $(DatePage.submit()).click();

      // Then
      await expect(await $(SummaryPage.dateAnswer()).getText()).to.contain("No answer provided");
    });
  });
});
