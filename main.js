let timerMinute = 20
let timerSecond = 0
let interval = 20
let startButton = document.querySelector('.start')
let timerEnd = new Date()
let timerAlert = document.querySelector('#alert')
let pomodoroContent = document.querySelector('#pomodoro-content')
let postButton = document.querySelector('.post')

function main () {
  startButton.addEventListener('click', () => {
    timer()
  })
  postButton.addEventListener('click', () => {
    postPomodoroContent()
  })
}

main()

function initialiseTimer () {
  var now = new Date().getTime()
  //https://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
  timerEnd = new Date(now + interval*60000)
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

function postPomodoroContent () {
  let d = new Date()
  let date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
  let time = `${d.getHours()}:${d.getMinutes()+1}`
  axios.post('https://sheetdb.io/api/v1/jq2vlu4cydfwc', {
    "data": [{
      "Date": date,
      "Time": time,
      "Interval": interval,
      "Comments": pomodoroContent.value
    }]
  })
  .then((response) => alert(response.data))
  .catch((error) => console.log(error))
}