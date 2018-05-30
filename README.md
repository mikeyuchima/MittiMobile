# MittiMobileSrc

## Initial setup (Android / IOS)

1.  Clone this repo

```sh
$ git clone git@gitlab.com:cujo/MittiMobileSrc.git MyMittiMobile
```

2.  Create React Native Container Project

```sh
$ react-native init --version="0.55.4" MittiMobile
```

3.  Copy over all the container files into the project directory

```sh
rsync -av \
--exclude='.git' \
--exclude='node_modules' \
--exclude='index.js' \
--exclude='App.js' \
--exclude='.gitignore' \
MittiMobile/ MyMittiMobile
```

4.  Install npm/yarn the dependencies

First, Change to project directory

```
cd MyMittiMobile
```

```sh
yarn add moment@2.22.1 react-native-animatable@1.2.4 react-native-aws3@0.0.8 react-native-drawer@2.5.0 react-native-geocoder@0.5.0 react-native-image-picker@0.26.10 react-native-maps@0.21.0 react-native-modal-datetime-picker@5.1.0 react-native-onesignal@3.2.4 react-native-router-flux@4.0.0-beta.31 react-native-snackbar@0.4.7 react-native-swiper@1.5.13 react-native-vector-icons@4.6.0 react-redux@5.0.7 redux@4.0.0 redux-logger@3.0.6 redux-thunk@2.3.0
```

5.  Link

```sh
$ react-native link
```

6.  Create `config.js` from `config.example.js` and fill up the keys (Ask)

```sh
$ cp config.js.example config.js
```
