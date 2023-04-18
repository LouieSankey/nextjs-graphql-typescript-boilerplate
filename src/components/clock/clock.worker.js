let myInterval
self.onmessage = function (evt) {
  clearInterval(myInterval)

  if (
    evt.data.message === 'pause' ||
    evt.data.message === 'stop' ||
    evt.data.message === 'skip'
  ) {
    postMessage(evt.data.time)
  }

  if (evt.data.message === 'start' || evt.data.message === 'break') {
    var i = evt.data.time

    myInterval = setInterval(function () {
      i--
      postMessage(i)
    }, 100)
  }
}
