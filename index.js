const express = require('express')
const app = express()

const ytSearch = require('youtube-search')
const YoutubeMp3Downloader = require('youtube-mp3-downloader')

app.use(express.static(__dirname + '/static'))

const opts = {
  key: 'AIzaSyDXsgEFpOHct3LHZ7p5K6qcUfTrkBvu2Vg'
}

app.get('/search', (req, res) => {
  ytSearch(req.query.q, opts, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }

    res.json(results)
  })
})
// Configure YoutubeMp3Downloader with your settings
const downloader = new YoutubeMp3Downloader({
  // Where is the FFmpeg binary located?
  // ffmpegPath: '/usr/bin/ffmpeg',
  // Where should the downloaded and encoded files be stored?
  outputPath: '/tmp',
  // What video quality should be used?
  youtubeVideoQuality: 'lowest',
  // How many parallel downloads/encodes should be started?
  queueParallelism: 5,
  // How long should be the interval of the progress reports
  progressTimeout: 2000
})

const downloads = {}

downloader.on('progress', data => {
  console.log(data)
  downloads[data.videoId] = data
})
downloader.on('finished', (err, data) => {
  console.error(err)
  console.log(data)
  if (err) {
    downloads[data.videoId] = err
  } else {
    downloads[data.videoId] = data
  }
})

downloader.on('error', err => {
  console.log(err)
  downloads[err.videoId] = err
})

app.get('/download', (req, res) => {
  const { id } = req.query
  if (!downloads[id]) {
    downloads[id] = { status: 'requested' }
    downloader.download(id)
    return res.status(201).json({ status: 'requested' })
  }

  return res.json(downloads[id])
})

app.listen(3000)
