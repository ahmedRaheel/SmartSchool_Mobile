# SmartSchool Mobile v2

Professional React Native + TypeScript + Expo client for the SmartSchool SaaS platform.

## Functional mobile scope

Dashboard, Students, Academics, Teachers, Examinations, Attendance, Finance, HR & Payroll, Library, Transport, Communication, AI Intelligence, Reports and Settings are included. The mobile client also provides global search, notifications, parent-teacher chat, student detail, AI Tutor/grade-prediction mock experiences and role-aware login.

Generic module records now support a real local lifecycle: create, search, open, edit, save, reopen and delete. Changes, notification read state and sent chat messages persist through app restarts using AsyncStorage.

## Demo login

Email: `admin@smartschool.demo`
Password: `SmartSchool@2026`

## Install

```powershell
npm install
npx expo install --fix
```

## Run web

```powershell
npx expo start --web --clear
```

The web dependencies `react-dom`, `react-native-web`, `@expo/metro-runtime`, `expo-font` and `expo-asset` are declared to avoid the Metro web-resolution problem encountered in the earlier version.

## Run Android

```powershell
npx expo start --android
```

or run `npx expo start` and scan the QR code with Expo Go.

## Backend integration

The app remains decoupled from the backend. Replace the mock persistence implementation behind application state with SmartSchool .NET API adapters and IdentityServer/OIDC without rewriting presentation screens.
