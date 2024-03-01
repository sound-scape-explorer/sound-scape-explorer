module.exports = {
  branches: ['main', 'next/bamdad'],
  plugins: [
    [
      '@semantic-release/exec',
      {
        'verifyReleaseCmd': 'echo ${nextRelease.version} > .VERSION',
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
      '@semantic-release/github',
      {
        assets: [
          'visualisation-binaries/*.deb',
          'visualisation-binaries/*.dmg',
          'visualisation-binaries/*.exe',
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
          'processing/setup.py',
          'front/src/version.ts',
          'audio/src/version.ts',
          'visualisation/src/version.ts',
        ],
        // eslint-disable-next-line no-template-curly-in-string
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
