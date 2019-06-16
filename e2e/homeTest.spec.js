const { reloadApp } = require('detox-expo-helpers');

beforeAll(async () => {
  await reloadApp();
});

describe('Bottom tab', () => {
  it('should navigate each screen', async () => {
    await element(by.id('habit'))
      .atIndex(0)
      .tap();
    await element(by.id('setting'))
      .atIndex(0)
      .tap();
    await element(by.id('home'))
      .atIndex(0)
      .tap();
  });
});
