# [8.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.1.0...v8.2.0) (2023-04-28)


### Features

* **CD:** Add `SSE Audio` flavor + Set fixed versions in docker compose files + Update documentation and delivery pipelines ([3b6194b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3b6194b0fa63327bdddd457e72eb532a4b88c7d1))

# [8.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.0.3...v8.1.0) (2023-04-27)


### Bug Fixes

* **Front/Export:** Add `pointIndex` and `groupIndex` + Fix dimensions ([5caeca5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5caeca53f769f1ec59dbcb9b5b526b0055e67292))


### Features

* **Processing:** Add `yarn dataframe` command ([831138d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/831138d820b9aaebfa24907feef7a812b53a3052))

## [8.0.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.0.2...v8.0.3) (2023-04-19)


### Bug Fixes

* **Front/Export:** Encode only for CSV exports ([71c068f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/71c068fdd63ac023b7d041eeb79e5745a5f5e6a2))

## [8.0.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.0.1...v8.0.2) (2023-04-18)


### Bug Fixes

* **Front/Export:** Encode data before browser download ([4390f4f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4390f4fef9cabf00f35e11f69f8cfe04c9bb5647))

## [8.0.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.0.0...v8.0.1) (2023-04-17)


### Bug Fixes

* **Front/Details:** Handle undefined timezone ([c18cb89](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c18cb893f277b8d64a2a452a0ecf544888d7bb01))
* **Front/Pairings:** Fix typo ([b1a3064](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b1a306429e789e58cb712021bb618aa161a0258a))
* **Front/Scatter:** Handle undefined timezone ([a38eaf2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a38eaf20c979247811a98951f16913040daa9ed0))
* **Front/Scatter:** Remove debug log ([526ebf5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/526ebf54511bff3b2d6ab84862b7f46387140e7d))
* **Front/Storage:** Handle optional volumes, matrices and pairings ([63317b9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/63317b9db8438ed095b9fb014bbe242c9d429431))

# [8.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v7.2.2...v8.0.0) (2023-04-12)


### Bug Fixes

* **CD:** Fix typo in `docker-audio-next` workflow ([d0e2e1b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d0e2e1baba0c4de49dc25d88e81bc95d6a440e99))
* **CD:** Remove `gcc` set up in GitHub action ([542665b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/542665b24a9f487fac6ca04e00f0fcfa2189b016))
* **CD:** Trigger `next` workflows for PR into branch `main` + Set up GCC for `processing` build ([66a5b60](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/66a5b6049ba8336bc8acf665e3e034a63460d46b))
* **CD:** Trigger `next` workflows for PR into branch `main` + Set up GCC for `processing` build ([d6d7485](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d6d7485a98209cee996fd9d293d04c5b4db58c2e))
* **Front/Heatmap:** Force displaying squares ([d1c51d8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d1c51d8471c6282b29c0aa67d938949ddb2aa387))
* **Front:** Improve sliders computed function + Fix time range init values + Rename `BaseButton` ([78bc03b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/78bc03b8cc5f8c690bffcde4a66587bc05990b45))
* **Front:** Improve store (display file and group index in `Details`) + Attempt to fix date with timezones ([19c0914](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/19c09148c737e6e5a6a34938b103f251591d8ef1))
* **Front:** Remove unnecessary version injection in environment. ([6f2cf3d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6f2cf3d884e643bb4227f33804b6948ccf02ebe7))
* **Processing/Build:** Install `gcc` in Dockerfile ([9250307](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9250307012b463fea9125f0d55cf03a428dbd844))
* **Processing/Build:** Install `gcc` only from apt ([aa2fb82](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aa2fb82b720f6db24d0e28e3314a2ecc04792dfb))
* **Processing/Build:** Prefer installing `build-essential` in Docker ([0dce369](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0dce369622db2a7658be4b4ab28fd95d453216d6))
* **Processing/Build:** Set new action filename in Docker command. ([d5bb8aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d5bb8aa5987f8dbd07fbcbcbec189245746cd10b))
* **Processing:** Add pairings calculation to `all` actions ([63f638a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/63f638a0332ee1cb1cfa19cd2c4e16526641b016))


### Features

* Add `ClusterPairing` to Processing and Front ([231eb50](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/231eb50d73fd23da0f1d4a4565f91d0a5dd475c5))
* Enrich `Front` and `Processing` ([6a3f08b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6a3f08b47bafb9233f0b73a0662f484be50dcf0a))
* **Front:** Add `Histogram` and `Heatmap` components ([c146b08](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c146b0879263709797bd48de81b11f4d9dbbe42b))
* **Front:** Upgrade all dependencies ([2bfc047](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2bfc047b373e6c96a185d939d615cd636fa110f8))


### Performance Improvements

* **Front:** Remove dead code ([78c37ee](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/78c37eeee4aac6e0666000fdd07278cd27e81e2d))
* **Processing:** Remove dead code ([c301f40](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c301f404ba11836743ec3cc7495970a5d11dffaa))


### BREAKING CHANGES

* Storage Paths have been updated. Users need to regenerate `.h5` files with `yarn process:all-but-files`

## [7.2.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v7.2.1...v7.2.2) (2023-03-24)


### Bug Fixes

* **Audio:** Ensure `serve` is preinstalled when building docker image ([e640a1e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e640a1e8c8e6a82739cf713fe608c368906c8c0a))


### Performance Improvements

* **Processing:** Improve Dockerfile ([989002d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/989002d07d5c9558b68629468d3de815a50ab12c))
* **Processing:** Improve dockerfile security ([ffe3ee5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ffe3ee5ccfb3e77ce7607c65c1921db69f8f48dd))
* **Processing:** Reduce docker image from 7.90GB to 5.42GB ([a9ea7ee](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a9ea7ee69bd85a65a7f154ae1ba91cec6ed11bd3))

## [7.2.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v7.2.0...v7.2.1) (2023-03-23)


### Bug Fixes

* **Docker:** Use correct env variables ([d97454e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d97454ee26ec1681e532f4bf2fbd176b73c55762))

# [7.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v7.1.0...v7.2.0) (2023-03-23)


### Bug Fixes

