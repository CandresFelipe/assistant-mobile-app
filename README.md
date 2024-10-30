# assistant-mobile-app
App to support assitance for participants or speakers.

## Installation

- In order to make it run on your machine you need to have installed some tools.

- [Install java](https://www.oracle.com/java/technologies/downloads/)
- [Install Android Studio](https://developer.android.com/studio/install)
- [Install Xcode](https://developer.apple.com/xcode/resources/)
- [Install node](https://nodejs.org/en/download/prebuilt-installer/current)
- [Install expo](https://nodejs.org/en/download/prebuilt-installer/current)


1. after the previous installations, you need to make sure the variables environment from android studio and xcode are in your file `~/.zshrc` or `~/.bashrc`.

Make sure they are pointing to the right path, for Android, you need to point to (This are the example for a Mac):

```
export ANDROID_HOME="$HOME/Library/Android/Sdk"
```
```
export PATH="$HOME/Library/Android/Sdk/Platform-tools:$PATH"
```
Then 
```
source ~/.zshrc
```
2. After installing expo and node, you can eventually open an android emulator using the device manager form Android studio.

### Run the app

1. You need to setup some local envs in `.env`.

```
EXPO_PUBLIC_API_URL=http://167.88.39.127:8000
```

2. For running the project you simply need to run this commands:

```
yarn install
```

```
npx expo start -c
```