export function triggerWavDownload(data: Blob, filename: string) {
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(data);
  anchor.download = filename;
  anchor.click();
  anchor.remove();
}

export function getBitDepthFromWav(arrayBuffer: ArrayBuffer): number {
  try {
    // TODO: This can fail, I don't know why
    //   RangeError: Offset is outside the bounds of the DataView
    const view = new DataView(arrayBuffer);
    return view.getUint8(34);
  } catch {
    return 16;
  }
}
