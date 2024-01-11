import {AudioBridge} from '../bridges/AudioBridge';

export async function getAudioStatus(): Promise<boolean> {
  return await AudioBridge.getStatusFromRenderer();
}
