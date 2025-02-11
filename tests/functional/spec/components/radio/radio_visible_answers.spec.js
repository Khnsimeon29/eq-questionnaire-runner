import RadioVisibleTruePage from "../../../generated_pages/radio_detail_answer_visible/radio-visible-true.page.js";
import RadioVisibleFalsePage from "../../../generated_pages/radio_detail_answer_visible/radio-visible-false.page.js";
import RadioVisibleNonePage from "../../../generated_pages/radio_detail_answer_visible/radio-visible-none.page.js";

describe("Given I start a Radio survey with a write-in option", () => {
  beforeEach(async () => {
    await browser.openQuestionnaire("test_radio_detail_answer_visible.json");
  });

  it("When I view a write-in radio and the visible option is set to true, Then the detail answer label should be displayed", async () => {
    await expect(await $(RadioVisibleTruePage.otherDetail()).isDisplayed()).to.equal(true);
  });

  it("When I view a write-in radio and the visible option is set to true, Then after choosing non write-in option the detail answer label should be displayed", async () => {
    await $(RadioVisibleTruePage.coffee()).click();
    await expect(await $(RadioVisibleTruePage.otherDetail()).isDisplayed()).to.equal(true);
  });

  it("When I view a write-in radio and the visible option is set to false, Then the detail answer label should not be displayed", async () => {
    await $(RadioVisibleTruePage.coffee()).click();
    await $(RadioVisibleTruePage.submit()).click();
    await expect(await $(RadioVisibleFalsePage.otherDetail()).isDisplayed()).to.equal(false);
  });

  it("When I view a write-in radio and the visible option is not set, Then the detail answer label should not be displayed", async () => {
    await $(RadioVisibleTruePage.coffee()).click();
    await $(RadioVisibleFalsePage.submit()).click();
    await $(RadioVisibleFalsePage.iceCream()).click();
    await $(RadioVisibleFalsePage.submit()).click();
    await expect(await $(RadioVisibleNonePage.otherDetail()).isDisplayed()).to.equal(false);
  });
});
