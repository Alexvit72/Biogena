export function createTest(questions) {

  let currQues = 0;
  let openedQues = 0;
  let result = [];

  createTestBlock();

  let restart = document.querySelector('.test__restart');
  restart.addEventListener('click', function() {
    currQues = 0;
    openedQues = 0;
    result = [];
    updateTestBlock();
    updateNav();
  });

  let navList = document.querySelector('.test-nav__list');
  for (let i = 0; i < questions.length; i++) {
    let item = document.createElement('div');
    item.classList.add('test-nav__list__item');
    if (i == 0) {
      item.classList.add('test-nav__list__item_active');
    }
    item.textContent = i + 1;
    navList.append(item);
  }
  let last = document.createElement('div');
  last.classList.add('test-nav__list__item');
  last.textContent = '✓';
  navList.append(last);

  let next = document.querySelector('.js-nav-next');
  next.addEventListener('click', function() {
    if (currQues < openedQues) {
      currQues++;
      updateTestBlock();
      updateNav();
    }
  });

  let prev = document.querySelector('.js-nav-prev');
  prev.addEventListener('click', function() {
      currQues--;
      updateTestBlock();
      updateNav();
  });

  function createTestBlock() {

    let questionBlock = document.querySelector('.test__block');

    updateCounter();

    let questionText = document.createElement('div');
    questionText.classList.add('test__question');
    questionText.textContent = questions[currQues].text;

    let questionRow = createQuestionRow();

    questionBlock.append(questionText, questionRow);

  }

  function updateCounter() {
    let current = document.querySelector('.test__counter_current');
    current.textContent = currQues + 1;
    let all = document.querySelector('.test__counter_all');
    all.textContent = questions.length;
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

  function updateTestBlock() {

    let questionBlock = document.querySelector('.test__block');
    questionBlock.classList.remove('test__block_hidden');

    updateCounter();

    let questionText = questionBlock.querySelector('.test__question');
    questionText.textContent = questions[currQues].text;

    let questionRow = questionBlock.querySelector('.test__row');
    questionRow.remove();
    let newQuestionRow = createQuestionRow();
    questionBlock.append(newQuestionRow);

  }

  function createQuestionRow() {

    let questionRow = document.createElement('div');
    questionRow.classList.add('test__row');
    for (let answer of questions[currQues].answers) {
      let item = document.createElement('div');
      item.classList.add('test__item');
      let button = document.createElement('div');
      button.classList.add('test__button', 'js-button');
      button.textContent = answer;
      item.append(button);
      questionRow.append(item);
    }
    questionRow.addEventListener('click', function(event) {
      if (event.target.classList.contains('js-button')) {
        result[currQues] = questions[currQues].answers.indexOf(event.target.textContent);
        currQues++;
        if (currQues == questions.length) {
          let questionBlock = document.querySelector('.test__block');
          questionBlock.classList.add('test__block_hidden');
          console.log(JSON.stringify(result));
        } else {
          updateTestBlock();
          updateCounter();
        }
        updateNav();
        if (currQues > openedQues) {
          openedQues = currQues;
        }
      }
    });

    return questionRow;

  }

}
