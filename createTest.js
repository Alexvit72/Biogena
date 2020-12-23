export function createTest(questions, resTexts, prodJSON) {

  let currQues = 0;
  let result = [];

  createTestBlock();

  let restart = document.querySelector('.js-test-restart');
  restart.addEventListener('click', function() {
    currQues = 0;
    result = [];
    updateTestBlock();
    updateNav();
  });

  let navList = document.querySelector('.js-test-nav-list');
  for (let i = 0; i < questions.length; i++) {
    let item = document.createElement('div');
    item.classList.add('test-nav__item');
    if (i == 0) {
      item.classList.add('test-nav__item', 'is-active');
    }
    let button = document.createElement('div');
    button.classList.add('test-nav__button');
    button.textContent = i + 1;
    item.append(button);
    navList.append(item);
  }
  let last = document.createElement('div');
  last.classList.add('test-nav__item');
  let button = document.createElement('div');
  button.classList.add('test-nav__button');
  button.textContent = '✓';
  last.append(button);
  navList.append(last);

  let next = document.querySelector('.js-test-nav-next');
  next.addEventListener('click', function() {
    if (currQues < result.length) {
      currQues++;
      updateTestBlock();
      updateNav();
    }
  });

  let prev = document.querySelector('.js-test-nav-prev');
  prev.addEventListener('click', function() {
      currQues--;
      updateTestBlock();
      updateNav();
  });

  function createTestBlock() {

    let questionBlock = document.querySelector('.test__block');

    updateCounter();

    let questionText = document.createElement('div');
    questionText.classList.add('test-question');
    let questionTextWrapper = document.createElement('div');
    questionTextWrapper.classList.add('test-question__wrapper');
    questionTextWrapper.textContent = questions[currQues].text;
    questionText.append(questionTextWrapper);

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

    let items = nav.querySelectorAll('.test-nav__item');
    for (let i = 0; i < items.length; i++) {
      if (i <= currQues) {
        items[i].classList.add('is-active');
      } else {
        items[i].classList.remove('is-active');
      }
    }

    let next = document.querySelector('.js-test-nav-next');
    if (currQues == questions.length - 1) {
      next.classList.add('test-nav__button_hidden');
    } else {
      next.classList.remove('test-nav__button_hidden');
    }

    let prev = document.querySelector('.js-test-nav-prev');
    if (currQues == 0) {
      prev.classList.add('test-nav__button_hidden');
    } else {
      prev.classList.remove('test-nav__button_hidden');
    }

  }

  function updateTestBlock() {

    let resultBlock = document.querySelector('.test-result');
    if (resultBlock) resultBlock.remove();

    let questionBlock = document.querySelector('.test__block');
    questionBlock.classList.remove('test__block_hidden');

    updateCounter();

    let questionTextWrapper = questionBlock.querySelector('.test-question__wrapper');
    questionTextWrapper.textContent = questions[currQues].text;

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
          createResultBlock();
        } else {
          updateTestBlock();
          updateCounter();
        }
        updateNav();
      }
    });

    return questionRow;

  }

  function createResultBlock() {

    let resultTextBlock = document.createElement('div');
    resultTextBlock.classList.add('test-result__text');
    let resultText ='';
    for (let i = 0; i < resTexts.length; i++) {
      if (resTexts[i][result[i]]) {
        resultText += resTexts[i][result[i]];
      }
    }
    resultTextBlock.textContent = resultText;

    let productBlock = document.createElement('div');
    productBlock.classList.add('test-result__list');
    let products = JSON.parse(prodJSON);
    for (let product of products) {
      let productItem = createProductItem(product);
      productBlock.append(productItem);
    }

    let resultTitle = document.createElement('div');
    resultTitle.classList.add('test-result__title');
    resultTitle.textContent = 'Результат подбора продукта';

    let resultBlock = document.createElement('div');
    resultBlock.classList.add('test-result');

    resultBlock.append(resultTitle, resultTextBlock, productBlock);

    let test = document.querySelector('.test');
    test.append(resultBlock);

  }

  function createProductItem(product) {

    let productItem = document.createElement('div');
    productItem.classList.add('test-product');

    for (let key in product) {
      if (key == 'id') {
        continue;
      } else if (key == 'image') {
        let img = document.createElement('img');
        img.classList.add('test-product__img')
        img.src = product[key];
        productItem.append(img);
      } else {
        let div = document.createElement('div');
        div.classList.add('test-product__' + key)
        div.textContent = product[key];
        productItem.append(div);
      }
    }

    let buy = document.createElement('button');
    buy.classList.add('test-product__button', 'btn', 'btn_blue');
    buy.textContent = 'Купить продукт';

    productItem.append(buy);

    return productItem;

  }

}