* **Audio:** Use non root docker user ([a16c18c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a16c18c189ca44c464f8683efc303dc7ea53aa0c))
* **Front/Player:** Empty on unmount instead of destroy ([4a4baa3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4a4baa3d012619992a508808b6de8416327c62c4))
* **Front:** Fix dev build command + Improve commands ([924d0d8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/924d0d8de9dca7af1f76c79df7f73c0502759d58))
* **Front:** Fix exploration export + Remove `tags` setting and filter ([02acd2f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/02acd2f2ee0731599d2d405cfc65077085287e57))
* **Front:** Fix typo in Dockerfile ([6eaa11a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6eaa11ae6dbacb72d5a7e6f7571248aaafc501f0))
* **Front:** Let mouse events through `Indicators` and `Volumes` ([679ede9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/679ede9f8f07a4862f01095c94e892a64ab61bf0))
* **Front:** Remove debugging code ([1725cbc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1725cbcb559861256fe2c56ba146a3b5ab0a94d6))
* **Front:** Update storage existence check to be compatible with all browsers ([c6599a3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c6599a39012d015afd907eb77ac48baa0c343f7c))
* **Processing/Storage:** Handle empty actions in configuration file (reducers, indicators and volumes) ([8f74451](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8f74451c4e3af2fc3868d15b5dab54cffa86aad5))


### Features

* Add `audio_host` user setting ([979f197](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/979f19784f6210a5e6bc78cb42afd824320c4556))
* Add `audio` package for hosting audio files + Improve `front` player + Add `front` `indicators` and `volumes` Improve and clean code and builds ([8ee3c85](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8ee3c85e191a66b23b5b78ff2c95cef72d777d80))
* Add `audio` package for hosting audio files + Improve `front` player + Add `front` `indicators` and `volumes` Improve and clean code and builds ([9a3ff1d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9a3ff1defa827bb0e10c5536593b904d8a9f12cd))
* **Front/Player:** Add scratch version of player for waveform and spectrogram display ([1953790](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1953790242d20902dc429f0364e329c434182e74))
* **Front/Player:** Add zoom change on wheel + Add time cursor + Improve source declaration ([a57c077](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a57c077f3b0cc4871270a0c0c71e88f9d725fad3))
* **Front/Player:** Filter audio output + Display basic details ([9131f54](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9131f54b7e079f8c704f5061feff01834b02f3f5))
* **Front/Player:** Listen to specific part of the audio ([eb61a3f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb61a3f98f6f8df261ed381ecc6572af669b3a59))


### Performance Improvements

* **Front/Builds:** Add `wavesurfer` to code splitting ([66bced7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/66bced7911f0fc0ba0666c3e402cc7ac20cda796))

# [7.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v7.0.0...v7.1.0) (2023-03-16)


### Features

* **Processing/Storage:** Add methods to retrieve volumes and their values + Complete `get_jr_dataframe` ([9868a1d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9868a1d2f767a4d8be94bd32d2abac1d82c908b2))
* **Processing/Timer:** Print total duration when timer has ended + Improve interface ([ddf26c4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ddf26c4318dca90ca3ac2368838a20bde2a9c51f))

# [7.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v6.2.0...v7.0.0) (2023-03-16)


### Bug Fixes

* **Processing:** Clean and update dependencies ([f5fb983](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f5fb98360f06b4bb474a4727ababb9ad803fce67))


### Features

* **Processing/Storage:** Merge store interfaces for `Indicator` and `Volume` ([2b89f45](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2b89f45ffdabe591044299e14252a8b94e629f82))


### BREAKING CHANGES

* **Processing/Storage:** Volumes and Indicators are now stored by indexes instead of predeclared namespaces

# [6.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v6.1.3...v6.2.0) (2023-03-16)


### Features

* **Processing:** Pass index to `ConfigReducer` + Improve storage interface to get grouped reducers and associated reduced_features ([e1f8662](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e1f866256deadfc3c07614f9c4b3dcf422ff44e9))

## [6.1.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v6.1.2...v6.1.3) (2023-03-16)


### Bug Fixes

* **Docker:** Feed env file when updating docker images ([d1011e1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d1011e12b00b7bc13df840327ad3ddad2f8c1476))
* **Processing/Extractors:** Drop last incomplete seconds when extracting ([101a6f2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/101a6f2e8364791035baf804f424810cb7782253))
* **Processing/Extractors:** Drop last incomplete seconds when extracting ([b67beb5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b67beb5dea84da36929145647e6632db014b8a2b))
* **Processing/Extractors:** Drop last incomplete seconds when extracting ([8b8d5fb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8b8d5fbe675e8a6df6542bb06727ecc3cde9bedf))

## [6.1.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v6.1.1...v6.1.2) (2023-03-15)


### Bug Fixes

* **Utils:** Build correct dataframe for JR + Improve `Storage` interface ([b145dd7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b145dd7f4bf8964e0b33a6428cd641694f0d3897))

## [6.1.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v6.1.0...v6.1.1) (2023-03-15)


### Bug Fixes

* **Releases:** Finalize docker images and composes + Overwrite base path if `processing` running inside container ([2118864](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/211886420353543879f57c26f7c4c3a3ad2b2d08))

# [6.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v6.0.2...v6.1.0) (2023-03-15)


### Bug Fixes

* **Front:** Use correct routes in production ([1472ff6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1472ff67a7307ea73e23eefbc774df7e4fb3d195))


### Features

* **Processing:** Add helper function for computation engineer ([5e18f9d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5e18f9d90d31c3ce9eee840f6bb2e5c54f4dfa4c))

## [6.0.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v6.0.1...v6.0.2) (2023-03-14)


### Bug Fixes

* **Front:** Set absolute public root path to fix vue-router behaviours ([6654f5d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6654f5dc3be4d57e06595d9f95e6bdccb5debffc))
* **Processing/PcaReducer:** Add scaling before reduction ([e3d5be4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e3d5be4f54b4432b76228fa954c2eca78234a93d))
* **Processing/UmapReducer:** Add robust scaling before reduction ([cb11dd3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cb11dd3579b777fd82166b40db166f3cf5e3bf9b))

## [6.0.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v6.0.0...v6.0.1) (2023-03-14)


### Bug Fixes

* **Front:** Add base path in vite configuration for builds ([9d610f5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9d610f546019f2c9941d2167702055aa8659b559))

# [6.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.17.0...v6.0.0) (2023-03-14)


### Bug Fixes

