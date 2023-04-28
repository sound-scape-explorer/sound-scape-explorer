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
        'examples/sse-audio-docker-${nextRelease.version}.zip',
        'examples/sse-cpu-docker-${nextRelease.version}.zip',
        'examples/sse-cuda-docker-${nextRelease.version}.zip',
        'examples/sse-front-docker-${nextRelease.version}.zip',
        'examples/sse-next-docker-${nextRelease.version}.zip',
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
