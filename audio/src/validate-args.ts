export function validateArgs(args: string[]) {
  if (args.length !== 5) {
    throw new Error('Ensure ffmpeg, ffprobe and audio_path are provided');
  }
}