* **CI:** Add dependabot watchers for `front` and `processing` packages ([52bba74](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/52bba74ed2b4e342f0c2d10db090d61ebeb6ca85))
* **Front/Colors:** Use red for evening in daily cycling color scale ([6feb1ad](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6feb1ad058af369a406d81b51d35bdea69b2ecb6))
* **Front/Scatter:** Correctly create scatterGL dataset ([cd4b6a1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cd4b6a158ddfb6e61cf4b074278015fefeb20a01))
* **Front/Storage:** Reload window on browser storage sync completion ([fdf9542](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fdf9542e4926fcd79d6bbf23533fcb6edaaeed90))
* **Front/TimeRange:** Import `ComputedRef` as type to pass build ([3ee2698](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3ee2698651e5c072c4d82a78e8b6e51c44945ed9))
* **Front:** Update package.json ([399b3a7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/399b3a7d7b8042da99197797b6f6cbabc2c6f3e3))
* Ignore only root env file ([ab3ff92](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ab3ff9244a48eb97b69623fa8ade6d1ad8b76ab9))
* **Processing/Audio:** Add typing for spectrogram amplitude ([63e1bf7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/63e1bf70aed89e53b2c3404cc35bf827a9a90ab7))
* **Processing/Audio:** Return empty array if audio slice is too short ([a7bd29f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a7bd29f4ff45ce7c1731b788b7fa73755f5fe5b6))
* **Processing/Config:** Convert meta value floats to strings ([ce1c506](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ce1c506a6ecbcf689cdddab9081a123f8f092f7e))
* **Processing/Config:** Correctly retrieve bands, integrations or ranges if reducer field is empty ([111bbd5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/111bbd5c47659d0aa67f36971487f198a870a8b7))
* **Processing/ConfigFilesExtractor:** Improve console output clarity ([f182d51](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f182d510e00c32f8d9982f9391586edb55a94b10))
* **Processing/ConfigFilesExtractor:** Rename from `FileExtractor` + Pass `storage` only when calling yield and store method ([e8db5be](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e8db5be3ab771fc00bbc3aeaac6f509bb2dedc1f))
* **Processing/Config:** Improve Excel shape. ([b59431f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b59431f082d7044236bb9767566b843951b15d98))
* **Processing/Config:** Remove debugging console outputs ([ef585ab](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ef585ab3cc93fa196803ad5c1f1231e36421f196))
* **Processing/Config:** Set `File.tag` to empty string if undefined ([3d03f89](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3d03f89cec08ad64b39a24c2fb3a33c06098d626))
* **Processing/Config:** Use correct meta length when creating sets ([6337421](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6337421b14be25c43f2e76d596f3583b718991c7))
* **Processing/FeaturesGrouper:** Typo ([aac7547](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aac754721d1fb6389afcfc33d6d72700d24dc2c9))
* **Processing/Groupers:** Rewrite `FeaturesGrouper` while removing `range` related code ([562ba0a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/562ba0a93bfaba50f747e8655cdb96d0ee25fd0e))
* **Processing/Indicators:** Rename storage path for ACI and ADI ([6097fbb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6097fbb1edfe8a424e9034f244c08df6c3f32dd0))
* **Processing/NewClasses:** Improve code readability + Remove dead code ([fa31967](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fa31967aad797ffde2d6613607c9c1d189306bdd))
* **Processing/NewClasses:** Improve VGG* code + Use 1 seconds chunks ([edd5978](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/edd5978d44e53559df34c57cf0db4e943bcd5e45))
* **Processing/Storage:** Improve error message on H5 opening fail ([337c76b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/337c76bd4043e79365177e2cf35d96e1316af541))
* **Processing/Storage:** Improve storage of meta properties and meta sets ([aabd087](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aabd0874758028ab297f57a6f063715102b308cc))
* **Processing/Storage:** Move features and timestamps out of configuration scope to prevent collisions on deletion. ([c76cecf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c76cecf1e7887a834d0eb93e76c3cfb7488497d0))
* **Processing/Storage:** Remove default parameter for `path` ([ddd36b6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ddd36b61b76a0294174e2cd6b5c6315cde9b7449))
* **Processing/Storage:** Rename delete indicators method ([aba836d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aba836d295edea09b4d09359dbfac7db0b15edbd))
* **Processing/Storage:** Trim artificial rectangular arrays back to jagged shape. ([740d23d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/740d23dd958d7e7df0f6ce248d9dc5e6b16fafd4))
* **Processing/Timer:** Fill the end of timeleft printing with spaces ([11054e5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/11054e598e213b318899dc02e6e6ec87f5cdfaee))
* **Processing/Timer:** Replace previous logic by using the mean duration of a single iteration ([dfd115a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dfd115ad3f6e07d75805bb243eee33f6aeddb05c))
* **Processing/Timer:** Save iteration count inside class + Use with total duration to get better mean value + Increment when printing ([a35120d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a35120dc7a435513ae0ff1e13d894e5f2e8be2f5))
* **Processing/VGGishModel:** Fix typings ([60a68a8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/60a68a84f43412580c9f00a62382818c3027afbf))
* **Processing:** Add missing `__init__` files ([61530dc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/61530dcb3043d311eafee79a07449a45bb4a24b6))
* **Processing:** Remove unused or duplicate code ([b931faa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b931faa022a40661a1ce53dba70868e61e8fb9f7))
* **Releases:** Attempting to fix GitHub action when building front ([0ebe9b3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0ebe9b36c83f8bb5625afc951d5b9f5dbd39cd95))
* **Releases:** Remove specific comment in powershell docker start script ([2e7c603](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2e7c6031b5942ec02fb171c374a0d4f39439ccc7))
* **Releases:** Wait for copies to complete + Zip recursively ([c3f0be4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c3f0be42da66da2238d546efc71b5fa7dc9c9ab8))


### Features

