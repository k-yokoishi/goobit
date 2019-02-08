const { reloadApp } = require('detox-expo-helpers');

describe('Goobit', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should have set goaln', async () => {
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
    // TODO: Make this work
    // await expect(element(by.id('goalText'))).toBeVisible();
    // await expect(element(by.id('goalText'))).toHaveText('New My Goal');
  });
});
