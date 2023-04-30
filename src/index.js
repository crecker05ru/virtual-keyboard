import "./styles.scss"
let en = [
  ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
  ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del'],
  ['Caps Lock','a','s','d','f','g','h','j','k','l',';',"'",'Enter'],
  ['Shift','z','x','c','v','b','n','m',',','.','/','▲','Shift'],
  ['Ctrl','Win','Alt','Space','Alt','Ctrl','◄','▼','►']
]
let ru = [
  ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
  ['Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\\','Del'],
  ['Caps Lock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter'],
  ['Shift','я','ч','с','м','и','т','ь','б','ю','.','▲','Shift'],
  ['Ctrl','Win','Alt','Space','Alt','Ctrl','◄','▼','►']
]
let languageMap = {
  en: en,
  ru: ru
}

const root = document.querySelector('#keyboard')
let currentLanguage = 'en'
console.log('root',root)
window.addEventListener('load',drawApp)

function drawApp() {
  let wrapper = document.createElement('div')
  // wrapper.classList.add('wrapper')
  root.classList.add('wrapper')
  let textarea = document.createElement('textarea')
  textarea.classList.add('textarea')
  root.append(wrapper,textarea)
  drawKeyboard(languageMap[currentLanguage])
}
function changeKeyLanguage(language){
  drawKeyboard(language)
}

function drawKeyboard(language) {
  let keyboardBody = document.createElement('div')
  keyboardBody.classList.add('keyboard__body')
  for(let i = 0;i < language.length;i++){
    let row = language[i]
    let rowElement = document.createElement('div')
    rowElement.dataset.row = i
    rowElement.classList.add('keyboard__row')
    keyboardBody.append(rowElement)
    for(let k = 0;k < language[i].length;k++){
      let col = language[i][k]
      let colElement = document.createElement('div')
      colElement.innerText = col.toUpperCase()
      colElement.dataset.row = i
      colElement.dataset.col = k
      // colElement.classList.add('keyboard__col', 'key_size_m')
      colElement.classList.add('keyboard__col')
      if(col === 'Backspace'){
        colElement.classList.add('key_size_backspace')
      }else if(col === 'Tab'){
        colElement.classList.add('key_size_tab')
      }else if(col === 'Ctrl'){
        colElement.classList.add('key_size_l')
      }else if(col === 'Shift' || col === 'Enter' || col === 'Caps Lock'){
        colElement.classList.add('key_size_xl')
      }else if(col === 'Space'){
        colElement.classList.add('key_size_xxxxl')
      }else {
        colElement.classList.add('key_size_m')
      }
      rowElement.append(colElement)
    }
  }
  root.append(keyboardBody)
}