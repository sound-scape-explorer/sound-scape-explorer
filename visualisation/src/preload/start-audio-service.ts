import {AudioBridge} from '../bridges/AudioBridge';

export async function startAudioService(audioPath: string) {
  await AudioBridge.startFromRenderer(audioPath);
}