* **CD:** Add publishing to gh pages to release pipeline ([73d207c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/73d207c54ed22564ed4f030443ac8d052f8b5f57))
* **Front/Scatter:** Start orbiting by default for 3D plots ([d045ca5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d045ca54908378ef455e7f9e2dd4ffbb53b57ef1))
* **Front:** Adapt to new H5 (dirty) ([64bc188](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/64bc188a472a63fa3b20aa1aa99eeda0e19c65f9))
* **Front:** Adapt to new storage ([fc75cc5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fc75cc56fe2560b30589d64675def1afaefba062))
* **Front:** Adapt umap export with new storage + Remove back related code ([8323b8c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8323b8c678c72c4b4ecfc7907e278396e5e787c7))
* **Front:** Clean front + Add details to home + Replace debug mode with preview mode ([0f8abf5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0f8abf5452f348cd72a394453b3c869109a33527))
* **Front:** Configure build code splitting ([bdca763](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bdca763cd7e981ccf9c1b51669bf1ea2b3609aa6))
* **Front:** Upgrade dependencies ([a4d8539](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a4d85397686e38658e89972713fd1542cb4e5d34))
* **Processing/Actions:** Add timers to all yielding actions ([b1d51bf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b1d51bf9f051ce5c13da36b123f2447e765293af))
* **Processing/Config/Reducers:** User can omit fields `bands` `integrations` and `ranges` to act as a wildcard ([308211d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/308211d24b7fc6fa7487a63ee8fc8a0aa97c794a))
* **Processing/Config:** Add getter for meta properties ([63b9e8b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/63b9e8b0a75f9a0de2bbb5a30fccbdd11a972962))
* **Processing/Config:** Rename user settings + Use dynamic paths in actions ([07a1fff](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/07a1fffee36a5c736aaa45dde24a7418286ead50))
* **Processing/Indicators:** Add `EnesLesIndicator` `MaadLeqIndicator` and `TemporalEntropyIndicator` + Append old code with `deprecated_` flag ([bf594b3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bf594b305a9b594dd0bb39daa7ae061baf1a2e71))
* **Processing/Indicators:** Add frequency entropy, ACI and ADI indicators ([6837ca8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6837ca8529724bde680069915631d394361e9689))
* **Processing/Indicators:** Add new indicators + Add `Audio` class to get sound and spectrograms from and pass in indicators ([8a81da0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8a81da09691a5ea7187357096a87c654e8c0974e))
* **Processing/Indicators:** Pass `storage` instance only when storing ([4675f30](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4675f305d38786ae7e8f965e9bb1af63a3d04f0d))
* **Processing/NewClasses:** Add feature reduction ([2afd08f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2afd08f0b291773984d993dc6058b3bc5cc46203))
* **Processing/Reducers:** Add `PcaReducer` ([09d3c0b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/09d3c0b1c22a1c454bf34081450e0348ae63a3cd))
* **Processing/Reducers:** Add `SparsePcaReducer` ([37975b5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/37975b5b1aad47b666b60997f1908e0a977a06e6))
* **Processing/Reducers:** Add `VaeReducer` ([2a09869](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2a09869e28e41162fb001ac9b7934d60f6732dba))
* **Processing/Storage:** Apply nested shape ([bc3bb54](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bc3bb54a2a9a68e006ca4e3e6c2f9aea9100b626))
* **Processing/Volumes:** Add `MeanSpreadingVolume` ([5b93812](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5b938125b7a7528458d7940bf517d7ad509ec684))
* **Processing/Volumes:** Add `MeanStandardDeviationVolume` ([6b0a479](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6b0a479efc888fb21c5b51a2bf3e44b33b4d48c5))
* **Processing/Volumes:** Add getter for values + Pass `storage` instance only on storing ([fe6f09b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fe6f09b813df907464a94b8ed37e7ae6d17436b0))
* **Processing:** Add `Env` class to retrieve paths from shell arguments + Add validation checks to `Storage` and `Config` + Move files for better file structure ([ddec373](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ddec373d8788087913033a8a4ea00f3233a36c6a))
* **Processing:** Add basic `Volumes` + Improve file and folder structure + Misc ([27854f7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/27854f7c486d565d5348a47fc913628f40d5b610))
* **Processing:** Add command and action `all-actions` ([7800e61](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7800e6131d9449f425f7ff3eef76685d9cfaf55a))
* **Processing:** Add command and action `all-to-groups` ([9280725](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9280725317dac9f637a0349de064ce8b14171726))
* **Processing:** Add console outputs ([5d65c37](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5d65c374187d856b03c99795e056ac31e7e1af79))
* **Processing:** Add new classes (WIP) for Config, Extractor, FeatureGrouper, FeatureReducer, Storage, Timer ([edae5b4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/edae5b4b9347b1342561c7410e48d096d7da52bb))
* **Processing:** Add new configuration file and storage paths ([d72b27c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d72b27c1773ae9a1c57d9eb86910e900e4cce0c9))
* **Processing:** Improve `Storage` interface + Improve actions.groups ([b948b46](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b948b462e4a11221d935b532073c29c043851970))
* **Processing:** Migrate to refactored code (WIP) ([240b07b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/240b07b815e469dec6a3092ce3a09eff42f7e716))
* **Processing:** Remove unused shell scripts ([2e5e25f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2e5e25fbfbb8d9518ca77a395dfca0c2afd1d479))
* **Processing:** Replace map objects for reducers, indicators and volumes with factory classes + Update `Storage` + Misc ([785f9ee](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/785f9eeb8b38fcdd3a63a42d0e5ad8cb56f22f0b))
* Remove flask backend ([39206d0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/39206d00c631a4244ddf0c98918276552907c2bd))
* Store metadata + Update front to use h5 ([6e59088](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6e5908845a455a71e8f99686827a584187664a4f))
* Update Dockerfiles (WIP) + Update readmes (WIP) + Update scripts + Update config example ([303798e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/303798e0ec52f011c6e7f325ebaf21b9993524a5))
* Update documentation + Update examples + Update releases + Update dev commands + Misc ([6a9f287](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6a9f287905d985266fdf12653a91407c31e692a3))


### Performance Improvements

* **Processing/Audio:** Merge duplicate code for spectrograms generation ([daeed01](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/daeed0107d76b5a54a125867dc48c6c63f49cab1))
* **Processing/Indicators:** Remove redundant checks ([58150d1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/58150d17745cb23406d10265fab202eb544a03a0))
* **Processing/Storage:** Improve interfacing with reducers ([de73e93](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/de73e932cfff166a8f223eda34279e495164d26a))
* **Processing:** Improve file structure ([3683cec](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3683ceca85bb7f6c6f788210ad08de9639bdcf79))
* **Processing:** Improve file structure ([cca49a5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cca49a504bac510df6d4ca4bcadb7f48a551da4d))
* **Processing:** Move `Timer` under common folder ([f2ab5f0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f2ab5f0b40b4cfcd83166c659143488682d3d277))
* **Processing:** Move timeleft printing logic under `Timer` ([e8a0f28](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e8a0f28cd740c49dddcf9618eecab4614d07563c))


### BREAKING CHANGES

* **Processing/Storage:** H5 paths for `files_timestamps` and `files_features` have been changed.
* **Front:** Front routes have been changed
* **Front:** Storage has new shape, Front has new reducer selection
* **Processing/Storage:** New storage shape with heavy nesting
* **Processing/Config:** Excel sheets have been updated to improve readability.
* **Processing:** Excel file has a totally new shape.
* Complete removal of `back` module and related docker images, commands, etc

# [5.17.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.16.0...v5.17.0) (2023-01-31)


### Features

* **Front/UMAP:** Add cycling scale for daily coloring ([208948f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/208948f27c631233bfb5788b44ac248a89677c16))
* **Front/UMAP:** Displayed dates are unchanged unless `display_locale` is defined in Configuration ([80a5280](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/80a52807609cff18fcccf753b4328752e942a941))
* **Front/UMAP:** Improve layout to maximize plot size + Add date picking to date start (time range) ([067c458](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/067c458d8ae84d73575b1578ce37bf2b3a844b30))

# [5.16.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.15.0...v5.16.0) (2023-01-26)


### Features

