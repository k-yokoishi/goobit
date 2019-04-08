# Goobit

iOS app to make your Good Habit!

## How to develop Goobit

### Prerequisites
* Mac with macOS (at least macOS El Capitan 10.11)
* Xcode 8.3+ with Xcode command line tools
* Node 8.3.0 or above

### Installation

* [Expo](https://expo.io/) is used to create this app

  ```
  npm install -g expo-cli
  ```

* [Detox](https://github.com/wix/Detox) for E2E testing
  * [See Usage with Expo (iOS)](https://github.com/wix/Detox/blob/master/docs/Guide.Expo.md)
  * Download [iOS IPA](https://expo.io/tools#client), unzip and rename the folder to `Exponent.app`.
  * Make directory `goobit/bin` and put `Exponent.app` there.

* Install dependencies

  ```
  yarn install
  ```

### Development
* (Optional) Launch [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
  ```
  yarn rndebugger
  ```

  Note: please enable remote debugging in the expo app


* Launch expo server

  ```
  yarn start
  # or if you launch server with iOS simulator
  yarn ios
  ```

  Note: Run `open -a Simulator` before yarn start if XCode is 10.2
  to avoid issue https://github.com/facebook/react-native/issues/23878

* (Optional) Show [Storybook](https://storybook.js.org/basics/guide-react-native) if you check the each component
  * Can't up and run Storybook server with expo server (launched by `yarn start`) simultaneously

  ```
  yarn storybook
  ```

### Testing
* Unit tests (now including component tests)

  ```
  yarn test
  ```

* E2E tests

  **Currently E2E tests don't work due to issue https://github.com/facebook/react-native/issues/23878**

  ```
  yarn ios
  yarn e2e
  ```

  Note: Disable `Hardware > Keyboard > Connect Hardware Keyboard` in iOS simulator setting to use simulator's keyboard in E2E test.