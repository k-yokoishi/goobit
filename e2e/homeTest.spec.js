const { reloadApp } = require('detox-expo-helpers');

beforeAll(async () => {
  await reloadApp();
});

describe('Home', () => {
  it('should have set goal', async () => {
    // FIXME: Get multiple element though specify ID
    await element(by.id('goal'))
      .atIndex(0)
      .tap();
    await element(by.id('goalSetting')).tap();
    await element(by.id('goalSetting')).typeText('New My Goal\n');
    await element(by.id('setGoalButton')).tap();
    // FIXME: Get multiple element though specify ID
    await element(by.id('home'))
      .atIndex(0)
      .tap();
    await expect(element(by.text('New My Goal'))).toExist();
  });
});

describe('Bottom tab', () => {
  it('should navigate each screen', async () => {
    await element(by.id('goal'))
      .atIndex(0)
      .tap();
    await element(by.id('habit'))
      .atIndex(0)
      .tap();
    await element(by.id('setting'))
      .atIndex(0)
      .tap();
    await element(by.id('home'))
      .atIndex(0)
      .tap();
    await element(by.id('goal'))
      .atIndex(0)
      .tap();
  });
});
