# MittiMobileSrc

## Initial setup (Android / IOS)

1.  Clone this repo

```sh
$ git clone git@gitlab.com:cujo/MittiMobileSrc.git MyMittiMobile
```

2.  Create React Native Container Project

```sh
$ react-native init --version="0.58.5" MittiMobile
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
yarn add moment@2.5.1 react-native-animatable@1.3.1 react-native-aws3@0.0.8 react-native-drawer@2.5.1 react-native-geocoder@0.5.0 react-native-image-picker@0.28.0 react-native-maps@0.23.0 react-native-modal-datetime-picker@6.0.0 react-native-onesignal@3.2.12 react-native-snackbar@0.5.5 react-native-swiper@1.5.14 react-native-vector-icons@6.3.0 react-redux@6.0.1 redux@4.0.1 redux-logger@3.0.6 redux-thunk@2.3.0 react-navigation@3.3.0 react-navigation-redux-helpers@3.0.0 react-native-router-flux@4.0.6
yarn add --dev @babel/core@7.3.3
```

5.  Link

```sh
$ react-native link
```

6.  Create `config.js` from `config.example.js` and fill up the keys (Ask)

```sh
$ cp config.js.example config.js
```

## Android setup

1.  Create new keystore and place it in `android/app` directory
    https://facebook.github.io/react-native/docs/signed-apk-android.html

```sh
$ cd android/app
$ keytool -genkey -v -keystore mitti-mobile-release-key.keystore -alias mitti-mobile-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

When asked for password enter: password

For production release key, ask Alex

2.  Update `android/gradle.properties`

3.  Update `android/build.gradle`

```
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
        maven {
            url 'https://maven.google.com/'
            name 'Google'
        }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.1' // <---- UPDATE GRADLE

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        mavenLocal()
        google() // <----- ADD THIS
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
        maven {
            url 'https://maven.google.com/'
            name 'Google'
        }
    }
}

ext {
    buildToolsVersion = "27.0.2"
    minSdkVersion = 16
    compileSdkVersion = 27
    targetSdkVersion = 27
    supportLibVersion = "27.0.2"
}
```

4.  Update `android/gradle/wrapper/gradle-wrapper.properties`

```
distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip
```

5.  Update `android/app/src/main/AndroidManifest.xml`

For react-native-maps, add this to child of application

```
<application>
    <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
    <meta-data
      android:name="com.google.android.geo.API_KEY"
      android:value="Your Google maps API Key Here"/>
</application>
```

For react-native-onesignal and react-image-picker, add this:

```
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/> <!-- Approximate location - If you want to use promptLocation for letting OneSignal know the user location. -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/> <!--  Precise location If you want to use promptLocation for letting OneSignal know the user location. -->
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

<application ....>
  <activity
    android:name=".MainActivity"
    android:label="OneSignal Example"
    android:launchMode="singleTop"> <!-- Add this attribute to your main activity -->
  </activity>
    .....
```

6.  On `android/app/build.gradle`

For react-native-vector-icons, add this:

```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

For react-native-onesignal, add this to the very top:

```
buildscript {
    repositories {
        maven { url 'https://plugins.gradle.org/m2/' } // Gradle Plugin Portal
    }
    dependencies {
        classpath 'gradle.plugin.com.onesignal:onesignal-gradle-plugin:[0.10.0, 0.99.99]'
    }
}

apply plugin: 'com.onesignal.androidsdk.onesignal-gradle-plugin'
```

For release, add signingConfigs section on top of buildTypes and add below parameter inside
buildTypes:

```
    signingConfigs {
        release {
            storeFile file(MITTI_MOBILE_RELEASE_STORE_FILE)
            storePassword MITTI_MOBILE_RELEASE_STORE_PASSWORD
            keyAlias MITTI_MOBILE_RELEASE_KEY_ALIAS
            keyPassword MITTI_MOBILE_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            signingConfig signingConfigs.release // <----- ADD THIS
        }
    }
```

7.  Create `~/.gradle/gradle.properties`

```
MITTI_MOBILE_RELEASE_STORE_FILE=mitti-mobile-release-key.keystore
MITTI_MOBILE_RELEASE_KEY_ALIAS=mitti-mobile-key-alias
MITTI_MOBILE_RELEASE_STORE_PASSWORD=password
MITTI_MOBILE_RELEASE_KEY_PASSWORD=password
```

8.  Run build

```sh
$ react-native run-android
```

## Android Deployment

1.  Update the splash screen?

2.  Update the app icon

3.  Update `./config.js` to use production url and set `DEBUG_MODE = false;`

4.  Make sure the onesignal app id in `~/.gradle/gradle.properties` is the production app id

5.  Make sure the key in `~/.gradle/gradle.properties` is the production key

## Testing location with Virtual Device

Simulate location from terminal:

```
# Get your auth token at
$ cat ~/.emulator_console_auth_token
$ telnet localhost 5554
auth <token>
geo fix -79.380319 43.653982
```
