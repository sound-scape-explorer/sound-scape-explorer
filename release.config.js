module.exports = {
  plugins: [
    ['@semantic-release/commit-analyzer'],
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
    }],
    ['@semantic-release/exec', {
      prepareCmd: 'yarn release:prepare ${nextRelease.version}',
    }],
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
    ['@semantic-release/github', {
      assets: [
        {
          'path': 'examples/sse-audio-<%= nextRelease.version %>.zip',
          'label': 'SSE Audio',
        },
        {
          'path': 'examples/sse-cpu-<%= nextRelease.version %>.zip',
          'label': 'SSE CPU',
        },
        {
          'path': 'examples/sse-cuda-<%= nextRelease.version %>.zip',
          'label': 'SSE CUDA',
        },
        {
          'path': 'examples/sse-front-<%= nextRelease.version %>.zip',
          'label': 'SSE Front',
        },
        {
          'path': 'examples/sse-next-<%= nextRelease.version %>.zip',
          'label': 'SSE Next',
        },
      ],
    }],
    ['@qiwi/semantic-release-gh-pages-plugin', {
      src: 'front/dist',
      msg: 'Front: Published <%= nextRelease.gitTag %>',
    }],
    ['@semantic-release/git', {
      assets: [
        'CHANGELOG.md',
        'package.json',
      ],
      // eslint-disable-next-line no-template-curly-in-string
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],
  ],
};
