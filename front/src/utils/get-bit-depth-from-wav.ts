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
