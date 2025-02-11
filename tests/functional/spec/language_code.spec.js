import NamePage from "../generated_pages/language/name-block.page";
import DobPage from "../generated_pages/language/dob-block.page";
import NumberOfPeoplePage from "../generated_pages/language/number-of-people-block.page";
import ConfirmNumberOfPeoplePage from "../generated_pages/language/confirm-number-of-people.page";
import HubPage from "../base_pages/hub.page.js";

const PLURAL_TEST_DATA_SETS = [
  {
    count: 0,
    question_title: {
      en: "0 people live here, is this correct?",
      cy: "Mae 0 person yn byw yma, ydy hyn yn gywir? (zero)",
    },
    answer: {
      en: "Yes, 0 people live here",
      cy: "Ydy, mae 0 person yn byw yma (zero)",
    },
  },
  {
    count: 1,
    question_title: {
      en: "1 person lives here, is this correct?",
      cy: "Mae 1 person yn byw yma, ydy hyn yn gywir? (one)",
    },
    answer: {
      en: "Yes, 1 person lives here",
      cy: "Ydy, mae 1 person yn byw yma (one)",
    },
  },
  {
    count: 2,
    question_title: {
      en: "2 people live here, is this correct?",
      cy: "Mae 2 person yn byw yma, ydy hyn yn gywir? (two)",
    },
    answer: {
      en: "Yes, 2 people live here",
      cy: "Ydy, mae 2 person yn byw yma (two)",
    },
  },
  {
    count: 3,
    question_title: {
      en: "3 people live here, is this correct?",
      cy: "Mae 3 pherson yn byw yma, ydy hyn yn gywir? (few)",
    },
    answer: {
      en: "Yes, 3 people live here",
      cy: "Ydy, mae 3 pherson yn byw yma (few)",
    },
  },
  {
    count: 6,
    question_title: {
      en: "6 people live here, is this correct?",
      cy: "Mae 6 pherson yn byw yma, ydy hyn yn gywir? (many)",
    },
    answer: {
      en: "Yes, 6 people live here",
      cy: "Ydy, mae 6 pherson yn byw yma (many)",
    },
  },
  {
    count: 4,
    question_title: {
      en: "4 people live here, is this correct?",
      cy: "Mae 4 pherson yn byw yma, ydy hyn yn gywir? (other)",
    },
    answer: {
      en: "Yes, 4 people live here",
      cy: "Ydy, mae 4 pherson yn byw yma (other)",
    },
  },
  {
    count: 5,
    question_title: {
      en: "5 people live here, is this correct?",
      cy: "Mae 5 pherson yn byw yma, ydy hyn yn gywir? (other)",
    },
    answer: {
      en: "Yes, 5 people live here",
      cy: "Ydy, mae 5 pherson yn byw yma (other)",
    },
  },
  {
    count: 10,
    question_title: {
      en: "10 people live here, is this correct?",
      cy: "Mae 10 pherson yn byw yma, ydy hyn yn gywir? (other)",
    },
    answer: {
      en: "Yes, 10 people live here",
      cy: "Ydy, mae 10 pherson yn byw yma (other)",
    },
  },
];

