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


* Launch expo server

  ```
  yarn start
  # or if you launch server with iOS simulator
  yarn ios
  ```

### Testing
* Unit tests (now including component tests)

  ```
  yarn test
  ```

* E2E tests

  ```
  yarn start # if you haven't launch server
  yarn e2e
  ```