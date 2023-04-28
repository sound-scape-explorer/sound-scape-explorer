module.exports = (nextReleaseVersion) => {
  return [
    {
      'path': `examples/sse-audio-${nextReleaseVersion}.zip`,
      'label': 'SSE Audio',
    },
    {
      'path': `examples/sse-cpu-${nextReleaseVersion}.zip`,
      'label': 'SSE CPU',
    },
    {
      'path': `examples/sse-cuda-${nextReleaseVersion}.zip`,
      'label': 'SSE CUDA',
    },
    {
      'path': `examples/sse-front-${nextReleaseVersion}.zip`,
      'label': 'SSE Front',
    },
    {
      'path': `examples/sse-next-${nextReleaseVersion}.zip`,
      'label': 'SSE Next',
    },
  ];
};