* **Front/UMAP:** Interact with Legend size with toggle and not hover ([a3e1748](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a3e1748e42d4c914a0c1c560cb08773d50b7384b))
* **Front/UMAP:** User can zoom on a range for full accuracy + Misc styling ([c8c42e3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c8c42e3c61e2eaeecd4fec245c6d4dd3d6c69145))

# [5.15.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.14.0...v5.15.0) (2023-01-26)


### Bug Fixes

* **Processing/BuilderUMAP:** Raise exception when `umaps_ranges` is not valid ([df6f1b4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/df6f1b4fa27ff4a96d86282564430ad2660e05cc))


### Features

* **Examples:** Add SSE CPU and CUDA versions for Linux ([c141510](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c1415103ff7630493bc479f393e8154921135e5f))

# [5.14.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.13.2...v5.14.0) (2023-01-23)


### Features

* **Front/UMAP:** Notify user when data can not be fetched ([c5174ef](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c5174ef39c5ea5fd2e8b1258d617301be4a5e3b0))
* **Front/UMAP:** Notify user when features can not be fetched ([12fd86a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/12fd86a209de216e75c676581a142a3b13622bd4))

## [5.13.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.13.1...v5.13.2) (2023-01-23)


### Bug Fixes

* **Front/UMAP:** Display dates in local format + Improve coloring by fixed time window ([738439e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/738439e3a7da3415aee2d41dd288c3e85d4acc0f))

## [5.13.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.13.0...v5.13.1) (2023-01-20)


### Performance Improvements

* **Docs:** Ignore png files when zipping examples + Update documentation ([9a87b7c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9a87b7c6db529dfdca8e00ccc92568bcd5abc30d))
* **Front/UMAP/TimeRangeSlider:** Move `interests` static elements out of loop ([5989230](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/59892304bbfb50bd20518658ff90451ef73e4b20))

# [5.13.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.12.0...v5.13.0) (2023-01-20)


### Features

* **Front/UMAP/TimeRange:** Add zone of interests depending on selected duration ([a34f3f3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a34f3f3856fe089d025160567883df0d6c31b440))

# [5.12.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.11.0...v5.12.0) (2023-01-20)


### Bug Fixes

* **Front/UMAP:** Apply new opacity default settings + Improve UI clarity ([3de0f42](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3de0f424237404744086e2243adfe0dd60a56452))
* **Front/UMAP:** Coloring by meta properties now correctly apply opacity ([ff3ad06](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ff3ad062ebd4f9055523155f0f066a970e427693))
* **Front/UMAP:** Screenshot component now correctly disables on UMAP status ([acb3407](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/acb34070d160cd0b84323a2d7b14810d286329c1))
* **Front/Utils:** Get correct audio file path for nested path ([88517f6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/88517f6d3a437b41de234fbf2682dfa94552b1fc))


### Features

* **Front/UMAP/TimeRange:** Improve event listener handling + Add tooltips to explicit shortcuts ([3357d7b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3357d7b9b33b6eed19889e45537d57b1f43a3b2d))
* **Front/UMAP:** Add final logic for `TimeRange` ([2254096](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/22540969ae52ac78e0e798ac4dbad9a1168ba078))
* **Front/UMAP:** Add keyboard shortcut `n` to increment current value in time range ([c1d9976](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c1d9976d866909d4cdaaf91f93a8c84a3a7fb325))
* **Front/UMAP:** Add screenshot options (full page or plot) ([05c5222](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/05c52220504f8666262b91e33e14e145cf34bd4a))
* **Front/UMAP:** Add skip backward feature to `TimeRange` sub-component ([9f4b3ef](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9f4b3efe5546bcbde8fb8d41fa76f20bd32bc72e))
* **Front/UMAP:** Rewrite `TimeRange` component ([675f50e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/675f50e577012e79ab23561132ec41c3fbe9c4bf))

# [5.11.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.10.0...v5.11.0) (2023-01-18)


### Features

* **Examples:** Split SSE for windows versions in `CUDA` and `CPU` flavors ([1b73189](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1b73189f162bad3d368b2f9e04fab747eec0eb51))

# [5.10.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.9.2...v5.10.0) (2023-01-18)


### Bug Fixes

* **Processing/ExtractorDataLoader:** Call `torchaudio.load` instead of directly calling inside `torchaudio.backend` ([1a6abe6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a6abe655e23bf5834387b6e5e197b8c46f76ba1))


### Features

* **Examples:** Add `SSE Next Docker for Windows` version ([9376fdb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9376fdb426818e27f1e8637c768ec156ec9808a9))


### Performance Improvements

* **Docker:** Improve docker compose files (Remove `version` and deploy with `cuda` enabled) ([b6882ed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b6882ed2b7d0b2cb896f1ee7eba39bd2fbf31654))

## [5.9.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.9.1...v5.9.2) (2023-01-17)


### Bug Fixes

* **Releases/SseDockerWindows:** Fix paths in docker-compose file + Fix console output ([a57b9ea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a57b9eae99d613fabc5a4b54ad782a35e9b30e9a))

## [5.9.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.9.0...v5.9.1) (2023-01-17)


### Bug Fixes

* **Releases:** Generate and document `sse-docker-windows` project template ([ae2761c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ae2761cd7119734c4f3e2c1dfde8b01e8404b67a))

# [5.9.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.8.1...v5.9.0) (2023-01-17)


### Features

* **Examples:** Add `sse-docker-windows` project template ([3498167](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3498167df3701a8d9cf1d4b2f6430529b252927d))

## [5.8.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.8.0...v5.8.1) (2023-01-17)


### Bug Fixes

* **Processing/Utils:** Replace static division with result ([3908af6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3908af6f9ef2650efddd04366fe82c6fa762be75))

# [5.8.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.7.0...v5.8.0) (2023-01-17)


### Features

* **Front/UMAP:** Add screenshot button ([a618116](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a6181161cc3b368e3b7c54dce51f76f11de72fb1))
* **Processing/Builders:** Add configuration option to use UMAP integration values ([6d31764](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6d31764a4217f95e740b1236f26e35d3906b985e))

# [5.7.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.6.0...v5.7.0) (2023-01-14)


### Bug Fixes

* **Processing/BaseConfigWriter:** Add direct instantiation lock ([8f017d3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8f017d31d7753c47c0507fac7a4783e736613ec8))
* **Processing/BaseConfigWriter:** Ensure index is using `int` ([4a52fbc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4a52fbcdf3f1156e755995eac56aace5350027bd))
* **Processing/ExcelColumn:** Ensure passing fixed variable to lambda digest function ([22df19d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/22df19da29fb3f1c717bc84e2b9fb063cf35d159))
* **Processing/Indicators:** Rename `BioAcousticIndex` to `BioacousticsIndex` ([3aa7c64](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3aa7c64e1bb4cfe16dd450d34cee90f4e08a26c4))
* **Processing/Types:** List `BuilderProcessorInterface` under types and rename it from `BaseBuilderProcessorInterface` ([9ac8b50](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9ac8b502644a7472e05cb7942ce39ffe1c2fea1b))


