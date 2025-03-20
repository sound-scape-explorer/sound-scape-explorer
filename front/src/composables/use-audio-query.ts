import {AudioQueryError} from 'src/common/Errors';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {type BlockDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useStorageAudioHost} from 'src/composables/use-storage-audio-host';

interface Q {
  response: Response | null;
  err: AudioQueryError | null;
}

const q = async (url: string): Promise<Q> => {
  try {
    const response = await fetch(url);
    let err: Q['err'] = null;

    if (response.status !== 200) {
      const data = await response.text();
      err = new Error(data);
    }

    return {
      response: response,
      err: err,
    };
  } catch (err) {
    return {
      response: null,
      err: new AudioQueryError(`could not fetch ${url}`),
    };
  }
};

interface AudioRootDto {
  message: string;
  version: string;
  paths: {
    audio: string;
    ffmpeg: string;
    ffprobe: string;
  };
}

export function useAudioQuery() {
  const {audioHost: host} = useStorageAudioHost();
  const {integration} = useIntegrationSelection();

  const queryRoot = async () => {
    const {response, err} = await q(host.value);

    if (!response || err) {
      throw new AudioQueryError('no response or error');
    }

    const data: AudioRootDto = await response.json();
    return data;
  };

  const queryFile = async (block: BlockDetails): Promise<ArrayBuffer> => {
    if (block === null || integration.value === null) {
      throw new AudioQueryError('not ready');
    }

    const start = block.fileStart;
    const end = start + integration.value.duration;
    const route = new URL(`${host.value}/get`);
    route.searchParams.append('file', block.file);
    route.searchParams.append('start', start.toString());
    route.searchParams.append('end', end.toString());

    const {response, err} = await q(route.toString());

    if (!response || err) {
      throw err;
    }

    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  };

  return {
    queryFile: queryFile,
    queryRoot: queryRoot,
  };
}
