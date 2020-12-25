function createTest() {

  let questions;
  let xhrQuestions = new XMLHttpRequest();
  xhrQuestions.open('GET', 'questions.js', false);
  try {
    xhrQuestions.send();
      if (xhrQuestions.status != 200) {
        alert('Ошибка ' + xhr.status);
      } else {
        questions = JSON.parse(xhrQuestions.response);
      }
    } catch(err) {
      alert("Запрос не удался");
    }

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
    item.appendChild(button);
    navList.appendChild(item);
  }
  let last = document.createElement('div');
  last.classList.add('test-nav__item');
  let button = document.createElement('div');
  button.classList.add('test-nav__button');
  button.textContent = '✓';
  last.appendChild(button);
  navList.appendChild(last);

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
    questionText.appendChild(questionTextWrapper);

    let questionRow = createQuestionRow();

    questionBlock.appendChild(questionText);
    questionBlock.appendChild(questionRow);

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
    if (resultBlock) {
      resultBlock.classList.add('test-hidden');
      let resultList = document.querySelector('.test-result__list');
      let units = resultList.querySelectorAll('.test-result__unit');
      for (let i = 0; i < units.length; i++) {
        resultList.removeChild(units[i]);
      }
    }

    let questionBlock = document.querySelector('.test__block');
    questionBlock.classList.remove('test__block_hidden');

    updateCounter();

    let questionTextWrapper = questionBlock.querySelector('.test-question__wrapper');
    questionTextWrapper.textContent = questions[currQues].text;

    let questionRow = questionBlock.querySelector('.test__row');
    questionBlock.removeChild(questionRow);
    let newQuestionRow = createQuestionRow();
    questionBlock.appendChild(newQuestionRow);

  }

  function createQuestionRow() {

    let questionRow = document.createElement('div');
    questionRow.classList.add('test__row');
    for (let i = 0; i < questions[currQues].answers.length; i++) {
      let item = document.createElement('div');
      item.classList.add('test__item');
      let button = document.createElement('div');
      button.classList.add('test__button');
      button.classList.add('js-button');
      button.textContent = questions[currQues].answers[i];
      item.appendChild(button);
      questionRow.appendChild(item);
    }
    questionRow.addEventListener('click', function(event) {
      if (event.target.classList.contains('js-button')) {
        result[currQues] = questions[currQues].answers.indexOf(event.target.textContent);
        currQues++;
        if (currQues == questions.length) {
          let questionBlock = document.querySelector('.test__block');
          questionBlock.classList.add('test__block_hidden');
          showResultBlock(result);
        } else {
          updateTestBlock();
          updateCounter();
        }
        updateNav();
      }
    });

    return questionRow;

  }

  function showResultBlock(result) {

    let resultBlock = document.querySelector('.test-result');
    resultBlock.classList.remove('test-hidden');

    let resultTextBlock = resultBlock.querySelector('.js-test-result-text');
    let resultText;
    let responseText = new XMLHttpRequest();
    responseText.open('POST', 'resTexts.js');
    responseText.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    responseText.send(JSON.stringify(result));
    responseText.onload = function() {
      if (responseText.status != 200) {
        alert('Ошибка ' + responseText.status);
      } else {
        resultText = JSON.parse(responseText.response);
/*------ Это временный блок, который собирает текст результата подбора продукта на основании ответов. После реализации бэкэнд-логики его нужно просто удалить. ) ------ */
       let outputText = '';
        for (let i = 0; i < resultText.length; i++) {
          if (resultText[i][result[i]]) {
            outputText += resultText[i][result[i]];
          }
        }
        resultText = outputText;
    //---------------------- Конец временного блока  -------------------------------------
        resultTextBlock.textContent = resultText;
      }
    }

    let productBlock = document.querySelector('.test-result__list');
    let products;
    let responseProducts = new XMLHttpRequest();
    responseProducts.open('POST', 'prodjson.js');
    responseProducts.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    responseProducts.send(JSON.stringify(result));
    responseProducts.onload = function() {
      if (responseProducts.status != 200) {
        alert('Ошибка ' + responseProducts.status);
      } else {
        products = JSON.parse(responseProducts.response);
/*------ Это временный блок, который случайным образом выводит 1 или 2 продукта. После реализации бэкэнд-логики его нужно просто удалить. )  ------------------------*/
        function randomElems(arr) {
          let res = [];
          let length = Math.floor(Math.random() * 2) + 1;
          for (let i = 0; i < length; i++) {
            res[i] = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
          }
          return res;
        }
        products = randomElems(products);
//---------------------- Конец временного блока  -------------------------------------
        for (let i = 0; i < products.length; i++) {
          let productUnit = createProductUnit(products[i]);
          productBlock.appendChild(productUnit);
        }
      }
    }

  }

  function createProductUnit(product) {

    let unit = document.createElement('div');
    unit.classList.add('test-result__unit');

    let productItem = document.createElement('div');
    productItem.classList.add('test-product');

    for (let key in product) {
      if (key == 'id') {
        continue;
      } else if (key == 'image') {

        let link = document.createElement('a');
        link.classList.add('test-product__image');

        let img = document.createElement('img');
        img.classList.add('js-result-product-img')
        img.src = product[key];

        link.appendChild(img);
        productItem.appendChild(link);

      } else {
        let div = document.createElement('div');
        div.classList.add('test-product__' + key, 'js-result-product-' + key);
        div.textContent = product[key];
        productItem.appendChild(div);
      }
    }

    let buy = document.createElement('button');
    buy.classList.add('test-product__button');
    buy.classList.add('btn');
    buy.classList.add('btn_blue');
    buy.textContent = 'Купить продукт';
    productItem.appendChild(buy);

    unit.appendChild(productItem);
    return unit;

  }

}

createTest();
