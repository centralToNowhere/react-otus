export const l10n = {
  maxWidthLabel: "Макс. ширина:",
  maxHeightLabel: "Макс. высота:",
  cellSizeLabel: "Размер ячейки:",
  capacityLabel: "Процент заполненности:",
  speedLabel: "Обновлений в секунду:",
  buttonStart: "Старт",
  buttonStop: "Стоп",
  buttonReset: "Сброс",
  buttonGenerateRandom: "Создать",

  // Экран регистрации
  gameHeadingPart1: "Conway's",
  gameHeadingPart2: "Game of Life",
  buttonStartGameAsPlayer: "Начать игру",
  rulesHeading: "Правила",

  // Контейнер игрока
  registerPlayerLabel: "Введите имя игрока",
  logoutButton: "Выйти",
  statistics: "Статистика",
  score: "Очки:",
  clicksCount: "Количество кликов:",

  // Правила
  rule1:
    "Место действия этой игры — «вселенная» — это размеченная на клетки поверхность или плоскость — безграничная, ограниченная, или замкнутая (в пределе — бесконечная плоскость).",
  rule2:
    "Каждая клетка на этой поверхности может находиться в двух состояниях: быть «живой» (заполненной) или быть «мёртвой» (пустой). Клетка имеет восемь соседей, окружающих её.",
  rule3:
    "Распределение живых клеток в начале игры называется первым поколением. Каждое следующее поколение рассчитывается на основе предыдущего по таким правилам:",
  rule3_1:
    "в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь",
  rule3_2:
    "если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»)",
  rule4: "Игра прекращается, если:",
  rule4_1: "на поле не останется ни одной «живой» клетки",
  rule4_2:
    "конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)",
  rule4_3:
    "при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная конфигурация; предыдущее правило, вырожденное до одного шага назад)",
};
