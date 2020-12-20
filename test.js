let questions = [
  {
    text: 'Какую цель вы хотели бы достичь с помощью продуктов Biogena?',
    answers: [
      'Укрепление иммунной системы',
      'Здоровое пищеварение',
      'Движение без боли',
      'Улучшение качества сна',
      'Поддержание оптимального уровня здоровья',
      'Повышение работоспособности',
    ]
  },
  {
    text: 'Выберите ваш пол',
    answers: [
      'Женский',
      'Мужской'
    ]
  },
  {
    text: 'Сколько вам лет?',
    answers: [
      '15-30 лет',
      '31-50 лет',
      '51-70 лет',
    ]
  },
  {
    text: 'Каковы ваши пищевые привычки?',
    answers: [
      'Веганская диета',
      'Вегетарианская диета',
      'Смешанный режим питания',
      'Рацион, основанный на большом потреблении мясных продуктов',
    ]
  },
  {
    text: 'Каков уровень вашей физической нагрузки?',
    answers: [
      'Сидячий образ жизни',
      'Физические тренировки один раз в неделю',
      'Физические тренировки несколько раз в неделю',
    ]
  },
  {
    text: 'Как бы вы определили свой уровень стресса?',
    answers: [
      'Отсутствие стресса',
      'Нормальный уровень стресса',
      'Слегка повышенный уровень стресса',
      'Экстремальный уровень стресса',
    ]
  },
  {
    text: 'Как вы оцениваете качество вашего сна?',
    answers: [
      'Хорошее качество сна',
      'Среднее качество сна',
      'Плохое качество сна',
    ]
  },
  {
    text: 'Как бы вы описали свою повседневную жизнь?',
    answers: [
      'Часто в разъездах',
      'В основном сидя в помещении',
      'В основном на открытом воздухе',
      'Напряженный день с разнообразными видами деятельности',
    ]
  },
  {
    text: 'Вы уже когда-нибудь покупали продукты Biogena?',
    answers: [
      'Да, несколько раз',
      'Нет, еще нет',
    ]
  },
];

let currQues = 0;
let openedQues = 0;
let result = [];
createTestBlock();

let restart = document.querySelector('.test-restart');
restart.addEventListener('click', function() {
  currQues = 0;
  openedQues = 0;
  result = [];
  createTestBlock();
  updateNav();
});

let navList = document.querySelector('.test-nav__list');
for (let i = 0; i < questions.length; i++) {
  let item = document.createElement('div');
  item.classList.add('test-nav__list__item');
  if (i == 0) {
    item.classList.add('test-nav__list__item_active');
  }
  item.innerHTML = i + 1;
  navList.append(item);
}
let last = document.createElement('div');
last.classList.add('test-nav__list__item');
last.innerHTML = '✓';
navList.append(last);

let next = document.querySelector('.js-nav-next');
next.addEventListener('click', function() {
  if (currQues < openedQues) {
    currQues++;
    createTestBlock();
    updateNav();
  }
});

let prev = document.querySelector('.js-nav-prev');
prev.addEventListener('click', function() {
    currQues--;
    createTestBlock();
    updateNav();
});

function createTestBlock() {

  let questionBlock = document.querySelector('.test__block');
  questionBlock.classList.remove('test__block_hidden');

  let current = questionBlock.querySelector('.test__counter_current');
  current.innerHTML = currQues + 1;
  let all = questionBlock.querySelector('.test__counter_all');
  all.innerHTML = questions.length;

  let questionText = questionBlock.querySelector('.test-question');
  let questionRow = questionBlock.querySelector('.test__row');
  if (questionText) {
    questionText.remove();
  }
  if (questionRow) {
    questionRow.remove();
  }

  questionText = document.createElement('div');
  questionText.classList.add('test-question');
  questionText.innerHTML = questions[currQues].text;

  questionRow = document.createElement('div');
  questionRow.classList.add('test__row');
  for (let answer of questions[currQues].answers) {
    let item = document.createElement('div');
    item.classList.add('test__item');
    let button = document.createElement('div');
    button.classList.add('test__button', 'js-button');
    button.innerHTML = answer;
    item.append(button);
    questionRow.append(item);
  }
  questionRow.addEventListener('click', function(event) {
    if (event.target.classList.contains('js-button')) {
      result[currQues] = event.target.textContent;
      currQues++;
      if (currQues == questions.length) {
        questionBlock.classList.add('test__block_hidden');
        console.log(result);
      } else {
        createTestBlock();
      }
      updateNav();
      if (currQues > openedQues) {
        openedQues = currQues;
      }
    }
  });

  questionBlock.append(questionText, questionRow);

}

function updateNav() {

  let nav = document.querySelector('.test-nav');
  if (currQues == questions.length) {
    nav.classList.add('test-nav_hidden');
  } else {
    nav.classList.remove('test-nav_hidden');
  }

  let items = nav.querySelectorAll('.test-nav__list__item');
  for (let i = 0; i < items.length; i++) {
    if (i <= currQues) {
      items[i].classList.add('test-nav__list__item_active');
    } else {
      items[i].classList.remove('test-nav__list__item_active');
    }
  }

  let next = document.querySelector('.js-nav-next');
  if (currQues == questions.length - 1) {
    next.classList.add('test-nav__button_hidden');
  } else {
    next.classList.remove('test-nav__button_hidden');
  }

  let prev = document.querySelector('.js-nav-prev');
  if (currQues == 0) {
    prev.classList.add('test-nav__button_hidden');
  } else {
    prev.classList.remove('test-nav__button_hidden');
  }

}
