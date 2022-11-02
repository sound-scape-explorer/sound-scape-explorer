# [2.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v1.1.0...v2.0.0) (2022-11-02)


### Bug Fixes

* **Back/Constants:** Remove directory change at runtime ([b4d273d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b4d273d5e815f35390d27283e7c57dd07f37a504))
* **Back:** Use flask method to return JSON with correct type ([53e2b00](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/53e2b0040a2706618420fdd69f17c919d06e943d))
* **Client/Component/TableBandByInterval:** Center table content + Show a cross instead of `0` in cells ([cc4743c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cc4743c769e270a6ae44b8987ca6a7375bc3c4f0))
* **Client/UMAP:** Reduce height of range selection + Add custom range update function ([f1e6947](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f1e6947a2b7e292969efdf13337b8a954f979e40))
* **Client/UMAP:** Remove debug code + Move variable declarations ([ad7488a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ad7488a67d7329486471ff9c111c6220381b8ec3))
* **Client/useConfig:** Get `intervals` data from correct source ([8193cd3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8193cd30d7131b309bbb4defc3be9f39478754d8))
* **Client/Volumes:** Feed seconds to generate dates ([8911541](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8911541ba0c198dcbc77e752213765dc7be24ac0))
* **Client/Volumes:** Remove chart title ([5a2208b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5a2208b94d97be69b5273359608897b4415a64cd))


### Features

* Add WebGL Scatter Plot for UMAP + Various improvements ([e8dad42](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e8dad42efa8b3c634778e84f5fe7ed535eddaaee))
* **Back:** Add Dockerfile ([2f3e80f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2f3e80f3e22ec00a328c1dec5c199e884b912009))
* **Client/Component/TableBandByInterval:** Add 'umap' case for images ([c0c2b4d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c0c2b4d29a4bdc6816400690e481205b6ea248e8))
* **Client/Menu:** Add automatic menu item selection when user lands on specific route ([47d1d88](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/47d1d88dd47636a8b6930ec5ac5398c9bf88bfc1))
* **Client/Page/UMAP:** Add table for `UMAP` page + Add utility function to parse interval labels from configuration JSON ([26d0a39](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/26d0a399c67a1191544a918390d420276b4eb4b4))
* **Client/Page/Volumes:** Add first and second option rows ([cab09ce](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cab09cee471c1680bac3922671be54c9927b8765))
* **Client/Pages:** Add first static version of `Player` ([23743de](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/23743de172401931808410077f1aa4128d55e282))
* **Client/Store:** Add `activeIntervalLabel` to Volumes store ([a97454d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a97454d905f146821c2cc2d212e10812bcff2455))
* **Client/UMAP:** Add timeline (WIP) ([d545bfc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d545bfc029c682a891b1fc26f89a6a86fbbafa27))
* **Client/UMAP:** Add WIP scatter plot (missing timeline) ([12feb84](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/12feb842e42f6a803a6a76a3d3a66ac19f3f927a))
* **Client/UMAP:** Display the current range in human-readable format ([cc34cc0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cc34cc0d98b92d4023ade530fccb39e0f6d7d4d9))
* **Client/UMAP:** Merge timeline within scatter plot component + Add plot filtering depending on selected range ([4684b00](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4684b0014356cbac4b8e1ea181b6807ef2eb3d70))
* **Client/UMAP:** Populate timeline with timestamps from API ([7b35426](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7b354261005e5fe88640494fc528bcbe28995bfb))
* **Client/Volumes:** Add box plotting + Point to correct variable for displaying image generated from ML algos ([36c76ae](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/36c76aeb2b291a427f4a2dffae57d672c270076b))
* **Client/Volumes:** Display human-readable dates ([4db623c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4db623cefb5c58c731d5ddde2867b09c13cd6e38))
* **Client:** Add `covering` page ([0500360](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/050036014b1e680fd77a906f92880c766c9c2fd3))
* **Client:** Add new `client` folder for front code rewrite + Add first components and pages + Add router ([1e8219d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1e8219dffdbfd43e5bc468db4f0f1e74c86cdc0d))
* **Client:** Create `Volumes` page + Extract `TableBandByInterval` component for re-use + Add `SERVER_HOSTNAME` in root `constants.ts` ([596b49c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/596b49c35a732cb7620e24d26c7c76c40755489f))
* **Client:** Merge redundant code into components, composables and shared reactive stores + Work on Box Plot charting + Clean code ([a4b367b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a4b367b6058e37e3c1c261defb64ed7574b47b5c))
* Create first API endpoints for serving static files + Use new routes in front codebase ([d72bfd3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d72bfd35e571001b3d637c84fc736815d3762653))
* **Docker:** Add docker-compose file for next branch ([55831a5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/55831a575049506fade04ce08a6375c2782faedf))
* **Processing:** Add Dockerfile + Update global docker-compose + Use debian based docker image instead of alpine ([fa689f8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fa689f89f4aea8b368f159a72edf660aebd27d2e))
* Rename `client` to `front` + Add docker build steps and compose instructions + Add placeholder for `back` ([ac3cea1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ac3cea1d7087197e361397e2c91b180831bbcc1b))


