// let api ='https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc'

const repositories = []

const searchInput = document.querySelector('.search')
const searchOption = document.querySelector('.option')
const cardsList = document.querySelector('.cardsList');

const debounce = (fn, debounceTime) => {
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this, args)}, debounceTime
        )
    }
  };

  
function getApi(){
  if(this.value[this.value.length - 1] == ' ') return;
  let inputData = this.value
  let answers = document.querySelectorAll('.answer');
  console.log(inputData.length);
  if(inputData == '' || inputData == ' '){
    console.log(inputData.length);
    console.log(inputData);
    answers.forEach(item => item.remove())
    return;
  }

  let api =`https://api.github.com/search/repositories?q=${inputData}+language:assembly&sort=stars&order=desc`

  fetch(api)
      .then(res => res.json())
      .then(data => {
              console.log(data);
              data.items.forEach(element => {
                  repositories.push(element);
              });
              console.log(repositories);
              getAnswer(inputData);
      })
      
}

function getAnswer(inputData){
    let answers = document.querySelectorAll('.answer');
    
    

    if(answers.length > 0){
        answers.forEach(item => item.remove())  
    }

    let counter = 0;
    
    repositories.forEach(item => {
        if(counter < 5) searchOption.insertAdjacentHTML('beforeend', 
        `<li class = 'answer'
        owner = '${item.owner.login}'
        stargazers_count = '${item.stargazers_count}'
        name = '${item.name}'
        >${item.name}</li>`);
        counter++;
    });

    let card = document.querySelectorAll('.answer');

    console.log(card);

    card.forEach(item => {
      addCard(item);
    });

    repositories.length = 0;
}



function addCard(item){
  item.addEventListener('click',function() {
    console.log(item.getAttribute('owner'));
    cardsList.insertAdjacentHTML('afterbegin', `
      <div class = 'card'>
        Name: ${item.getAttribute('name')}<br>
        Owner: ${item.getAttribute('owner')}<br>
        Stars: ${item.getAttribute('stargazers_count')}<br>
        <button class = "close">X</button>
      </div>
      
    `)

    let buttons = document.querySelectorAll('.close');

    buttons[0].addEventListener('click', function(){
        this.closest('.card').remove();
        this.remove();
      })

  searchInput.value = '';
  clearSearch();
  });
}



function clearSearch(){
  let card = document.querySelectorAll('.answer');
  card.forEach(item => {
    item.remove();
  });
}

searchInput.addEventListener('keydown', debounce(getApi, 300));
// searchInput.addEventListener('keyup', getRep);


