function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function getCountdown(target, other) {
  var diff = (target.getTime() - other.getTime()) / 1000
  let seconds = Math.round(Math.abs(diff))
  let sign
  switch(Math.sign(diff)) {
    case -1:
    sign = "+"
    break
    case 1:
    sign = "-"
    break
    case 0:
    sign = ""
    break
    default:
    sign = ""
  }
  var obj = {
    absSeconds: seconds,
    sign : sign,
    hours: pad(Math.floor(seconds/60/60), 2),
    minutes: pad(Math.floor(seconds / 60)%60, 2),
    seconds: pad(Math.floor(seconds % 60), 2)
  }
  console.log(obj)
  return obj
}
async function countdownTimer() {
  let res = await fetch("settings.json")
  let json = await res.json()
  let target = new Date(json.time)
  if ("displaySettings" in json) {
    let displaySettings = json.displaySettings
    if (displaySettings.window) {
      let window = json.displaySettings.window
      if (window.title) document.querySelector("title").innerHTML = window.title
      if (window.backgroundColor) document.querySelector("#container").style.backgroundColor = window.backgroundColor
      if (window.textColor) document.querySelector("#container").style.color = window.textColor
      if (window.fontSize) document.querySelector("#countdown").style.fontSize = window.fontSize
    }
    if (displaySettings.mainTitle) {
      let mainTitle = displaySettings.mainTitle
      if (mainTitle.text) document.querySelector("#title").innerHTML = mainTitle.text
      if (mainTitle.textSize) document.querySelector("#title").style.fontSize = mainTitle.textSize
      if (mainTitle.textColor) document.querySelector("#title").style.color = mainTitle.textColor
    }
  }
  setInterval(() => {
    let current = new Date()
    let time = getCountdown(target, current)
    document.querySelector("#countdown").innerHTML = `${(json.includeT) ? "T": ""}${(json.includeSign) ? time.sign : ""}${time.hours}:${time.minutes}:${time.seconds}`
  }, 500)
}
countdownTimer()