describe("Language Code", () => {
  it("Given a launch language of Welsh, I should see Welsh text", async () => {
    await browser.openQuestionnaire("test_language.json", {
      language: "cy",
    });
    await $(HubPage.submit()).click();
    await expect(await $(NamePage.questionText()).getText()).to.contain("Rhowch enw");

    await $(NamePage.firstName()).setValue("Catherine");
    await $(NamePage.lastName()).setValue("Zeta-Jones");
    await $(NamePage.submit()).click();

    await $(DobPage.day()).setValue(25);
    await $(DobPage.month()).setValue(9);
    await $(DobPage.year()).setValue(1969);
    await $(DobPage.submit()).click();

    await $(NumberOfPeoplePage.numberOfPeople()).setValue(0);
    await $(NumberOfPeoplePage.submit()).click();
    await $(ConfirmNumberOfPeoplePage.yes()).click();
    await $(ConfirmNumberOfPeoplePage.submit()).click();

    await expect(await $(HubPage.heading()).getText()).to.contain("Teitl cyflwyno");
    await expect(await $(HubPage.warning()).getText()).to.contain("Rhybudd cyflwyno");
    await expect(await $(HubPage.guidance()).getText()).to.contain("Canllawiau cyflwyno");
    await expect(await $(HubPage.submit()).getText()).to.contain("Botwm cyflwyno");
    await $(HubPage.submit()).click();

    await expect(await browser.getUrl()).to.contain("thank-you");
  });

  it("Given a launch language of English, I should see English text", async () => {
    await browser.openQuestionnaire("test_language.json", {
      language: "en",
    });

    await $(HubPage.submit()).click();
    await expect(await $(NamePage.questionText()).getText()).to.contain("Please enter a name");
    await $(NamePage.firstName()).setValue("Catherine");
    await $(NamePage.lastName()).setValue("Zeta-Jones");
    await $(NamePage.submit()).click();

    await $(DobPage.day()).setValue(25);
    await $(DobPage.month()).setValue(9);
    await $(DobPage.year()).setValue(1969);
    await $(DobPage.submit()).click();

    await $(NumberOfPeoplePage.numberOfPeople()).setValue(0);
    await $(NumberOfPeoplePage.submit()).click();
    await $(ConfirmNumberOfPeoplePage.yes()).click();
    await $(ConfirmNumberOfPeoplePage.submit()).click();

    await expect(await $(HubPage.heading()).getText()).to.contain("Submission title");
    await expect(await $(HubPage.warning()).getText()).to.contain("Submission warning");
    await expect(await $(HubPage.guidance()).getText()).to.contain("Submission guidance");
    await expect(await $(HubPage.submit()).getText()).to.contain("Submission button");
    await $(HubPage.submit()).click();

    await expect(await browser.getUrl()).to.contain("thank-you");
  });

  it("Given a launch language of English, When I select Cymraeg, Then the language should be switched to Welsh", async () => {
    await browser.openQuestionnaire("test_language.json", {
      language: "en",
    });

    await $(HubPage.submit()).click();
    await expect(await $(NamePage.questionText()).getText()).to.contain("Please enter a name");
    await expect(await $("header").getText()).to.contain("Test Language Survey");
    await $(NamePage.switchLanguage("cy")).click();
    await expect(await $(NamePage.questionText()).getText()).to.contain("Rhowch enw");
    await expect(await $("header").getText()).to.contain("Arolwg Iaith Prawf");
    await $(NamePage.switchLanguage("en")).click();

    await $(NamePage.firstName()).setValue("Catherine");
    await $(NamePage.lastName()).setValue("Zeta-Jones");
    await $(NamePage.submit()).click();

    await $(DobPage.day()).setValue(25);
    await $(DobPage.month()).setValue(9);
    await $(DobPage.year()).setValue(1969);
    await $(DobPage.submit()).click();

    await $(NumberOfPeoplePage.numberOfPeople()).setValue(0);
    await $(NumberOfPeoplePage.submit()).click();
    await $(ConfirmNumberOfPeoplePage.yes()).click();
    await $(ConfirmNumberOfPeoplePage.submit()).click();

    await expect(await $(HubPage.heading()).getText()).to.contain("Submission title");
    await expect(await $(HubPage.warning()).getText()).to.contain("Submission warning");
    await expect(await $(HubPage.guidance()).getText()).to.contain("Submission guidance");
    await expect(await $(HubPage.submit()).getText()).to.contain("Submission button");
    await $(HubPage.switchLanguage("cy")).click();
    await expect(await $(HubPage.heading()).getText()).to.contain("Teitl cyflwyno");
    await expect(await $(HubPage.warning()).getText()).to.contain("Rhybudd cyflwyno");
    await expect(await $(HubPage.guidance()).getText()).to.contain("Canllawiau cyflwyno");
    await expect(await $(HubPage.submit()).getText()).to.contain("Botwm cyflwyno");
    await $(HubPage.submit()).click();

    await expect(await browser.getUrl()).to.contain("thank-you");
  });

  it("Given a launch language of Welsh, When I select English, Then the language should be switched to English", async () => {
    await browser.openQuestionnaire("test_language.json", {
      language: "cy",
    });

    await $(HubPage.submit()).click();
    await expect(await $(NamePage.questionText()).getText()).to.contain("Rhowch enw");
    await $(NamePage.switchLanguage("en")).click();
    await expect(await $(NamePage.questionText()).getText()).to.contain("Please enter a name");
  });

  describe("Given a launch language of English and a question with plural forms, When I select switch languages, Then the plural forms are displayed correctly for the chosen language", () => {
    for (const dataSet of PLURAL_TEST_DATA_SETS) {
      const numberOfPeople = dataSet.count;

      it(`Test plural count: ${numberOfPeople}`, async () => {
        await browser.openQuestionnaire("test_language.json", {
          language: "en",
        });

        await $(HubPage.submit()).click();
        await expect(await $(NamePage.questionText()).getText()).to.contain("Please enter a name");
        await $(NamePage.firstName()).setValue("Catherine");
        await $(NamePage.lastName()).setValue("Zeta-Jones");
        await $(NamePage.submit()).click();

        await $(DobPage.day()).setValue(25);
        await $(DobPage.month()).setValue(9);
        await $(DobPage.year()).setValue(1969);
        await $(DobPage.submit()).click();

        await $(NumberOfPeoplePage.numberOfPeople()).setValue(numberOfPeople);
        await $(NumberOfPeoplePage.submit()).click();

        await expect(await $(ConfirmNumberOfPeoplePage.questionText()).getText()).to.contain(dataSet.question_title.en);
        await expect(await $(ConfirmNumberOfPeoplePage.yesLabel()).getText()).to.contain(dataSet.answer.en);

        await $(ConfirmNumberOfPeoplePage.switchLanguage("cy")).click();

        await expect(await $(ConfirmNumberOfPeoplePage.questionText()).getText()).to.contain(dataSet.question_title.cy);
        await expect(await $(ConfirmNumberOfPeoplePage.yesLabel()).getText()).to.contain(dataSet.answer.cy);

        await $(ConfirmNumberOfPeoplePage.yes()).click();
        await $(ConfirmNumberOfPeoplePage.submit()).click();
      });
    }
  });
});
