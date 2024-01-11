import cors from 'cors';
import express from 'express';
import {existsSync} from 'fs';
import {getAudioDurationInSeconds} from 'get-audio-duration';

import {sliceAudio} from './slice-audio';
import {validateArgs} from './validate-args';
import {VERSION} from './version';

const args = process.argv;
validateArgs(args);

const app = express();
const port = 5531;
const ffmpegPath = args[args.length - 3];
const ffprobePath = args[args.length - 2];
const audioPath = args[args.length - 1];

app.use(cors());

// service
app.listen(port, () => {
  console.log(`port: ${port}`);
  console.log(`ffmpeg path: ${ffmpegPath}`);
  console.log(`ffprobe path: ${ffprobePath}`);
  console.log(`audio path: ${audioPath}`);
});

// root endpoint
app.get('/', (_req, res) => {
  res.send({
    message: 'SoundScapeExplorer Audio Service',
    version: VERSION,
  });
});

// get audio endpoint
// start and end in milliseconds
app.get('/get', async (req, res) => {
  const {file, start, end} = req.query;
  const path = `${audioPath}${file}`;

  // validate parameters
  if (typeof file === 'undefined' || typeof start === 'undefined' || typeof end === 'undefined') {
    res.writeHead(403, {'Content-Type': 'text/html'});
    res.end('Error: Missing parameters');
    return;
  }

  // validate file existence
  if (!existsSync) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('Error: File not found');
    return;
  }

  const fileDuration = await getAudioDurationInSeconds(path, ffprobePath);
  const startSeconds = Number(start) / 1000;
  const endSeconds = Number(end) / 1000;

  // validate start and end
  if (startSeconds < 0 || endSeconds < 0) {
    res.writeHead(403, {'Content-Type': 'text/html'});
    res.end('Error: Start or end is less than 0');
    return;
  }

  if (startSeconds >= endSeconds) {
    res.writeHead(403, {'Content-Type': 'text/html'});
    res.end('Error: Start is greater than end');
    return;
  }

  if (startSeconds > fileDuration || endSeconds > fileDuration) {
    res.writeHead(403, {'Content-Type': 'text/html'});
    res.end('Error: Start or end is greater than audio duration');
    return;
  }

  // slice
  const slice = await sliceAudio(ffmpegPath, path, startSeconds, endSeconds);
  res.writeHead(200, {'Content-Type': 'audio/wav'});
  res.end(slice);
});
