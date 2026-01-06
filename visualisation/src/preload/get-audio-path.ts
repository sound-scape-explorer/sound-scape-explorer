import {AudioBridge} from '../bridges/AudioBridge';

export async function getAudioPath(): Promise<string | null> {
  return await AudioBridge.getPathFromRenderer();
}