### Features

* **Processing/BaseConfigWriter:** Add console output with column information upon configuration writing ([c261b11](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c261b1161f0e8f43d831654858df980882e8d30d))
* **Processing/BuilderIndicator:** Add other indicators with empty processors (to complete by business) ([ace7770](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ace77708c54af687e80cf771750a7a69effe4c83))
* **Processing/Config:** Add conversion from indicators results to config file as meta values ([6ec916e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6ec916e31b16903635bed1844ce00bee43ee23dc))
* **Processing/Indicators:** Add computation for `ACI` ([5bafea9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5bafea90247d61d690b3adde21852be9b65a8e43))
* **Processing/Indicators:** Add computation for `ADI` ([766a829](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/766a829a1795797bab3ad757a3e686053e7e344e))
* **Processing/Indicators:** Add computation for `BI` ([7f7c8c2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7f7c8c25eb20e28b7f2d938ac01e1e3227afa8a8))
* **Processing/Indicators:** Add computation for `Hf` ([6075f40](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6075f4057e63d33a33ad7c353a4da4f7c48a6ea6))
* **Processing/Indicators:** Add computation for `Ht` ([8fc21a1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8fc21a1d373fa24a9579703d965c061402e2106f))
* **Processing/Indicators:** Add computation for `Leq_T` + Rename `EquivalentLevel` to `TemporalLeq` ([5bdb1db](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5bdb1dbfa7f4d462e246905c91140f6fbd560be2))
* **Processing/Indicators:** Add computation for `MED` + Rename `EnvelopeMedian` to `TemporalMedian` ([89f166b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/89f166bc0560932258ebb69c63bd83cc82704ff4))
* **Processing/Indicators:** Add computation for `NDSI` ([e6c8e7f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e6c8e7f78c8b074a4aae701fa883c0b782f48428))
* **Processing/Indicators:** Add individual `sse` commands ([ece4c05](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ece4c05079e835d92741827f1f137456def5141f))
* **Processing/Indicators:** Pass `sample_rate` from base class to child processor method + Add method signature + Add better typing and imports ([1715e72](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1715e72cc871d4ef1adfd3ff6281b0e150c6d3cf))
* **Processing/Indicators:** Print `ACI` value to console ([661dd46](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/661dd462154ca2d92ecee47b9cd76dd715c60446))
* **Processing/Indicators:** Print current path to console ([251a417](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/251a417738b123c3eeb13de47b4bca63da46695e))

# [5.6.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.5.0...v5.6.0) (2023-01-12)


### Features

* **Processing/BuilderIndicators:** Add base and parent classes + Example for `equivalent_level` + Add related dependencies and commands + Various improvements ([66d6926](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/66d69261a97bd4297f98c5b25de4ca3a642c45f5))

# [5.5.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.4.0...v5.5.0) (2023-01-12)


### Bug Fixes

* **Bin/ArchiveExamples:** Move back to parent directory after archiving a folder ([cf5a4f3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cf5a4f3ad633d942a46256d92ddff7d372c3615d))
* **Examples/SSEWebDockerLinux:** Use latest `docker compose` commands + Update README.md ([93aa202](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/93aa20239c78f6c84f04be84343da6097e3c64dd))
* **Processing/Config:** Create utility function to read version from package.json ([4fdae9a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4fdae9a125c22e0ea25aa85e5a05e62b4be9937a))
* **Processing/Run:** Intercept SIGINT at top scope level ([8bdec58](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8bdec580ec9755e06f7808e4b17f2aa75b1ab8e1))
* **Release:** Add `sse-web-docker-linux` to GitHub releases ([008c1a1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/008c1a1b27c8f0b31182dc4cb588604aa4cc2da4))


### Features

* **Examples:** Add `sse-web-docker-linux` example + Improve existing examples ([f8212dc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f8212dcd75bfc837f0d3a46cba40acf1c7c7b491))
* **Examples:** Add raw `sample` project folder with default configuration file ([95252c1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/95252c11a4bda682ae8aae39d2a33c898dec56e0))
* **Front/UMAP:** Click on a point to copy its local path ([d7f4596](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d7f4596ea15e2443ae1a2304ccbd646167714ca4))

# [5.4.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.3.0...v5.4.0) (2023-01-12)


### Features

* **Examples:** Replace archive with source files for `sse-web-docker-windows` ([6e6316c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6e6316cf62fbbc162dd9fb0853473d4cbc3fed3b))

# [5.3.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.2.0...v5.3.0) (2023-01-11)


### Bug Fixes

* **Processing/Config:** Apply dirty fix if `package.json` is not found ([e211721](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e211721243b32afcfef2893984607f550a240f05))


### Features

* **Processing/Config:** Replace `sse show config > output.json` with `sse config export` + Verify config path ([a0e31d9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a0e31d97ef3122f5e07a9336f42f90e93038a307))

# [5.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.1.0...v5.2.0) (2023-01-10)


### Bug Fixes

* **Processing/Extractor:** Set total extractions (times number of bands) ([59f5b4c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/59f5b4cc1f2c198e47ca45973b37dd92362ffac9))
* **Processing/Timer:** Add hours printing ([bcc4b11](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bcc4b111799e066114c902d533f35a14adbf1ebf))


### Features

* **Front/UMAPLegend:** Improve styling ([30aa64a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/30aa64ab9b56135947b7f64c26ed24eaf40767f0))

# [5.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.0.1...v5.1.0) (2023-01-10)


### Bug Fixes

* **Front/UMAP/Export:** Apply dirty fix for UMAP exports ([a6362bd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a6362bd4d113f3a8e2d757848c7b19c46eaf92e4))


### Features

* **Front/Menu:** Display app and config versions ([0edd61e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0edd61ebd78493d7cb2586b0aa0696aacf12277d))
* **Front/MenuVersion:** Improve styling + Display background color for versions match ([1ef93a0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1ef93a015405f961fdc42a5588cdb73ed4a6e60c))
* **Front/UMAP:** Move `Meta*` UIs into floating modal `Legend` component ([653f3b3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/653f3b3e09ab096ccc9a6d6493b4e761168e2dee))

## [5.0.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v5.0.0...v5.0.1) (2023-01-09)


### Bug Fixes

* **Processing/Command:** Add `run_compute_features` to run alls but volume/covering ([2bb9fdb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2bb9fdb8bd5c538a63e7a96b719ca72ebaf423c9))

