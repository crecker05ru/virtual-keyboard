import "./styles.scss"
let en = [
  ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
  ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del'],
  ['CapsLock','a','s','d','f','g','h','j','k','l',';',"'",'Enter'],
  ['ShiftLeft','\\','z','x','c','v','b','n','m',',','.','/','▲','ShiftRight'],
  ['Ctrl','Win','Alt','Space','Alt','Ctrl','◄','▼','►']
]
let ru = [
  ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
  ['Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\\','Del'],
  ['CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter'],
  ['ShiftLeft','\\','я','ч','с','м','и','т','ь','б','ю','.','▲','ShiftRight'],
  ['Ctrl','Win','Alt','Space','Alt','Ctrl','◄','▼','►']
]
let languageMap = {
  en: en,
  ru: ru
}
let isCapsLocked = false
let isShifted = false
let shiftLeft
let shiftRight
const  root = document.createElement('main')
root.id = 'keyboard'
document.body.append(root)
let keys 
let textarea
let capsLock
let currentLanguage 

console.log('root',root)
window.addEventListener('load',() => {
  let language = localStorage.getItem('language')
  if(language){
    currentLanguage  = language
  } else {
    currentLanguage  = navigator.language.slice(0,2)
  }
  
  drawApp()
})

window.addEventListener('beforeunload', () => {
  localStorage.setItem('language',currentLanguage)
})

window.addEventListener('keydown', (e) => {
  console.log('e.key',e.key)
  console.log('e.code',e.code)
  console.log('e.shiftKey',e.shiftKey)
  console.log('e.altKey',e.altKey)
  console.log(e.shiftKey && e.altKey)
  if (e.shiftKey && e.altKey) {
    currentLanguage === 'en' ? currentLanguage = 'ru' : currentLanguage = 'en'
    changeKeyLanguage(currentLanguage)
  }
  
  for(let i = 0;i < keys.length;i++){
    if(keys[i].innerText == e.key || keys[i].innerText.toLowerCase() == e.key){
      keys[i].classList.add('key-animation')
    }
    

  }
  if(e.key == 'CapsLock'){
    isCapsLocked = !isCapsLocked
    capsLock.classList.toggle('key-active')
    capslockedMode(isCapsLocked)
    console.log('isCapsLocked',isCapsLocked)
  }
  if(e.code== 'ShiftLeft'){
    isShifted = !isShifted 
    shiftLeft.classList.add('key-active')
    console.log('shiftLeft',shiftLeft)
  }
  if( e.code == 'ShiftRight'){
    isShifted = !isShifted 
    shiftRight.classList.add('key-active')
    console.log('shiftRight',shiftRight)
  }
})

root.addEventListener('click',(e) => {
  console.log('e.target',e.target)
  let div = e.target.closest('div')
  if(root.contains(div) && div.classList.contains('keyboard__col')){
    if(e.target.innerText == 'CapsLock'){
      capsLock.classList.toggle('key-active')
      isCapsLocked = !isCapsLocked
      capslockedMode(isCapsLocked)
    }else if(e.target.innerText == 'Space'){
      textarea.value += ' '
    }else if(e.target.dataset.key == 'ShiftLeft'){
      shiftLeft.classList.toggle('key-active')
      isShifted = !isShifted
    }else if(e.target.dataset.key == 'ShiftRight'){
      shiftRight.classList.toggle('key-active')
      isShifted = !isShifted
    }else if(e.target.dataset.key == 'Enter'){
      textarea.value += '\n'
    }else {
      textarea.value += e.target.innerText
    }
  }
})
window.addEventListener('keyup', (e) => {
  for(let i = 0;i < keys.length;i++){
    if(keys[i].innerText == e.key || keys[i].innerText.toLowerCase() == e.key){
      keys[i].classList.remove('key-animation')
    }
  }
  if(e.code == 'ShiftLeft'){
    isShifted = !isShifted 
    shiftLeft.classList.remove('key-active')
  }
  if( e.code == 'ShiftRight'){
    isShifted = !isShifted 
    shiftRight.classList.remove('key-active')
  }
})
function drawApp() {
  let wrapper = document.createElement('div')
  let info = document.createElement('h4')
  info.innerText = 'Переключение языка ShiftLeft + Alt \n ОС Windows'
  info.classList.add('info')
  root.classList.add('wrapper')
  textarea = document.createElement('textarea')
  textarea.classList.add('textarea')
  root.append(wrapper,textarea)
  drawKeyboard(languageMap[currentLanguage],isCapsLocked)
  root.append(info)

}
function changeKeyLanguage(language){
    for (let key of keys){
      let letter =  languageMap[language][key.dataset.row][key.dataset.col]
      if(letter != "ShiftRight" && letter != "ShiftLeft"){
        key.innerText = letter
      }
    }
}

function capslockedMode(isCapsLocked){
  for(let i = 0;i < keys.length;i++){
    let key = keys[i].innerText
    
    if(key != 'CapsLock' && 
    key != 'Enter' && 
    key != 'Del' && 
    key != 'Shift' && 
    key != 'ShiftLeft' &&
    key != 'ShiftRight' &&
    key != 'Tab' && 
    key != 'Alt' &&
    key != 'Ctrl' &&
    key != 'Backspace' &&
    key != 'Space' &&
    key != 'Win'){
      console.log('keys[i].innerText',keys[i].innerText)
      keys[i].innerText = isCapsLocked ? key.toUpperCase() : key.toLowerCase()
    }else {
      keys[i].innerText
    }
    
  }
}

function drawKeyboard(language,upperCase) {
  let keyboardBody = document.createElement('div')
  keyboardBody.classList.add('keyboard__body')
  for(let i = 0;i < language.length;i++){
    let rowElement = document.createElement('div')
    rowElement.dataset.row = i
    rowElement.classList.add('keyboard__row')
    keyboardBody.append(rowElement)
    for(let k = 0;k < language[i].length;k++){
      let col = upperCase ? language[i][k].toUpperCase() : language[i][k]
      let colElement = document.createElement('div')
      colElement.innerText = upperCase ? col.toUpperCase() : col
      colElement.dataset.row = i
      colElement.dataset.col = k
      colElement.dataset.key = col
      colElement.classList.add('keyboard__col')
      if(col === 'Backspace'){
        colElement.classList.add('key_size_backspace','key-backspace')
      }else if(col === 'Tab'){
        colElement.classList.add('key_size_tab','key-tab')
      }else if(col === 'Ctrl'){
        colElement.classList.add('key_size_l','key-ctrl')
      }else if(col === 'ShiftLeft'){
        colElement.classList.add('key_size_shift-left','key-shift-left')
        colElement.innerText = 'Shift'
      }else if(col === 'ShiftRight'){
        colElement.classList.add('key_size_shift-right','key-shift-right')
        colElement.innerText = 'Shift'
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
  shiftLeft = document.querySelector('.key-shift-left')
  shiftRight = document.querySelector('.key-shift-right')
  console.log('keys',keys)
}