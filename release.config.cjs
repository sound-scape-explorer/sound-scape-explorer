module.exports = {
  branches: [
    {
      name: 'main',
    },
    {
      name: 'beta',
      channel: 'beta',
      prerelease: true,
    },
  ],
  plugins: [
    [
      '@semantic-release/exec',
      {
        verifyReleaseCmd: 'echo ${nextRelease.version} > .VERSION',
      },
    ],
    ['@semantic-release/commit-analyzer'],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      'semantic-release-pypi',
      {
        srcDir: 'processing',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          'visualisation-binaries/*.deb',
          'visualisation-binaries/*.dmg',
          'visualisation-binaries/*.exe',
          'bin/sse-processing-*.bat',
          'bin/sse-processing-*.sh',
        ],
      },
    ],
    [
      '@qiwi/semantic-release-gh-pages-plugin',
      {
        src: 'front/dist',
        msg: 'Front: Published <%= nextRelease.gitTag %>',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'package.json',
          'processing/pyproject.toml',
          'campaign/src/version.ts',
          'front/src/version.ts',
          'audio/src/version.ts',
          'visualisation/src/version.ts',
          'visualisation/package.json',
          'bin/sse-processing-*.bat',
          'bin/sse-processing-*.sh',
        ],

        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