# [5.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v4.2.3...v5.0.0) (2023-01-09)


### Bug Fixes

* **Processing:** Remove dead code related to command `sse extract preview` ([00090de](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/00090dea9af7756d39510d56f93561664e73f799))


### Features

* **Processing/Extractor:** Feed frequency range in Hz instead of mel parameters (size and start) ([1e11b88](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1e11b880e653894b92f708924f7fcff3f5dc67ce))


### BREAKING CHANGES

* **Processing/Extractor:** `bands` fields in Excel configuration now specifies frequency ranges expressed as `min-max` in Hz

## [4.2.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v4.2.2...v4.2.3) (2023-01-09)


### Bug Fixes

* **Processing:** Using audio chunks of 1 sec ([e8b8147](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e8b8147944d755e7bd5cd93a25a98fcc33062aaf))

## [4.2.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v4.2.1...v4.2.2) (2023-01-09)


### Bug Fixes

* **Processing/BuilderUMAP:** Select correct `meta_values` ([36f9ff9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/36f9ff9afc95e9d638e59716c42e4d94c47175ff))

## [4.2.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v4.2.0...v4.2.1) (2023-01-09)


### Bug Fixes

* **Front/UMAP/Filters:** Use better variable names ([977c8e1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/977c8e1ae03cd6bbeb8a5a24c9423ff4656bf4cd))
* **Processing/ExcelOpen:** Make sure read values are strings ([32825a2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/32825a28b2429c2e1908defbb8a41522cbd52883))
* **Processing/Load:** Affect `meta_values` outside for loop ([0bafad4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0bafad4749b2fb468aaae14e6d05cdceae4bef32))
* **Processing/Run:** Use better function names + Compute config when computing all ([0dc698b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0dc698bac35e61b128091e0cee016d223c694925))

# [4.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v4.1.0...v4.2.0) (2023-01-09)


### Bug Fixes

* **Front/UMAP:** Remove dead code ([5e0cc35](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5e0cc355df52ad7a5ae233d398a0396fc5454c8a))
* **Processing/ExtractorDataLoader:** Verify path existence before file loading ([96c9650](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/96c96508e41a74711a57f76d3fed19ccdf5493f3))
* **Processing/Extractor:** Set correct path types + Set correct logging + Improve logging ([7ad56aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7ad56aa141c42f396b4af5b39a17d5e12ad9a1d6))
* **Processing/Timer:** Duration was the total, now it is the correct remaining time in minutes ([e0a9397](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e0a9397ebf6f3095fa490cbd030b9c5c0410e28d))
* **Processing:** Handle already completed configuration file with non-compliant filenames + Clean processing commands + Misc ([c0c1c95](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c0c1c953b67141d68efdf6e41349b7b6fd56cb1f))


### Features

* **Front/Settings:** Add `debug` settings to control WIP features display ([cc966fd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cc966fd0cff0c0998c7704cd03dd7ceaefbd097e))
* **Processing/AudioFiles:** Add paths verification on object creation ([e2d49e6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e2d49e69dd9a776af1c9bf31c6fb1f181e6c2dab))
* **Processing/Extract:** Reduce complexity of features loader function ([98f28e0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/98f28e05537f7d6b566ecaa54110677b5dc07ed1))
* **Processing/Timer:** Add basic Timer to estimate Extractor process timeleft ([d636dac](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d636dacbc79d793c2e8ac25099330d6f2c365cb0))
* **Processing:** Use unique features filenames generated from audio filepath + Read `meta_values` when loading features (to improve later) ([72b4a36](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/72b4a365e5397068035847f64daaa1563bce06cb))


### Performance Improvements

* **Processing/ExtractorDataLoader:** Call for verification before main function ([6ec09be](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6ec09be993ba2c8eed212adf174da447bfaf2c4c))

# [4.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v4.0.0...v4.1.0) (2023-01-04)


### Features

* **Front/UMAP:** Link CSV export settings to export action ([fb7ad48](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fb7ad484b9602d58612309b8a86e3afb679dbf34))

# [4.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.15.2...v4.0.0) (2023-01-03)


### Bug Fixes

* **Front/UMAP/Export:** Add utility function to retrieve file tags (lighter and more exhaustive) ([5f79c5e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5f79c5e39be1deb01150857b17b4801a2622ad32))
* **Front/UMAP:** Destroy scatter plot and dataset on component unmount ([d085b96](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d085b962b6b3869fb5da89cd44fe0cc8be1e7f65))
* **Front/UMAP:** Rewrite Complex Query filter + Improve code quality ([26cd048](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/26cd048aae3f5a95b6bb80cd60efc8f5e8814103))
* **Front/UMAP:** Use correct indexes for `getMetaColor` ([baee572](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/baee5723e7f21b308f0484f68643672eaf71d8c2))
* **Front:** Rename files attributes `columns` into `meta` + Remove legacy TODOs ([af14366](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/af1436688a2699c296003f03c3103cfad7344b34))
* **Processing/Config:** Force meta values to be string ([e641360](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e641360cd82291f85f5fd8b1a8cce3f932c8f22d))


### Features

