let timerMinute = 20
let timerSecond = 0
let startButton = document.querySelector('.start')
let timerEnd = new Date()
let timerAlert = document.querySelector('#alert')
function main () {
  startButton.addEventListener('click', () => {
    timer()
  })
}

main()

function initialiseTimer () {
  var now = new Date().getTime()
  //https://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
  timerEnd = new Date(now + 20*60000)
  let totalMinutes = timerEnd - now
  return totalMinutes
}

function timeRemaining (timerEnd) {
  let timeNow = new Date().getTime()
  let remainingTime = timerEnd - timeNow
  return remainingTime
}

function timer () {
  let totalMinutes = initialiseTimer()
  timerMinute = Math.floor((totalMinutes % (1000 * 60 * 60)) / (1000 * 60))
  timerSecond = Math.floor((totalMinutes) % (1000 * 60) / 1000)
  document.querySelector('.timer').innerHTML = timerMinute + ":" + timerSecond
  setInterval(updateTimer, 1000)
}

function updateTimer () {
  let minutesRemaining = timeRemaining(timerEnd)
  if (minutesRemaining > 0) {
    timerMinute = Math.floor((minutesRemaining % (1000 * 60 * 60)) / (1000 * 60))
    timerSecond = Math.floor((minutesRemaining) % (1000 * 60) / 1000)
    document.querySelector('.timer').innerHTML = timerMinute + ":" + timerSecond
  } else {
    ringAlert()
  }
}

function ringAlert () {
  timerAlert.play()
}