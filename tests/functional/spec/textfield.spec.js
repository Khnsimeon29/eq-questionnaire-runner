import TextFieldPage from "../generated_pages/textfield/name-block.page.js";
import SubmitPage from "../generated_pages/textfield/submit.page.js";

describe("Textfield", () => {
  it("Given a textfield option, a user should be able to click the label of the textfield to focus", async () => {
    await browser.openQuestionnaire("test_textfield.json");
    await $(TextFieldPage.nameLabel()).click();
    await expect(await $(TextFieldPage.name()).isFocused()).to.be.true;
  });

  it("Given a text entered in textfield , When user submits and revisits the textfield, Then the textfield must contain the text entered previously", async () => {
    await browser.openQuestionnaire("test_textfield.json");
    await $(TextFieldPage.name()).setValue("'Twenty><&Five'");
    await $(TextFieldPage.submit()).click();
    await expect(await browser.getUrl()).to.contain(SubmitPage.pageName);
    await expect(await $(SubmitPage.nameAnswer()).getText()).to.contain("Twenty><&Five'");
    await $(SubmitPage.nameAnswerEdit()).click();
    await $(TextFieldPage.name()).getValue();
  });

  it("Given the string entered to the textfield is too long, When the user submits, then the correct error message is displayed", async () => {
    await browser.openQuestionnaire("test_textfield.json");
    await $(TextFieldPage.name()).setValue("This string is too long");
    await $(TextFieldPage.submit()).click();
    await expect(await $(TextFieldPage.errorNumber(1)).getText()).to.contain("You have entered too many characters. Enter up to 20 characters");
  });
});
