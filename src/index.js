import "./styles.scss"
let en = [
  ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
  ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del'],
  ['CapsLock','a','s','d','f','g','h','j','k','l',';',"'",'Enter'],
  ['Shift','z','x','c','v','b','n','m',',','.','/','▲','Shift'],
  ['Ctrl','Win','Alt','Space','Alt','Ctrl','◄','▼','►']
]
let ru = [
  ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
  ['Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\\','Del'],
  ['CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter'],
  ['Shift','я','ч','с','м','и','т','ь','б','ю','.','▲','Shift'],
  ['Ctrl','Win','Alt','Space','Alt','Ctrl','◄','▼','►']
]
let languageMap = {
  en: en,
  ru: ru
}
const  root = document.createElement('main')
root.id = 'keyboard'
document.body.append(root)
let keys 
let textarea
let capsLock
let currentLanguage 

console.log('root',root)
window.addEventListener('load',() => {
  currentLanguage  = 'en' || localStorage.getItem(currentLanguage)
  drawApp()
})

window.addEventListener('beforeunload', () => {
  localStorage.setItem('language',currentLanguage)
})

window.addEventListener('keydown', (e) => {
  console.log('e.key',e.key)
  console.log('e.code',e.code)
  
  for(let i = 0;i < keys.length;i++){
    if(keys[i].innerText == e.key || keys[i].innerText.toLowerCase() == e.key){
      keys[i].classList.add('key-animation')
    }
    

  }
  if(e.key == 'CapsLock'){
    capsLock.classList.toggle('key-active')
  }
})

window.addEventListener('keyup', (e) => {
  for(let i = 0;i < keys.length;i++){
    if(keys[i].innerText == e.key || keys[i].innerText.toLowerCase() == e.key){
      keys[i].classList.remove('key-animation')
    }
  }
})
function drawApp() {
  let wrapper = document.createElement('div')
  // wrapper.classList.add('wrapper')
  root.classList.add('wrapper')
  textarea = document.createElement('textarea')
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
      colElement.innerText = col
      colElement.dataset.row = i
      colElement.dataset.col = k
      // colElement.classList.add('keyboard__col', 'key_size_m')
      colElement.classList.add('keyboard__col')
      if(col === 'Backspace'){
        colElement.classList.add('key_size_backspace','key-backspace')
      }else if(col === 'Tab'){
        colElement.classList.add('key_size_tab','key-tab')
      }else if(col === 'Ctrl'){
        colElement.classList.add('key_size_l','key-ctrl')
      }else if(col === 'Shift'){
        colElement.classList.add('key_size_xl','key-shift')
      }else if(col === 'Enter'){
        colElement.classList.add('key_size_xl','key-enter')
      }else if(col === 'CapsLock'){
        colElement.classList.add('key_size_xl','key-capslock')
      }else if(col === 'Space'){
        colElement.classList.add('key_size_xxxxl','key-space')
      }else {
        colElement.classList.add('key_size_m')
      }
      rowElement.append(colElement)
    }
  }
  root.append(keyboardBody)
  keys = document.querySelectorAll('.keyboard__col')
  capsLock = document.querySelector('.key-capslock')
  console.log('keys',keys)
}