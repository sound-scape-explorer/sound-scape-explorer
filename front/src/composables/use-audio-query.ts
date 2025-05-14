import {AudioQueryError} from 'src/common/Errors';
import {useClientSettings} from 'src/composables/use-client-settings';
import {type AggregatedWindow} from 'src/composables/use-intervals';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';

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
      response,
      err,
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }

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
  const {integration} = useViewSelectionNew();
  const {audioHost: host} = useClientSettings();

  const queryRoot = async () => {
    const {response, err} = await q(host.value);

    if (!response || err) {
      throw new AudioQueryError('no response or error');
    }

    const data: AudioRootDto = await response.json();
    return data;
  };

  const queryFile = async (window: AggregatedWindow): Promise<ArrayBuffer> => {
    if (window === null || integration.value === null) {
      throw new AudioQueryError('not ready');
    }

    const start = window.relative.start;
    const end = window.relative.end;
    const route = new URL(`${host.value}/get`);
    route.searchParams.append('file', window.file.Path);
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
    queryFile,
    queryRoot,
  };
}
