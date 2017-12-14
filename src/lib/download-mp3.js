const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const wait = (predicate, interval) =>
  predicate().then(
    result => result || delay(interval).then(() => wait(predicate, interval))
  )

export default function download(video, notifier) {
  return wait(
    () =>
      fetch('/fetch?id=' + encodeURIComponent(video))
        .then(res => res.json())
        .then(result => {
          if (result.progress) {
            notifier(result)
            return null
          } else if (result.file) {
            return result
          }
        }),
    500
  )
}
