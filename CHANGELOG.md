# [3.11.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.10.0...v3.11.0) (2022-12-07)


### Bug Fixes

* **Front/UMAP:** Make column filtering absolute (filter could overwrite itself iterating over columns) ([cdeaa77](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cdeaa77932b35693d3ab01487da0514c160f5ccb))
* **Processing:** Rollback nvidia dependencies ([f4a4e5a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f4a4e5a68e132396164cec4c8921ed104a14eba5))


### Features

* Add `files_columns` to output config from backend + Add UI + Various improvements ([711127b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/711127ba464b99ba177b846ccde4ee503c95b2f9))
* **Front/UMAP:** Add filtering with columns + Various improvements and fixes ([a0b4f76](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a0b4f76058959670190b0390dc1e476c2c926f0b))
* **Front/UMAP:** Work on all filters + Various improvements ([dcbc124](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dcbc12417bb9cba79b0a80a71dd7c7face391ecf))
* **Processing:** Add `sse config populate-columns` command (only compatible with Federica's campaign for now) + Upgrade and freeze dependencies + Misc ([096b6dd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/096b6dd7043f9efec0748f3453a8d4401009515c))
* **Processing:** Add columns to UMAP computations output + Various improvements ([af817b7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/af817b767c2cbeb7955d00393be276b2defc2509))


### Performance Improvements

* **Front/UMAP:** Move UMAP Component logic to composables ([efbd6df](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/efbd6df8ba19b764be2d2afe40d6aa133210cdb4))

# [3.10.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.9.0...v3.10.0) (2022-11-28)


### Features

* **Front/UMAP:** Add very simple query filter + Various improvements ([90e5d90](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/90e5d90b934a5fbde8eb2b11e3000f9c7bb56e0c))

# [3.9.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.8.0...v3.9.0) (2022-11-25)


### Features

* **Processing:** allow loading from both pickle pklz and numpy npz ([47bcdc1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/47bcdc18f130d0404cbaedf838eb4fde2af27c71))
* **Processing:** save features as npz (much faster and more portable) ([57fce44](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/57fce44a96e2e5a6e74c0402ad2b1c702cc46800))

# [3.8.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.7.0...v3.8.0) (2022-11-24)


### Bug Fixes

* **Front/UMAP:** Feed correct ancestor with `position: relative` to ScatterGL layered canvas ([7af02a1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7af02a1591328551b493a3ef3d38d1801d07d617))


### Features

* **Front/UMAP:** Rewrite `getColor` (pointColorer for ScatterGL) + Use `chroma-js` color palette ([a021a3b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a021a3b9276d794d6acad1da232d7ee8cf4ade23))

# [3.7.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.6.0...v3.7.0) (2022-11-23)


### Features

* **Processing:** increase GPU parallelism (add as config?) ([dd7a40c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dd7a40cc1e8ed36f31460fca40a6c207afef6f83))
* **Processing:** stay in torch space, and on same device ([90cbb8b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/90cbb8b32a437819447edcc21b2fbdf61726b3ff))

# [3.6.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.5.0...v3.6.0) (2022-11-23)


### Features

* **Front/UMAP:** Add time range slider back + Add sliding window feature + Use `moment` library (WIP) ([5fa478b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5fa478b40c0f371c8c299589b898069af9b6d7e6))
* **Front:** Add `ModalLoading` component ([e937bd4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e937bd460b9ac72fb92aa900754ab002335edd47))
* **Front:** Make `Modal` component slottable ([745de54](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/745de54571f5b37ced7d22be402fc882e6aff553))
* **Processing:** Add `app_version` in generated `ghost-config.json` ([4029dc0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4029dc0ff835eb7b71f812146d07a57f52a4bc32))

# [3.5.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.4.0...v3.5.0) (2022-11-22)


### Features

* **Processing:** Add command for `all-but-covering` ([36bc2fe](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/36bc2fedb2f16a41935d6686488b3833d2b974cc))
* **Processing:** Select all sites if `umap_sites` is empty in configuration file ([ded2b84](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ded2b848b6fc148b22f2b98f112164adb23d694f))

# [3.4.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.3.0...v3.4.0) (2022-11-22)


### Bug Fixes

* **Front/UMAP:** Fix typo ([15528c6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/15528c6287af309792ba35d909980ac0cf26b501))


### Features

* **Processing/CUDA:** Add CUDA support for extractions ([a7f3523](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a7f35236c4fc32e5bd03500fac4859d9abc4367f))

# [3.3.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.2.0...v3.3.0) (2022-11-22)


### Bug Fixes

* **Front/UMAP:** Make sure base refs are instantiated before use ([24a313f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/24a313faa8f43185a136eceb039d649858486b27))


### Features

* **Front/UMAP:** Add filters ([543636f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/543636feb320fdc1086ec52f0b6ed134f4fafeea))
* **Front/UMAP:** Switch time range from sliders to dropdown selects for better UX ([9cad5b3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9cad5b308ff37cd1f9e2210d462fb8afb1cb1152))

# [3.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.1.0...v3.2.0) (2022-11-16)


### Bug Fixes

* **Processing/Models:** Make `VGGish` singleton ([d70d5ed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d70d5ed080e4360c9a1e1e927c3d12b8a4793cc5))
* **Processing/Models:** Sort imports ([5899439](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/58994393d5e1129b527ad08ae16a4f3dd8841ae7))
* **Processing/Scripts:** Exit with silent status code for cleaning script ([371c8d2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/371c8d2eab959a83b13d9f84d9ef840347cbe294))


### Features

* **Processing/Models:** Make VGG base class a singleton to improve performance + Improve CUDA detection code ([9955ca3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9955ca36c35fbce28d4b3bfa6c4d17dbd20d8db3))
* **Processing/UMAP:** Fetch UMAP `random_state` from configuration file ([b24f0e7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b24f0e70ac9c9f0738587b1d3f4cdc23aab88c96))

# [3.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.0.0...v3.1.0) (2022-11-15)


### Bug Fixes

* **Processing/Scripts:** Add constants to fall back to when configuration is incomplete ([5e84f15](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5e84f1569f1c7e93cc1e98e85d7736170ba63f25))


### Features

* **Processing/Scripts:** Add folder checks in run script ([4372f5f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4372f5f6ead5a61f6ac1749f9d55cb0d87b6396f))
* **Scripts:** Add new processing scripts for separate actions ([8a0df44](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8a0df44141a9014beaba8fcc4b3fc2a4af658123))

# [3.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v2.1.4...v3.0.0) (2022-11-15)


### Bug Fixes

* **Scripts:** Fix path for `yarn install` ([5072bc1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5072bc186fb5fc93866acfbeeabb32ae14df0f6d))


### Performance Improvements

* **Processing/Docker:** Improve docker layering for future builds ([51845d3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/51845d365fb2e160678141e54f4b6cb0755d1c35))

## [2.1.4](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v2.1.3...v2.1.4) (2022-11-04)


### Bug Fixes

* **CI:** Trying new syntax ([88c7242](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/88c7242d9ea649eddf9aaf12cc37f41743b4a5de))

## [2.1.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v2.1.2...v2.1.3) (2022-11-04)


### Bug Fixes

* **CI:** Getting there... ([8087688](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/808768854095ae43b5a833d3bca5a4f8f7925f7c))

## [2.1.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v2.1.1...v2.1.2) (2022-11-04)


### Bug Fixes

* **CI:** Attempting to understand why these jobs did not trigger... ([03939a6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/03939a693f23af5d67224118a9c4bebfdf3e373c))

## [2.1.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v2.1.0...v2.1.1) (2022-11-04)


### Bug Fixes

* **CI:** Split pipelines and improve configuration for tagging resulting docker images ([9cdf93b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9cdf93b3fd84060dab52e2de15f105fdb00b1d75))

# [2.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v2.0.0...v2.1.0) (2022-11-03)


### Bug Fixes

* **Front:** Make `useConfig` trigger its own error modal + Make `Loader` pure ([4494af8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4494af8119dc41100091de86b5dbe9372838a218))
* **Processing:** Add state feedback to console ([9fb4397](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9fb4397371f0e288eba03a03dc0b0efe4dff3d74))


### Features

* **Front:** Add `Loader` component to block interaction if needed + Add `Notification` component for feedbacks ([cb70a84](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cb70a846d443951176c22ed68e43ad469a66a273))


### Performance Improvements

* **App:** Extract process commands from installation into its own script ([992e90e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/992e90e9e56af9b0f1ef43d25fa2a84e10dabdfc))
* **Processing:** Remove web server related code ([d07f98c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d07f98c1655015951a82bcd2ba27ce0706978253))

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
