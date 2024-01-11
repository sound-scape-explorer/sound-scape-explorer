import {AudioBridge} from '../bridges/AudioBridge';

export async function stopAudioService() {
  await AudioBridge.stopFromRenderer();
}
