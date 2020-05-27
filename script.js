function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function diff_hours(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000
  var obj = {
    minutes: Math.floor(diff / 60),
    seconds: Math.floor(diff % 60)
  }
  return obj
}
async function countdownTimer() {
  let res = await fetch("settings.json")
  let json = await res.json()
  document.querySelector("title").innerHTML = json.title
  document.querySelector("#container").style.backgroundColor = json.backgroundColor
  document.querySelector("#countdownContainer").style.color = json.textColor
  document.querySelector("#countdown").style.fontSize = json.timeFontSize
  document.querySelector("#title").style.fontSize = ("mainTitleSize" in json) ? json.mainTitleSize : ""
  document.querySelector("#title").innerHTML = (json.mainTitle == false) ? "" : json.mainTitle
  setInterval(() => {
    let target = new Date(json.time)
    let current = new Date()
    let obj = diff_hours(target, current)
    document.querySelector("#countdown").innerHTML = `${obj.minutes}:${pad(obj.seconds, 2)}`
  }, 500)

}
countdownTimer()
