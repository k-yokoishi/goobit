[![Build Status](https://travis-ci.com/k-yokoishi/goobit.svg?branch=master)](https://travis-ci.com/k-yokoishi/goobit)

# Goobit

iOS app to make your Good Habit!

It hasn't been released yet, but can be tried with [Expo CDN](https://expo.io/@k-yokoishi/goobit).

## How to develop Goobit

### Prerequisites
* Mac with macOS (at least macOS El Capitan 10.11)
* Xcode 8.3+ with Xcode command line tools
* Node 8.3.0 or above

### Installation

* [Expo](https://expo.io/) is used to manage this app

  ```sh
  npm install -g expo-cli
  ```

* Install dependencies

  ```sh
  yarn install
  ```

### Development
* (Optional) Launch [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
  ```sh
  yarn rndebugger
  ```

  Note: please enable remote debugging in the expo app


* Launch expo server

  ```sh
  yarn start
  # or if you launch server with iOS simulator
  yarn ios
  ```

* (Optional) Show [Storybook](https://storybook.js.org/basics/guide-react-native) if you check the each component
  * Can't up and run Storybook server with expo server (launched by `yarn start`) simultaneously

  ```
  yarn storybook
  ```

### Testing
* Unit tests (now including component tests)

  ```sh
  yarn test
  ```

* E2E tests
  * [Detox](https://github.com/wix/Detox) is used for E2E testing
  * To download [iOS IPA](https://expo.io/tools#client), run:

    ```sh
    yarn setup-bin
    ```

  * Run E2E tests

    ```sh
    yarn ios # Start simulator in advance
    yarn e2e
    ```

  Note: Disable `Hardware > Keyboard > Connect Hardware Keyboard` in iOS simulator setting to use simulator's keyboard in E2E test.