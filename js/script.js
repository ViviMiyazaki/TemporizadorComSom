import {elements} from "./elements.js"
import Sound from "./sound.js"

const sound = Sound()

const {
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonStop,
  buttonSoundOff,
  buttonSoundOn,
  minutesDisplay,
  secondsDisplay
} = elements

let minutes = Number(minutesDisplay.textContent)
let timerTimeOut


function resetControls() {
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
  buttonSet.classList.remove('hide')
  buttonStop.classList.add('hide')
}

function updateTimerDisplay(newMinutes, seconds) {
  newMinutes =  newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')

}

function resetTimer() {
  updateTimerDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function countdown() {
  timerTimeOut = setTimeout(function() {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)

    updateTimerDisplay(minutes, 0)
    
    if(minutes <= 0 && seconds <= 0) {
      resetControls()
      updateTimerDisplay()
      Sound().timeEnd()
      return
    }
    
    if(seconds <= 0) {
      seconds = 60
      --minutes
    }
    
    updateTimerDisplay(minutes, String(seconds - 1))

    countdown()
  }, 1000)
}

buttonPlay.addEventListener('click', function() {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
  buttonSet.classList.add('hide')
  buttonStop.classList.remove('hide')

  countdown()
  sound.pressButton()
})

buttonPause.addEventListener('click', function() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  clearTimeout(timerTimeOut)
  sound.pressButton()
})

buttonStop.addEventListener('click', function() {
  resetControls()
  resetTimer()
  sound.pressButton()
})

buttonSoundOff.addEventListener('click', function() {
  buttonSoundOn.classList.remove('hide')
  buttonSoundOff.classList.add('hide')
  sound.bgAudio.pause()
})

buttonSoundOn.addEventListener('click', function() {
  buttonSoundOn.classList.add('hide')
  buttonSoundOff.classList.remove('hide')
  sound.bgAudio.play()
})

buttonSet.addEventListener('click', function() {
  let newMinutes = prompt('Quantos minutos?')
  if(!newMinutes) {
    resetTimer()
    return
  }


  minutes = newMinutes
  updateTimerDisplay(minutes, 0)
})