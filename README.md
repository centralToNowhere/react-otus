# Conway's Game of Life
https://centraltonowhere.github.io/react-otus

![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

## Tests

`npm run test`

```
-----------------------------------|---------|----------|---------|---------|-------------------
File                               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------------|---------|----------|---------|---------|-------------------
All files                          |   98.92 |     92.3 |    98.2 |   98.92 |                   
 src                               |     100 |      100 |     100 |     100 |                   
  App.tsx                          |     100 |      100 |     100 |     100 |                   
 src/Cell                          |     100 |      100 |     100 |     100 |                   
  Cell.ts                          |     100 |      100 |     100 |     100 |                   
 src/auth                          |   98.52 |    83.33 |     100 |   98.52 |                   
  Auth.ts                          |   88.88 |       50 |     100 |   88.88 | 30                
  index.ts                         |       0 |        0 |       0 |       0 |                   
  saga.ts                          |     100 |      100 |     100 |     100 |                   
  selectors.ts                     |     100 |      100 |     100 |     100 |                   
  slice.ts                         |     100 |      100 |     100 |     100 |                   
  useRegistration.tsx              |     100 |       75 |     100 |     100 | 26                
  withAuthProtection.tsx           |     100 |      100 |     100 |     100 |                   
 src/components/Buttons            |     100 |      100 |     100 |     100 |                   
  ButtonGameControl.tsx            |     100 |      100 |     100 |     100 |                   
  FormButton.tsx                   |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/Error              |     100 |      100 |     100 |     100 |                   
  Error.tsx                        |     100 |      100 |     100 |     100 |                   
 src/components/Fields             |   98.18 |    95.83 |     100 |   98.18 |                   
  FieldHandlers.ts                 |   96.42 |       90 |     100 |   96.42 | 41                
  InputField.tsx                   |     100 |      100 |     100 |     100 |                   
  LabelField.tsx                   |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
  saga.ts                          |     100 |      100 |     100 |     100 |                   
  selectors.ts                     |     100 |      100 |     100 |     100 |                   
  slice.ts                         |     100 |      100 |     100 |     100 |                   
 src/components/Fields/Capacity    |     100 |      100 |     100 |     100 |                   
  FieldCapacity.tsx                |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/Fields/CellSize    |     100 |      100 |     100 |     100 |                   
  FieldCellSize.tsx                |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/Fields/FieldError  |   71.42 |    33.33 |   33.33 |   71.42 |                   
  FieldError.tsx                   |   71.42 |    33.33 |   33.33 |   71.42 | 20-21             
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/Fields/MaxHeight   |     100 |      100 |     100 |     100 |                   
  FieldMaxHeight.tsx               |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/Fields/MaxWidth    |     100 |      100 |     100 |     100 |                   
  FieldMaxWidth.tsx                |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/Fields/Speed       |     100 |      100 |     100 |     100 |                   
  FieldSpeed.tsx                   |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/FocusableSeparator |   96.77 |    86.36 |     100 |   96.77 |                   
  FocusableSeparator.tsx           |   96.77 |    86.36 |     100 |   96.77 | 20,96             
 src/components/Form               |     100 |      100 |   94.73 |     100 |                   
  Form.tsx                         |     100 |      100 |     100 |     100 |                   
  FormContainer.tsx                |     100 |      100 |   94.11 |     100 |                   
  FormElement.tsx                  |     100 |      100 |     100 |     100 |                   
  FormError.tsx                    |     100 |      100 |     100 |     100 |                   
  FormField.tsx                    |     100 |      100 |     100 |     100 |                   
  FormGroup.tsx                    |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/GameField          |     100 |    91.66 |     100 |     100 |                   
  GameField.tsx                    |     100 |    83.33 |     100 |     100 | 125-126           
  index.ts                         |       0 |        0 |       0 |       0 |                   
  selectors.ts                     |     100 |      100 |     100 |     100 |                   
  slice.ts                         |     100 |      100 |     100 |     100 |                   
 src/components/InfoContainer      |     100 |      100 |     100 |     100 |                   
  Info.tsx                         |     100 |      100 |     100 |     100 |                   
  InfoContainer.tsx                |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/List               |     100 |      100 |     100 |     100 |                   
  List.tsx                         |     100 |      100 |     100 |     100 |                   
 src/components/PlayerBlock        |     100 |      100 |     100 |     100 |                   
  PlayerBlock.tsx                  |     100 |      100 |     100 |     100 |                   
  PlayerBlockContainer.tsx         |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/components/RegistrationForm   |     100 |      100 |     100 |     100 |                   
  RegistrationForm.tsx             |     100 |      100 |     100 |     100 |                   
  RegistrationFormContainer.tsx    |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/l10n                          |     100 |      100 |     100 |     100 |                   
  ru.ts                            |     100 |      100 |     100 |     100 |                   
 src/player                        |     100 |      100 |     100 |     100 |                   
  Player.ts                        |     100 |      100 |     100 |     100 |                   
 src/routes                        |     100 |      100 |     100 |     100 |                   
  AppRouter.tsx                    |     100 |      100 |     100 |     100 |                   
  basename.ts                      |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
  routeNames.ts                    |     100 |      100 |     100 |     100 |                   
 src/screens/Game                  |   98.46 |       90 |   94.44 |   98.46 |                   
  Game.tsx                         |     100 |       50 |     100 |     100 | 27                
  GameContainer.tsx                |   96.55 |      100 |    90.9 |   96.55 | 49                
  index.ts                         |       0 |        0 |       0 |       0 |                   
  saga.ts                          |     100 |      100 |     100 |     100 |                   
 src/screens/RegistrationScreen    |     100 |      100 |     100 |     100 |                   
  RegistrationScreen.tsx           |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/storage                       |     100 |      100 |     100 |     100 |                   
  Storage.ts                       |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
 src/store/redux                   |     100 |      100 |     100 |     100 |                   
  store.ts                         |     100 |      100 |     100 |     100 |                   
 src/styles                        |     100 |      100 |     100 |     100 |                   
  ui-styled.ts                     |     100 |      100 |     100 |     100 |                   
 src/utils                         |     100 |    97.01 |     100 |     100 |                   
  CellGenerator.ts                 |     100 |      100 |     100 |     100 |                   
  Debounce.ts                      |     100 |    66.66 |     100 |     100 | 10                
  FieldSize.ts                     |     100 |      100 |     100 |     100 |                   
  TouchDeviceDetection.ts          |     100 |      100 |     100 |     100 |                   
  Validators.ts                    |     100 |      100 |     100 |     100 |                   
  index.ts                         |       0 |        0 |       0 |       0 |                   
  test-utils.tsx                   |     100 |        0 |     100 |     100 | 14                
-----------------------------------|---------|----------|---------|---------|-------------------
Test Suites: 32 passed, 32 total
Tests:       232 passed, 232 total
Snapshots:   16 passed, 16 total
Time:        9.871 s, estimated 14 s
```
 <!--
![Branches](./coverage/badge-statements.svg)
![Branches](./coverage/badge-lines.svg)
![Branches](./coverage/badge-functions.svg)
![Branches](./coverage/badge-branches.svg)
-->
[Stryker](https://stryker-mutator.io/)

`npx stryker run`

https://dashboard.stryker-mutator.io/reports/github.com/centralToNowhere/react-otus/develop#mutant

[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FcentralToNowhere%2Freact-otus%2Fdevelop)](https://dashboard.stryker-mutator.io/reports/github.com/centralToNowhere/react-otus/develop)

## Run

`npm i`<br>
`npm run serve`
