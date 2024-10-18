import cors from 'cors';
import express from 'express';
import {getAudioDurationInSeconds} from 'get-audio-duration';

import {readFileAsync} from './read-file-async';
import {sliceAudio} from './slice-audio';
import {validateArgs} from './validate-args';
import {validatePath} from './validate-path';
import {validateQuery} from './validate-query';
import {VERSION} from './version';

const args = process.argv;
validateArgs(args);

const app = express();
const port = 5531;
const ffmpegPath = args[args.length - 3];
const ffprobePath = args[args.length - 2];
const audioPath = args[args.length - 1];
const origin = 'http://localhost:5530';

app.disable('x-powered-by');
app.use(cors({origin: origin}));

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
    paths: {
      audio: audioPath,
      ffmpeg: ffmpegPath,
      ffprobe: ffprobePath,
    },
  });
});

// get audio endpoint
// start and end in milliseconds
app.get('/get', async (req, res) => {
  try {
    const {file, start, end} = validateQuery(req.query);
    const path = `${audioPath}${file}`;
    validatePath(path);

    const fileDuration = await getAudioDurationInSeconds(path, ffprobePath);
    const startSeconds = Number(start) / 1000;

    let endSeconds = Number(end) / 1000;

    if (endSeconds > fileDuration) {
      endSeconds = fileDuration;
    }

    // validate start and end
    if (startSeconds < 0 || endSeconds < 0) {
      res.writeHead(403, {'Content-Type': 'text/html'});
      res.end('Requested start or end is less than 0');
      return;
    }

    if (startSeconds >= endSeconds) {
      res.writeHead(403, {'Content-Type': 'text/html'});
      res.end('Requested start is greater than requested end');
      return;
    }

    if (startSeconds > fileDuration) {
      res.writeHead(403, {'Content-Type': 'text/html'});
      res.end('Requested start is greater than file duration');
      return;
    }

    if (startSeconds === 0 && endSeconds === fileDuration) {
      const data = await readFileAsync(path);
      res.writeHead(200, {'Content-Type': 'audio/wav'});
      res.end(data);
      return;
    }

    // slice
    const slice = await sliceAudio(ffmpegPath, path, startSeconds, endSeconds);
    res.writeHead(200, {'Content-Type': 'audio/wav'});
    res.end(slice);
  } catch (error) {
    if (error instanceof Error) {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end(error.message);
    }
  }
});