### Performance Improvements

* **Client/Component/TableBandByInterval:** Prevent state mutation if next value is identical, Use custom setter utility function ([7f8aa09](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7f8aa091714794495b755aa86e13a7ae2a1f8b37))
* **Client/Page/Player:** Use kebab-case component ([4554aaa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4554aaacef4150b29266369ddb89065c024ebb1e))
* **Client/VolumesBoxPlot:** Wrap API request in a try...catch block in order to reset state and view accordingly ([ad30851](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ad30851aaaee8e30a728a4f3d7983fc8c536d82a))
* **Client:** Extract utility code for parsing config + Inject config as props for `TableBandByInterval` component ([2a335a8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2a335a8ae0e4d07f7a4c03a07dbb16a18201f995))

# [1.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v1.0.1...v1.1.0) (2022-09-21)


### Bug Fixes

* **Client:** Use correct parsers for vue and vanilla files + Use supported version 7 of `eslint` ([7ac29b7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7ac29b7f8c9c804efcc96ab09db93d0fbf71a7cf))


### Features

* **Client:** Add `typescript` and typescript eslint parser ([1485c09](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1485c09659a740aad362ba42446a3b970d1d9230))
* **Client:** Add typings for config and volume domains ([e2a423d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e2a423dedc02a0c2c7841f89e6cb10bf6c76bb23))
* **Client:** Add typings for Covering and UMAP ([c73c955](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c73c95577e9d2d4c0b8379eb4544f4f7d60f4461))

## [1.0.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v1.0.0...v1.0.1) (2022-09-20)


### Bug Fixes

* **Client/NPM:** Replace deprecated `babel-eslint` with `@babel/eslint-parser` ([57d882c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/57d882c49fd54c3a19cbf7f9e0eef89a5d0d3be2))
* **Scripts:** Rectify symbolic link commands for project install ([4696903](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4696903f60a871e2df004f881b70c06ea4b4ef46))


### Performance Improvements

* **Client/Style:** Add new linting rules + Remove prettier + Format existing codebase + Various fixes ([095e0a7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/095e0a759387c447ff3ac5c3ec5f5eb6767489e1))
* **Client:** Switch package manager from `npm` to `yarn` ([edb08d1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/edb08d19fede0825cb9e1444262206b8a04ca819))

# 1.0.0 (2022-09-19)


### Bug Fixes

* **NPM:** Add package name ([6707139](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/670713967bd427476481f99e13af4a7c984bfbba))


### Features

* Add versioning + Add global scripts ([b504d01](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b504d01b8b657e0a44588a0a1f5f6f8aa41c4ed2))