* **Front/MiniTools:** Add link to legacy app ([bdef193](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bdef193fb93dff722b4486d47f5d2cb04046eef2))
* **Front/UMAP:** Add notification on export ([4ff0ac7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4ff0ac785701526096ed7f39906262cbfb980022))
* **Front:** Add new `/settings` page + Add UMAP CSV export settings ([8664511](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/86645111b13b291e4dc3b6ad664d3594440a3b55))
* **Processing:** Refactoring, Add `AudioFiles` class (implements files iterators) ([e9b0bfb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e9b0bfb37e1d41e490f61b16c68d28e0585dfc8b))
* **Processing:** Refactoring, Add `Builder` classes replacing legacy code for computations ([bbd9946](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bbd99466afc4f6278c2c41ea863513f2c8b06ede))
* **Processing:** Refactoring, Add `BuilderFeature` class replacing legacy `compute_features` ([efad335](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/efad335fb4fe5acc1a268952ca6bef8ef2ccdd65))
* **Processing:** Refactoring, Add `BuilderVolume` + Adapt back-end endpoint and front code to handle new `site` wording ([b074343](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b074343e4a29db89c22e7ec5790ad17529c9d684))
* **Processing:** Refactoring, Add `ConfigGenerator` class for dynamic excel population + Remove old hard coded instructions ([9810c51](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9810c518abbc293f48a9d5bb7abad06e664dbbee))
* **Processing:** Refactoring, Add `ExcelOpen` class (separation of concerns with `Excel` class, will be merged eventually) ([b5e93f5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b5e93f5f90490ddf558033f50ab5ca0e7272d6e7))
* **Processing:** Refactoring, Add `Extractor` class (features extraction) + Misc ([d53e4d1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d53e4d1b3f8a5a8ba264a0b3b6fa263575071094))
* **Processing:** Refactoring, Add `Filepaths` class to handle files and folders discovery from disk ([279021f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/279021f8a07c5462fef101a9a43f3df49844e851))
* **Processing:** Refactoring, Add `UMAPBuilder` class replacing `compute_UMAPs` legacy function ([0fc6917](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0fc691747ae7a75cc8068260e97043e1ba417f43))
* **Processing:** Refactoring, Improve `Builder` and `Excel` classes ([0988559](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/098855951e2dd7de4da8ca2c4bc867ee569f6fb3))
* **Processing:** Refactoring, Improve `BuilderUMAP` class + Remove dead code ([f83f591](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f83f5912a5c16d0460b84cf46071ba62f390f6d2))
* **Processing:** Refactoring, Improve `ExcelColumn` class + Rename legacy utility function + Remove dead code ([3b71a94](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3b71a9494e11313cd59dc7dd81ada4cc9174f497))
* **Processing:** Refactoring, Improve `ExcelColumn` typings ([13e4df6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/13e4df67598d7e621d027f0c92d41c52823b07ca))
* **Processing:** Refactoring, Improve console output for `Extractor` class ([bdde6e2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bdde6e2461ad29c9caf481d3c862906158339fb4))
* **Processing:** Refactoring, Merge legacy code into `Config` class ([caf9666](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/caf9666097deb9bea06c2aead9c61175f8d94914))
* **Processing:** Refactoring, Remove dead instructions ([213f217](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/213f2175b5ef404e3c02269d37bb0b9e21beab15))
* **Processing:** Refactoring, Remove unused commands and associated code ([a9e3eae](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a9e3eaeeeb5c1cd4d81544f413d57d2f2ee50357))
* **Processing:** Refactoring, Rename `DataLoader` into `ExtractorDataLoader` ([5eb4f4d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5eb4f4da2cd01eee3ed588a560fbd9fcb6dc2340))
* **Processing:** Refactoring, Rename old wording files' columns into meta ([289b7c0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/289b7c00e3e849666367de9def39b1199a33215c))
* **Processing:** Refactoring, Rewrite in OOP style for better readability and maintainability ([ea02c5e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ea02c5e22c1aa70cef7a38306791d6ab41104c19))
* **Processing:** Refactoring, Use better wording for actions + Rename old files' columns into meta ([c4591b8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c4591b850ee30c5b46d334b3b7993207463b7982))


### BREAKING CHANGES

* **Processing:** Refactoring Processing module

## [3.15.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.15.1...v3.15.2) (2022-12-20)


### Bug Fixes

* **Processing:** Remove singleton for model classes ([50e8825](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/50e882564fdf532754d96399f55d054da248f2f8))

## [3.15.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.15.0...v3.15.1) (2022-12-19)


### Bug Fixes

* Save grouped features at Processing level + Build correct data for exports from Front ([b10974c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b10974c7d95f5e0bc17e327e3d31a97b3db0effe))

# [3.15.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.14.0...v3.15.0) (2022-12-16)


### Bug Fixes

* **Processing/Features:** Add `TIME_DELAY` constant (set back to `0.92` for now) ([8b10af5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8b10af50dff0a234d8cf79257c4e626323708ff7))


### Features

* Add alpha control UIs to Front + Work on feature extraction + Import static version of `scatter-gl` and alter its source to allow transparency + Add new color types based on configuration columns + Misc ([191163d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/191163db922115281af59452dd8eb3a7e00b7f90))
* Extract features from back end + Build downloadable objects with those new data in Front end ([664cee9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/664cee93e8075778a1f66d0a5d1bd5499e903287))
* **Front/UMAP/Alphas:** Improve text readability + Reword ([6f372d8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6f372d89de0e8e52f85b71c84e504c81f7149808))
* **Front/UMAP/Legend:** Add media queries to container + Add export for selection + Show only label strings for selection + Misc ([91a358d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/91a358d0d76b209a90a4f2c0efc0e06cb1c68040))
* **Front/UMAP/Legend:** Add tooltip to Gradient + Add selection list ([049a722](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/049a722eae056c17b077cb106a18b3c2e2b67017))
* **Front/UMAP/Legend:** Improve styling ([a58c9e9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a58c9e930979d122bc4b62ea6b1945913d7c919c))
* **Front/UMAP:** Add new Legend component UI skeleton ([08cd836](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/08cd8361d0dd721c7ddcb75fd21bdbbdd9381f32))
* Improve code quality + Remove code smells ([4ac04e6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4ac04e6549c1b53fb09b13372c96f3c8cc29e311))


### Performance Improvements

* **Processing/Computations:** Move computations utility functions under `utils` ([16681eb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/16681ebe28a6fbba1b00889bf23e1c5c76161568))
* **Processing/Features:** Remove redundant arguments + Dead imports ([e9478f6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e9478f6bfb44b240d9fe753d42903d8cbd8d64cf))

# [3.14.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.13.0...v3.14.0) (2022-12-10)


### Bug Fixes

* **Processing/Config:** Preserve existing `files_COL` names + Fix `run_all` command ([079175a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/079175ae5eaa030f094d3e76669ea7825c77c29c))


### Features

* **Front/UMAP:** Improve filtering for query complex ([805593d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/805593d3a3bce23434e49f1637b9eb5ca06144f3))
* **Front:** Add wait modal when UMAP dataset is loading + Rewrite selection table component for dropdowns + image button + Various improvements and TODOs ([f497a17](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f497a17c5dd8e27f681fd3e6edd94e3a47ff3314))
* **Front:** Improve Button component + Improve UMAP page (Export, Filters, Color types, Styling) + Add CSV Export for UMAP ([426bc07](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/426bc07ab0c59d8eea30e9afbbd0f33fb9899c46))

# [3.13.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.12.0...v3.13.0) (2022-12-08)


### Features

* Add dynamic r/w of `files_columns` from configuration file + Expose those columns + Misc ([cc90fc0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cc90fc0a66592783a57d3a8d9b89726ac00219ab))
* **Front/UMAP:** Add logic to complex query filter + Improve filters + Misc ([a362c44](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a362c449e4e30eedaa18ea157d65d79546cdb4ef))
* **Front/UMAP:** Lock filters if no dataset loaded + Add UI for complex query ([c52d772](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c52d7723448d9e9b944281cc519feca34e0b0bba))

# [3.12.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v3.11.0...v3.12.0) (2022-12-07)


### Features

* **Front/UMAP:** Add export to JSON ([0bab898](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0bab89856afc80d9ce2a512ba8989084740118f1))

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
