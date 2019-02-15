import { KeepAwake, registerRootComponent } from 'expo';
import storybook from './storybook';

// eslint-disable-next-line no-undef
if (__DEV__) {
  KeepAwake.activate();
}

registerRootComponent(storybook);
