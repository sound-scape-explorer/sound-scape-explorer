export function getBitDepthFromWav(arrayBuffer: ArrayBuffer): number {
  const view = new DataView(arrayBuffer);
  return view.getUint8(34);
}
