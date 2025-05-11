export const convertToWav = (blob: Blob) => {
  // conversion needed due to cross-origin policy in v2, could be solved https://web.dev/articles/coop-coep
  return blob.type !== 'audio/wav' ? new Blob([blob], { type: 'audio/wav' }) : blob
}
