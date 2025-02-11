const checkPeopleInList = async (peopleExpected, listLabel) => {
  await $(listLabel(1)).waitForDisplayed();

  for (let i = 1; i <= peopleExpected.length; i++) {
    await expect(await $(listLabel(i)).getText()).to.equal(peopleExpected[i - 1]);
  }
};

export default checkPeopleInList;
