# SmartSchool Mobile

React Native / Expo mobile application matching the SmartSchool web portal domain and mock-first architecture.

## Architecture
- React Native + TypeScript + Expo
- React Navigation native stack + bottom tabs
- Feature/module-oriented screens
- Mock data separated from API client abstractions
- AsyncStorage session persistence
- Backend-ready `ApiClient` / `MockApiClient` boundary
- Same major SmartSchool modules and mock records as the portal

## Implemented mobile flows
- Login/logout and persisted mock session
- Dashboard and priority navigation
- Students: search, list, detail, guardian/attendance/prediction
- Academics
- Teachers
- Examinations
- Attendance
- Finance
- HR & Payroll
- Library
- Transport
- Communication
- AI Intelligence
- Reports
- Settings
- Global cross-module search
- Notifications linking into modules
- Clickable module records with detail screens
- Mock create-record workflows
- AI Tutor chat mock representing RAG/Ollama integration
- Responsive phone/tablet layout foundations

## Demo
`admin@smartschool.demo`
`SmartSchool@2026`

## Run
```bash
npm install
npm start
```

Then use Expo Go, Android emulator, iOS simulator, or Expo web.

## Backend integration
Keep screens/components intact and replace mock calls through `src/services/api` with SmartSchool backend endpoints. Authentication can then be switched to IdentityServer/OIDC without changing domain screens.
