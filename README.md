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
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   99.08 |    93.56 |   98.21 |   99.07 |                   
 src               |     100 |      100 |     100 |     100 |                   
  App.tsx          |     100 |      100 |     100 |     100 |                   
 src/Cell          |     100 |      100 |     100 |     100 |                   
  Cell.ts          |     100 |      100 |     100 |     100 |                   
 src/auth          |   98.52 |    83.33 |     100 |   98.52 |                   
  Auth.ts          |   88.88 |       50 |     100 |   88.88 | 30                
  index.ts         |       0 |        0 |       0 |       0 |                   
  saga.ts          |     100 |      100 |     100 |     100 |                   
  selectors.ts     |     100 |      100 |     100 |     100 |                   
  slice.ts         |     100 |      100 |     100 |     100 |                   
  ...istration.tsx |     100 |       75 |     100 |     100 | 26                
  ...rotection.tsx |     100 |      100 |     100 |     100 |                   
 ...onents/Buttons |     100 |      100 |     100 |     100 |                   
  ...meControl.tsx |     100 |      100 |     100 |     100 |                   
  FormButton.tsx   |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...mponents/Error |     100 |      100 |     100 |     100 |                   
  Error.tsx        |     100 |      100 |     100 |     100 |                   
 ...ponents/Fields |     100 |      100 |     100 |     100 |                   
  FieldHandlers.ts |     100 |      100 |     100 |     100 |                   
  InputField.tsx   |     100 |      100 |     100 |     100 |                   
  LabelField.tsx   |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
  saga.ts          |     100 |      100 |     100 |     100 |                   
  selectors.ts     |     100 |      100 |     100 |     100 |                   
  slice.ts         |     100 |      100 |     100 |     100 |                   
 ...ields/Capacity |     100 |      100 |     100 |     100 |                   
  ...dCapacity.tsx |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...ields/CellSize |     100 |      100 |     100 |     100 |                   
  ...dCellSize.tsx |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...lds/FieldError |   71.42 |    33.33 |   33.33 |   71.42 |                   
  FieldError.tsx   |   71.42 |    33.33 |   33.33 |   71.42 | 20-21             
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...elds/MaxHeight |     100 |      100 |     100 |     100 |                   
  ...MaxHeight.tsx |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...ields/MaxWidth |     100 |      100 |     100 |     100 |                   
  ...dMaxWidth.tsx |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...s/Fields/Speed |     100 |      100 |     100 |     100 |                   
  FieldSpeed.tsx   |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...sableSeparator |   96.77 |    90.47 |     100 |   96.77 |                   
  ...Separator.tsx |   96.77 |    90.47 |     100 |   96.77 | 21,97             
 ...omponents/Form |     100 |      100 |   94.73 |     100 |                   
  Form.tsx         |     100 |      100 |     100 |     100 |                   
  ...Container.tsx |     100 |      100 |   94.11 |     100 |                   
  FormElement.tsx  |     100 |      100 |     100 |     100 |                   
  FormError.tsx    |     100 |      100 |     100 |     100 |                   
  FormField.tsx    |     100 |      100 |     100 |     100 |                   
  FormGroup.tsx    |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...ents/GameField |     100 |    91.66 |     100 |     100 |                   
  GameField.tsx    |     100 |    83.33 |     100 |     100 | 125-126           
  index.ts         |       0 |        0 |       0 |       0 |                   
  selectors.ts     |     100 |      100 |     100 |     100 |                   
  slice.ts         |     100 |      100 |     100 |     100 |                   
 .../InfoContainer |     100 |      100 |     100 |     100 |                   
  Info.tsx         |     100 |      100 |     100 |     100 |                   
  ...Container.tsx |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...omponents/List |     100 |      100 |     100 |     100 |                   
  List.tsx         |     100 |      100 |     100 |     100 |                   
 ...ts/PlayerBlock |     100 |      100 |     100 |     100 |                   
  PlayerBlock.tsx  |     100 |      100 |     100 |     100 |                   
  ...Container.tsx |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...gistrationForm |     100 |      100 |     100 |     100 |                   
  ...ationForm.tsx |     100 |      100 |     100 |     100 |                   
  ...Container.tsx |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 src/l10n          |     100 |      100 |     100 |     100 |                   
  ru.ts            |     100 |      100 |     100 |     100 |                   
 src/player        |     100 |      100 |     100 |     100 |                   
  Player.ts        |     100 |      100 |     100 |     100 |                   
 src/routes        |     100 |      100 |     100 |     100 |                   
  AppRouter.tsx    |     100 |      100 |     100 |     100 |                   
  basename.ts      |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
  routeNames.ts    |     100 |      100 |     100 |     100 |                   
 src/screens/Game  |   98.46 |       90 |   94.44 |   98.46 |                   
  Game.tsx         |     100 |       50 |     100 |     100 | 27                
  ...Container.tsx |   96.55 |      100 |    90.9 |   96.55 | 49                
  index.ts         |       0 |        0 |       0 |       0 |                   
  saga.ts          |     100 |      100 |     100 |     100 |                   
 ...strationScreen |     100 |      100 |     100 |     100 |                   
  ...ionScreen.tsx |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 src/storage       |     100 |      100 |     100 |     100 |                   
  Storage.ts       |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
 src/store/redux   |     100 |      100 |     100 |     100 |                   
  store.ts         |     100 |      100 |     100 |     100 |                   
 src/styles        |     100 |      100 |     100 |     100 |                   
  ui-styled.ts     |     100 |      100 |     100 |     100 |                   
 src/utils         |     100 |    97.01 |     100 |     100 |                   
  CellGenerator.ts |     100 |      100 |     100 |     100 |                   
  Debounce.ts      |     100 |    66.66 |     100 |     100 | 10                
  FieldSize.ts     |     100 |      100 |     100 |     100 |                   
  ...eDetection.ts |     100 |      100 |     100 |     100 |                   
  Validators.ts    |     100 |      100 |     100 |     100 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
  test-utils.tsx   |     100 |        0 |     100 |     100 | 14                
-------------------|---------|----------|---------|---------|-------------------
Test Suites: 33 passed, 33 total
Tests:       255 passed, 255 total
Snapshots:   16 passed, 16 total
Time:        10.934 s

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
