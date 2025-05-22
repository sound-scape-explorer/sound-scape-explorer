# [14.0.0-beta.8](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v14.0.0-beta.7...v14.0.0-beta.8) (2025-05-22)


### Bug Fixes

* **app:** update beta config migration tool + use tsx instead of ts-node to run it ([5e78f13](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5e78f1314c35216c969e99625bd2d7d6a06e8221))
* **examples:** update coral reef light with new traj smoothing window setting ([2edd7fb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2edd7fb29fa1aee848e52488862225f59b9d0ad9))
* **front:** improve interval building performance ([60a4254](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/60a4254b11d69f2e0ccdfe46642f697e9cc5b70c))
* **front:** improve ui reactivity on view load ([acc9363](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/acc93632d4a8ee14c51e0dd04de4d6e0fa1c8944))
* **front:** improve view loading text ([dd04a0f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dd04a0fcde6a06e85af0c56b04aeb3f283c48320))
* **front:** improve worker base array reading type annotation ([4ce3c89](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4ce3c8943aba0307d18cb6fb2e4b0bc4a80f821a))
* **processing:** improve console ouputs for extractions ([258ce47](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/258ce476fe0b8ffbd2452ffe5a7b704145f0eefd))
* **processing:** improve console output for aggregations ([0d736c6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0d736c68bbb6d5083a6aa58e81c8f2453f34c1c5))
* **processing:** remove dead code ([dd88124](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dd88124e0bec8abb616bfa6a49ec24e8ad73d9e3))
* **processing:** rename validation decorator ([2af7e4b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2af7e4b3ea9298d21d4f52a588f13b21f4068699))
* **processing:** rewrite tag aggregation logic and get rid of rest of legacy ([781c489](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/781c489706ee8821334f1ad1a53d9727934b56be))
* **processing:** use app namespace for related util methods ([559033d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/559033d862221072fa073b039adac869dde18fa6))
* **processing:** work on console (WIP) ([ae9ee2e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ae9ee2e0a389aed17d09d163e6117552a7d43a96))
* rename `ed` variables to domain objects ([d05a085](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d05a085ece9f3d34227e88611abf66dadd840d31))

# [14.0.0-beta.7](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v14.0.0-beta.6...v14.0.0-beta.7) (2025-05-16)


### Bug Fixes

* **campaign:** correctly building extended trajectory configs ([fc58fca](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fc58fcad6680daf2b24af7f592fad8949cd7a252))
* **campaign:** rename trajectory step to window ([2bae537](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2bae5372acd98961137a06fd62119b199e04304e))
* **campaign:** update validation to use extended configs ([4038e1f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4038e1f5c57888564677125f8783f63b7a133109))
* **front:** improve dark mode help text ([41fd0f2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/41fd0f2cc7f4d0763f33ed1245e457799c1623c8))

# [14.0.0-beta.6](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v14.0.0-beta.5...v14.0.0-beta.6) (2025-05-16)


### Bug Fixes

* **campaign:** improve wording for config export steps ([b898c23](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b898c234f4863d00d9d8be647a2c9f63fffbcb0d))
* **front/timeline:** use more explicit button name when focusing on current interval ([2b36236](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2b362361b6894460644b3132ec927f80276c763e))
* **front:** factor client settings + replace unions and enums with zod enums ([170d3f9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/170d3f968ced8bc7aa8aa8bb0e9f2d1500971c18))
* **front:** forgot import ([6ec2979](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6ec2979d330cea9f14eaea1bf82b3ae5bcc08a4c))
* **front:** get rid of injection pattern ([29dffe1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/29dffe1c679b47a1b64276d7745afc678c68dd0e))
* **front:** improve color contrast and remove dead code ([ff2cadc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ff2cadce27333e2873e219cdfbb460467570d714))
* **front:** improve colors ([44aac20](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/44aac20484cfff262816a9aea5b8eff61e07bc85))
* **front:** improve legend for relative trajectories ([063189d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/063189d321f27f59e3e05056e8862e08ad5128f5))
* **front:** prevent name collision ([5d31401](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5d314017a1d5d52ad795b634e055fcb89bfbca8a))
* **front:** remove dead code for old timeline impl ([cb72cf0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cb72cf0d4443229242efd1f00aa7cfdc33098478))
* **front:** use consistent namings for tags instead of labels + merge multiple windows intervals when creating tag uniques ([5216492](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/521649256248ddd1df5b9086b569e8d8c20272fa))
* **front:** use enum for color categories ([4c36cf3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4c36cf3f3ad0dfe922d7a400ad95368a5e252f46))
* **front:** use proper color contrast in dark mode for gradient tooltip ([ac41308](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ac41308249719b848486124000deb82108a0d3c5))
* **front:** use proper enumeration for draggable keys ([9ae105a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9ae105ad849f5cece307bb640fc2574c6cbe46a3))
* **front:** use proper key for grid item (refactoring tools went too far) ([70c1c76](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/70c1c76db43d67d7dd86e944ff224bb1599a3c10))
* move ts parser as root dev dependency ([c859f0d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c859f0d5322ea74ceba6707e2f6dc31ae9065d28))
* **processing/reducers:** remove dead print ([b5c27d5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b5c27d55064ba97caab345f0caa6e2b80ba1bc4e))
* **processing:** better wording for trajectory variables ([ae98627](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ae9862701ff49a8d7de9ca61e07061be8eed09d2))
* **processing:** remove run computations purge menu action ([1e8150f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1e8150fe797baaedbd64729cd2c78ff3b302fe8d))
* **processing:** rewrite relative trajectories ([78b2a88](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/78b2a88ea1e47dc586e12cc87d915127cc2163f5))
* **processing:** use common audio loader ([f5aaddd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f5aadddc4eaf57c967551aeb113da5d61160408d))
* **processing:** use factory for reducers + update file names ([8b6eb8a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8b6eb8acb9438cb9efe2235c2b5055fefe2ecd21))
* **processing:** use strict time exclusions for trajectories interval filtering ([3ff3cb4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3ff3cb4b645eabfcf53b9db63e80f7f9bd9de6c0))
* properly enumerate storage path domains ([991ffb8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/991ffb8168c916e7c20bf08c1cd91c3f6b505af0))
* rewrite trajectories globally ([022c9ed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/022c9ed640582e586ae2fbce54223e10e0bd81cb))
* streamline enum generation and naming ([b28ddfe](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b28ddfebe365a21773d2baa57701302e588187dc))
* update relative trajectories consumers + enumerate relative trajectories storage paths ([92c41ee](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/92c41ee6151c6366917a1668ac411ae17f302c29))
* use consistent enumerations for storage path registration ([f310e2d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f310e2d27eb37092d0cc9df11915398f4160a8bb))
* various renamings ([e7272b4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e7272b49a543cbd2337be6d9c04237476cbbbe9f))

# [14.0.0-beta.5](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v14.0.0-beta.4...v14.0.0-beta.5) (2025-05-13)


### Bug Fixes

* **Campaign:** update package lock ([8fca3a5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8fca3a54bdea0eb9486388f5436684084aa913ff))
* **Front:** Detect correctly 2D pairing metric with new enum ([0cb4924](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0cb4924aed56c7d29ffb1981ce5950439ebe874c))

# [14.0.0-beta.4](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v14.0.0-beta.3...v14.0.0-beta.4) (2025-05-13)


### Bug Fixes

* **Campaign/TableCopy:** Prefer non coercive comparison operators ([59cde6f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/59cde6f6a2f1c2dae068d857f4785c4e43002f9e))
* **CI:** Include visualisation package.json to commited files ([5b1a351](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5b1a3510a71a4fb58b0b932b8ec37006dcf5cf4f))
* **CI:** Retrieve root package.json for electron ([b51eb8c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b51eb8c32c396402543a3ed977cc1f9df03f94de))

# [14.0.0-beta.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v14.0.0-beta.2...v14.0.0-beta.3) (2025-05-13)


### Bug Fixes

* **Campaign:** Handle null exception ([792d65a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/792d65a0bca1f50dc72db872c62cf95f0280c8a7))
* **DTOs:** allow `spectro_stft_window_ms` to be null ([6e0755c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6e0755c6f02f27f29864a6fbf61e3d7ac288744a))

# [14.0.0-beta.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v14.0.0-beta.1...v14.0.0-beta.2) (2025-05-13)


### Bug Fixes

* **Front:** Prefer installing rimraf as dev dep ([d093f8b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d093f8ba60d0b2072ee75a3025896b0186b7be2f))
* Update installation scripts to use python 3.11 ([ffcfbbf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ffcfbbf3fee28a6e2434302a2f6569100dbf4f6c))

# [14.0.0-beta.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.9.0...v14.0.0-beta.1) (2025-05-13)


### Bug Fixes

* add authors and license for squirrel windows build ([3a5567b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3a5567bc2d9213c578f8a721f7ef98fe70c4dbce))
* add rimraf for front build on last release step ([7ea1dce](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7ea1dcef3550d2294f77d859a42a1088b76d53fa))
* allow beta publishing ([cb60c10](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cb60c10dd7806f1e16e12ecaa6e5fde370158ddb))
* **Audio:** Inject absolute time to the slicer and prevent errors when above 60 seconds ([9ffc160](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9ffc160acf79d9936d6e44daa792ed9924abe11b))
* **Campaign/Export:** Improve text explicitness ([e6b8da9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e6b8da9b01d80f886ab5350c8141bece83f28d9b))
* **Campaign/Files:** Improve tooltip content on label property deletion ([d757c23](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d757c231e570d4731ded7362d851c4309820bab7))
* **Campaign/Primitives:** Force left alignment to select component ([d89b0e0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d89b0e03f8137663240bf9a620d98291f675442b))
* **Campaign/Settings:** Improve help for audio path ([83fc2d8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/83fc2d837ccab44eb50e751f6d6e22e9ea7f9851))
* **Campaign:** Add check for timeline origin to be before earliest file ([e8c7ed0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e8c7ed003b056ae5ef1eac50e5dc918ffa2874f6))
* **Campaign:** Add dark mode to drawers ([3c8a106](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3c8a106991481247ffd803a9747861d10f4e0f61))
* **Campaign:** Allow main container to overflow vertically ([c45ae50](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c45ae50675a27a3c2fcab3d923731081533d4116))
* **Campaign:** Apply global styling for code markups ([04395f5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/04395f57439994c32bacaab2653a55ae2b644773))
* **Campaign:** Change user flow after import to land on settings page before files grid ([93af906](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/93af906fff667c8934e51e1213db44ea62a824d5))
* **Campaign:** Correctly load sites from json drop ([fd5ab1f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fd5ab1fedc522811da9799ba9c3262e50aac6473))
* **Campaign:** Disable navbar user selection ([45bfb64](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/45bfb64f20be1113df214a411ccbc805d6896eb0))
* **Campaign:** Enforce label value for trajectories ([76a9d54](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/76a9d5452b25221fe24e4781861a71b78a206dce))
* **Campaign:** Fix typos in help for extractors and indices ([f055aec](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f055aec08458c0001dd7e0839e1d5d0bceb6fbd1))
* **Campaign:** Force .h5 extension in storage path ([8c8d635](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8c8d6356530bdf0c6308a99204a408839b6eb305))
* **Campaign:** Move files to the end of the export files just for the sake of being lazy ([21a271a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/21a271a317aa32550560a71a80bd6b98a51ff7b0))
* **Campaign:** Remove debug statements from xlsx parser ([0b8c457](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0b8c457d953fb303677346a9cc7667180f9c7fc0))
* **Campaign:** Use number input instead of slider for MDM memory limit ([0c702d8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0c702d8f1c1c5f9735f260bab81a0df84fac456c))
* **Examples:** Update coral reef example ([f3ad4df](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f3ad4df8b2469224a78c95236c2e80ea74b5c9ab))
* **Examples:** Use actual site values ([c98998d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c98998d12dbd0d78a78c179cbabf850017907547))
* **Front/Timeline:** Improve recenter behaviour ([3aae15d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3aae15de85292a92bdc4abededfe07710b80cab2))
* **Front:** Fix lower boundary behaviour going backwards + Relocate hook ([25158b4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/25158b4599358c907bf253ac0c2d7dbeb8753751))
* **Front:** Resize plots automatically ([cb1e16e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cb1e16ed5bccad96ced26566b6a8c07e628632ea))
* **Front:** Watch for auto open on interval selection ([251a361](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/251a361e01492ba69809b331cd868e44ef1ba9e6))
* ignore visualisation npm only directive when installing from root pnpm script ([8c76dc6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8c76dc6e6ea781dd30cfd1a08f3f536dc35d3183))
* install vis/electron dependencies with global installer script ([0a59b2a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0a59b2a4cbdaa45a19f97983cde3a4c69a8b453b))
* manually install electron dependencies ([5da8e92](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5da8e92cd5cd909fb7e16c43bbb11757653913a7))
* **Processing/Config:** Enforce int typings when reading from storage ([f7ecf4c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f7ecf4caa5c03a2052cc445433a6b1c05d0130f8))
* **Processing/Config:** Sanitize audio path ([9d7d02f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9d7d02f7e892732be5ace3b42a4b79c104c4d3c1))
* **Processing:** Add strict numpy type alias for mdm ([58a3563](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/58a3563eb08bd078b2b084f4a427fe17e233dabc))
* **Processing:** Enforce dataset typing when reading and appending to storage ([17ba423](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/17ba4239976ebe7d7c71180ff23910cc9ddc7943))
* **Processing:** Freeze python version to 3.10 in pyproject conf file and add pyright as dev dep ([938516d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/938516d0d2e4befc457fef680ad889704b03b4f7))
* **Processing:** Ignore logger warnings from `torio` ([c9134b4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c9134b4598e90eaae998418d98659612bfb24ddf))
* **Processing:** Improve empty mdm typing ([6306b19](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6306b19d3c389cf35442d98cb27bebd51e09ff78))
* **Processing:** Improve label fusion adapter interface ([1b46bab](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1b46babac487751439a1e050bf8bed4ba64dd3c2))
* **Processing:** Improve menu typings ([c3fb3b6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c3fb3b6b8ac6d3ece78bd55171f4bba15e061064))
* **Processing:** Improve storage method signatures ([2f752cb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2f752cbf5a7c5f163946884ec58aa02f40a28968))
* **Processing:** Iterate correctly over reducer options ([35dcec3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/35dcec3e6d0aa495601ea6b17885ab780eea9846))
* **Processing:** Loosen python version requirement ([8e5381d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8e5381d35bc798f1af0e82f582ce0e40dc0c7b15))
* **Processing:** Remove debug print ([1777146](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1777146eb3dd4c5c7c0bee4ec1342f73f669f7e2))
* **Processing:** Remove unused hdbscan output ([8272c01](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8272c014cfe9e5274b17697aca2142a9d35b20b7))
* **Processing:** Use new storage signatures for aggregated data ([e703a6b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e703a6b3153299feabf6dc4d942cdc1efab89cff))
* provide description for electron and root package.json + chores ([b3a076a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b3a076a8b3ca36a1d23e210417767901598025d9))
* remove dead build scripts for windows ([73d1483](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/73d1483c33a59ab9e8c58af2f1fd5d6a3ed561a6))
* update vis prebuild script for windows ([3633fe7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3633fe73e850bf97da7779235baad70ef5b9c483))


### Features

* add new `Processing` module major version + A LOT (desc) ([bc49ea5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bc49ea5fe69f5d09c8fd75c8d6642d8339fb8d2f))
* Add new Campaign module ([644e83c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/644e83ca16f7a115aa34963722c88120c64420f6))
* **Campaign/Files:** Add right click menu over grid ([77745f0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/77745f0a7aaae90d6654abad3cb580841fbb1433))
* **Campaign/Metrics:** Add date validation for trajectories ([b990957](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b99095752364614980f0bed8e1ed9773fcc29f83))
* **Campaign/Settings:** Add help for audio folder path ([c996a6b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c996a6b81627b237cbd7faddc90a2d6437d7cf20))
* **Campaign/Settings:** Add new computation strategy setting ([ab39446](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ab3944691e1fad0979f28f5fe598cf9d3cc55bba))
* **Campaign/Settings:** Add new memory limit in gigabytes for computations + Update coral-reef-light example ([eb83093](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb8309332190a5c7bbae6078590fdc2e91f67453))
* **Campaign/Settings:** Improve computation strategy help ([5dbfc25](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5dbfc25fe211925ef081b2522589dd373da2eb91))
* **Campaign/Settings:** Improve storage path help ([754313b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/754313bea557b6dd54b151994cbf5458cf21f740))
* **Campaign:** Add help for all digesters ([d50ca17](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d50ca17d621b9ac7f7b04c5090627e56990701e4))
* **Campaign:** Allow download invalid json configuration ([ef3b9f1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ef3b9f13a3c4045cc712703fbdbffc92d5c75dd1))
* **Examples:** Relocate examples + Add E2E json test files + Handle edge cases ([6ff2db8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6ff2db83e439738f74075e99a4b3aebae28a8404))
* **Examples:** Update coral reef light json campaign file ([48f3f27](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/48f3f27240d07ad0754593f53f8dee8cd6608712))
* **Front/Timeline:** Add recenter option for easy access to selected interval ([32d4533](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/32d4533f1a9218a7de3f114f076a6929fe804833))
* **Processing/Utils:** Add mdm shape limit calculator ([cf2d933](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cf2d9332cbd0cba1b95e33982ccbc2f054acd75b))
* **Processing:** Adapt to new JSON format ([74f80a1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/74f80a1a27b5fd4fee971ee4c08b695995a57db2))
* **Processing:** Add extractor dependency to storage paths for related data ([822a280](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/822a28095e8f32481fb3e4e4f2045b5dd0990137))
* **Processing:** Add pydantic package as dependency ([b0c465c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b0c465c24d421edb8fb21ef01e35fef82f0f4527))
* **Processing:** Add silent config refresh for other actions ([ed10b74](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ed10b746791d97e4cde501bc2d9a75db03a59ca2))
* **Processing:** Migrate to python 3.11 ([bd23ed2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bd23ed23bf8a176c35323662aefa7b0d3b261443))
* **Processing:** Upgrade dependencies to latest ([c25214c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c25214c8fe00cc517730982e675ca154c0ed29be))
* **Processing:** Upgrade dev dependencies ([287259a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/287259ab6f63b94b3a07d1fc9fd22f44ab84fa16))


### Performance Improvements

* **Front/Colors:** Convert computeds to refs for better compasability ([1e5b777](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1e5b7774766cd0c8e904581efdfa97592873a537))
* **Processing:** Remove dead code + Move files around ([f2a2683](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f2a2683c09a5cc1260553c82f44f7edb6cc42c87))
* **Processing:** Remove unused method ([d34ada1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d34ada16c4d2b9f9a6d73dd600667a156ae47d39))
* **Processing:** Use new label fusion adapter for dataframe exports ([ff73b61](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ff73b61476908fedf2b74b203fe94bff97974eb0))


### BREAKING CHANGES

* Storage have completely new paths and underlying data.
Processing dependencies have been agressively changed and upgraded.
* **Processing:** Upgraded dependencies with major releases updates.
Removed obsolete `umap` for up to date `umap-learn`
* **Processing:** Migrate to python 3.11.2
* **Processing:** Storage paths have been updated
* **Processing:** domain objects and storage paths have changed
* `.xlsx` configurations are now abandonned but still can
be imported in the new campaign module

# [13.9.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.8.0...v13.9.0) (2024-11-15)


### Bug Fixes

* **Front/RelativeTrajectories:** Write timestamps column only once in csv exports ([ff01487](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ff01487f4b3f7e69847a45929e80eeaa65607744))
* Rename quartiles to deciles ([7f81834](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7f8183428b8ef8fa982f88d5db82603925e3ae6e))


### Features

* Add relative trajectories deviation ([1a4eb2a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a4eb2a9968607d273b012bf0a9b575199e255ad))
* **Examples:** Add relative trajectories deviation ([2796d0b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2796d0b68590754d1692c3e41f67e935b3b26df7))
* **Front/RelativeTrajectories:** Add dynamic plot sizes ([c972276](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c972276af6e7d740a4c193709ac1105835f9e8c2))
* **Front/RelativeTrajectories:** Allow horizontal expansion ([25a5b11](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/25a5b11705327848e697221a0bcfd9f074e16a62))

# [13.8.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.7.0...v13.8.0) (2024-11-08)


### Bug Fixes

* **Audio:** Construct audio path correctly ([d04c79b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d04c79b8d905146035415b7c34593eb313194c7a))
* **Audio:** Serialize paths to main json output ([9944476](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/994447672f144f5b926b46f53f2f75a4f83dc0ba))
* **Front/AppButton:** Check correctly for tooltip existence ([525aea9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/525aea9fe8e9deb2fe15d4bcb658afedc7193669))
* **Front/AppHeatmap:** Rewrite and merge exposed API ([dbef91c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dbef91c970de0954025a7849534f37d242a02960))
* **Front/AppInput:** Add throttle mode ([2bb89f9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2bb89f9cd75cbf89483c8f88995b9be0a88beb92))
* **Front/AppSelect:** Rectify prop existence ([1a23648](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a23648e7322f1ef68be297b79244880efd29e57))
* **Front/Audio:** Avoid layout shift on playing toggle ([5ba222c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5ba222cff16c75c024815abdf5573762eebac2cb))
* **Front/Audio:** Hide all vumeter when not playing ([0a7c06c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0a7c06ca63a99da334b3bf7b7918c3695d4197b4))
* **Front/Audio:** Improve button tooltips rendering ([0bfd599](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0bfd599a5ec35f21067ee806f43b309a3890a9e2))
* **Front/Audio:** Improve peaking tooltip position ([f091541](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f09154110f6d0c262a67124a7dd59a3caad46038))
* **Front/Audio:** Improve UI ([84258b8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/84258b8b984c07c6ad20c74deb945fc1731b5292))
* **Front/Audio:** Instantiate event listeners once ([6b8428a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6b8428a9e18caf1d35cc338e1f9a931df25ed36d))
* **Front/Audio:** Merge peak and vumeter ([d9c56e7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d9c56e71f04777e602a8b98399458fdf2e407d7c))
* **Front/Audio:** Render error body from audio service to UI ([1a17048](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a170482c18ce51656cddf2d5c0490ff497a1ae6))
* **Front/Audio:** Render fourier and gain limits to UI ([b41ece6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b41ece6600bfff43e35bd2dcaf4877034ce292fd))
* **Front/Audio:** Traverse only floats to get time domain data ([8dce698](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8dce698b6f0af56b094529f62523e6d8743df5b9))
* **Front/Audio:** Traverse time domain data only when audio is playing ([722f7bf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/722f7bf634979776da4f41643cbdc5253135a2e3))
* **Front/Audio:** Use default readable values ([ca5ca36](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ca5ca36ad4704aa279a719230890ad0ff3d69c89))
* **Front/Calendar:** Add back watchers ([74adb6a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/74adb6aaadc22ff3fe764bb9fb642970296ceeb6))
* **Front/Calendar:** Improve layout ([9a80301](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9a80301509d51f290b311a63139c7999ce14619b))
* **Front/Calendar:** Pass date objects around ([e062678](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e0626786a231e87ba64781923ff976477f752811))
* **Front/Calendar:** Print end date correctly ([d02e2ab](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d02e2ab6ef6485f706f3218c2e244fc91c93f996))
* **Front/Calendar:** Split timeline code + Ensure config ref reactivity ([e998001](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e99800123c2841693af7ce11c94acfae2d440cbb))
* **Front/Calendar:** Trigger filtering only when active ([78d1d99](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/78d1d99cf3bb9d593bb5ae0d93b045b6a198085f))
* **Front/Calendar:** Use scss var ([4ab0508](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4ab05081584734c132e3b0adc6c49b99ecc0fc81))
* **Front/Colors:** Allow very low alpha for excluded points ([8a32129](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8a32129be89ba16ecfa1124f7194c92d1811b6b4))
* **Front/Colors:** Improve performance by using only one user scale ([6f913b2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6f913b2d2b8b4c83a8d68551e735d92c1cf7e3a7))
* **Front/Colors:** Improve wording for label values as numbers ([e77ac5c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e77ac5c78de720b4c7b335f75de6f6425f340e61))
* **Front/Digested:** Use new type reference ([87d5989](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/87d59894ae4319421e49d4d2b06a58e3502457d6))
* **Front/Digesters:** Add map reference for types ([57fed96](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/57fed962e935300f5cdcddd3ce50657b66bc54df))
* **Front/Draggables:** Add more verbose toggle mode tooltip ([a962690](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a962690c5b53d841fc25e468685b5fdee3bd36b1))
* **Front/Draggables:** Add previous selected state ([65653bc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/65653bcbd64f5e60d1b2663be3b921b6bd636b66))
* **Front/Draggables:** Improve handle width ([e198adc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e198adc0a709953966282cccd74ebd2da0d4755d))
* **Front/Draggables:** Refocus active window but in background (not selected) ([c328359](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c328359762bc7cd96cab2c03e190a4a720d3d84d))
* **Front/Draggables:** Stick to top left if size exceeds screen ([6229af1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6229af1b29d3d2b8a7b81fa4b14ef2ca7a382430))
* **Front/Errors:** Print error in console too ([775dd5c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/775dd5c91c383604cd80ac7c2a96d8cd7fc2fe70))
* **Front/FilteringInfo:** Improve mode cycling + Split code ([2eafe4f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2eafe4f99e165ea0a8d80f3b8d5c34c0e734582f))
* **Front/Filters:** Use strict upper boundary for time filtering ([9483cf0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9483cf0460990e911647712058d0fb5919bab753))
* **Front/Heatmaps:** Delete miss props ([221506d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/221506df7333406ff2f99b9c717e5902f6eecb1c))
* **Front/Heatmaps:** Exclude 1d digesters ([20c5f69](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/20c5f69c4927eefc0d6056221027419ce3fe3ad3))
* **Front/Heatmaps:** Fix title generation ([59d10bd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/59d10bd9b7b80466c108658e635213d8bb9c3ee0))
* **Front/Heatmaps:** Handle overflow from plot overdrive ([4f3a718](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4f3a7187f6e91f68ee3f182e4c638ddf9c2f4fe8))
* **Front/Heatmaps:** Rename Window menu item to Plot ([d90e2b2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d90e2b268d2858ba92d76f025fa9a604787db2ec))
* **Front/Heatmaps:** Use actual label sets and properties ([df30b3f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/df30b3f599a1025f1048337a312c431451d5b9aa))
* **Front/Heatmaps:** Use better conditionals ([e5ba0ed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e5ba0edc779a7b03b135497e887245a9f8e63d81))
* **Front/Heatmaps:** Use unique slugs for digesters ([94af8f0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/94af8f05afe367571da17ce541109ac28a2c15f5))
* **Front/Help:** Improve shortcuts wording ([9a73028](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9a73028971e63a1f30b5e61ee7b4d41643d6b80a))
* **Front/Help:** Streamline shortcut declarations ([b9e3817](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b9e38174399bd08bbec0cff31ff94122551cb1b8))
* **Front/Help:** Use join for discord ([e50d25b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e50d25b5b15a67aa341c5b21be7f80263f3fe119))
* **Front/Histogram:** Improve plot layout ([56970f8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/56970f8569c999f853d822af7a2104e1ac3b6ecb))
* **Front/Histogram:** Remove ref provider outside component ([dea736e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dea736ec55b78b868d7b7f5349af2e92cb440925))
* **Front/Histograms:** Use plot container width ([accf8c8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/accf8c891b87d0c0fbae80ad3e3ba39e7d81bccd))
* **Front/Indicators:** Use extractor pattern for unique slugs (from heatmaps) ([1ea59e0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1ea59e0fc1d1d76251b97f8d399596ca3a63aa5f))
* **Front/Labels:** Allow expand to screen size ([e2967b3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e2967b39024b986249aee657f7c43064674ed60d))
* **Front/Labels:** Create new reference on selection updates to keep reactivity ([03dfa61](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/03dfa61e8970a48ee00a62c2b61e4985533797e0))
* **Front/Labels:** Improve layout ([787171a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/787171a3b902d9a7e75ebc36250b86c93e704ebf))
* **Front/Labels:** Improve very long label handling ([3b1995d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3b1995da137ecdeb2a798c64662449f28be7ffa3))
* **Front/Labels:** Sort all strings numerically when reading from storage ([32aeab6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/32aeab6a84f9e42f9489eebc78ec7750ff5b5274))
* **Front/Labels:** Use only one button to expand draggable ([41de5b3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/41de5b3aafd56ff4f82511b2cb1705beefdee2ad))
* **Front/Loader:** Fix step length range ([c2518e4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c2518e496bbbabfbf215b8e17b283272f647d3d3))
* **Front/Loading:** Use app color ([1193015](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/11930156b1df173c045d2cb00c750799150f9f88))
* **Front/Menu:** Add transitioning contrast on button state ([79e90bb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/79e90bb8cfa1edb69d523e13605a278375475b40))
* **Front/Menu:** Fix menu hidden state ([70bccea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/70bccea6dc843a7aed49c9724daa28076ae52888))
* **Front/Menu:** Increase background filter contrast ([89bc4c6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/89bc4c6eef0bb420c40d614564c797d5a1ba3655))
* **Front/Notifications:** Add double timer for errors ([3c0ef68](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3c0ef683e4ce8d41feb7798e876f80f736e1eadc))
* **Front/Plot:** Adapt raster exports resolution dynamically ([4491a5f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4491a5fb94a6c85328d49cd22b61dc67ef2fe72d))
* **Front/Plotly:** Use scroll full size instead of client rendering size for rasterized exports ([ce06be0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ce06be07cf1d903517207cf92050c4e787b4ac02))
* **Front/Ranges:** Create static full range on view load ([51a0421](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/51a042192251d7a06f1213cb21186dd4c55397a3))
* **Front/Scatter:** Improve trace generation + Apply alpha to borders ([2bc0fe5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2bc0fe5a160a89ae39a26711fcc4863e18bc3b79))
* **Front/Scatter:** Prevent trajectory clicks ([57c236a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/57c236a481298755313fa5628376b336d35a9689))
* **Front/Scatter:** Use paper bgcolor as well ([c442994](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c442994e851466179a4c8ab0b0e84240bb5d430e))
* **Front/Settings:** Rectify color flavor type ([53ec479](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/53ec479924802d21a1e405dca595ffeca64c0157))
* **Front/Settings:** Remove ready lock for user settings shortcut ([6a73dcc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6a73dcc294440c0bf67bac1cb82938225969ead7))
* **Front/Shortcuts:** Sort alphabetically and remap view and calendar bindings ([a6f5644](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a6f5644133c40d4f603cc251d982a00dccccc9df))
* **Front/Temporal:** Add UI feedback for current candles period ([cc30def](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cc30defbd2df55944f73c1649aaa5a7c76e42e25))
* **Front/Temporal:** Improve layout ([696794f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/696794f6e31337da1c77292c34eca704dd82a94a))
* **Front/Temporal:** Improve layout ([a984107](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a984107c30bf523058fa7d113a14caa0ad923fa0))
* **Front/Temporal:** Improve plot rendering ([6513971](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/65139719729908cc0c3ac301c62d64ae125aa419))
* **Front/Temporal:** Remove site selection from temporal draggable ([394b623](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/394b62382007687a6dbd5d47562bce0d35bab31a))
* **Front/Timeline:** Add body rows count refresh ([c738f97](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c738f979d47d7486cb585be15b1d8f0b7ffa5149))
* **Front/Timeline:** Draw interests in overview as boxes ([d18eacb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d18eacb3988d6414f9f763a18ebc94f8f207071e))
* **Front/Timeline:** Improve drag out event handling ([d01e52d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d01e52db4b2e04907ed768e0375de9f753dd3eb9))
* **Front/Timeline:** Improve interal duration tracking ([4a59ccb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4a59ccb5c83b06329b00e087f62c4870392c376f))
* **Front/Timeline:** Improve options layout ([0cfe7e3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0cfe7e3f8e8f815974fd4952646d5a88104add3c))
* **Front/Timeline:** Improve render cycles ([644a93c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/644a93c51bf435c64455914d07086909c57856c1))
* **Front/Timeline:** Improve text contrast on tooltip rendering ([b94da1d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b94da1d44901757d32578e9b3cf9cd44b5a33539))
* **Front/Timeline:** List half before double ([2d3f6af](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2d3f6afb45c1c21bacc681df183449a6933fdb64))
* **Front/Timeline:** Rectify type import ([5fd0806](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5fd0806fbd6f0c0647ad22fe195957c3a17647d8))
* **Front/Timeline:** Remove interest coloring gaps ([5a6eff1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5a6eff16149c7ab29defae259ada352f68cd98b3))
* **Front/Timeline:** Use range mutators ([4770d87](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4770d872eae66a67acdc668c3a001d73a7871ebd))
* **Front/Utils:** Remove dead code ([e2fb4ca](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e2fb4caba9c51d4991c1e92d9c8df2fb667317b8))
* **Front/Utils:** Use proper function declaration ([b81094f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b81094f238232bdca1f0627d29bf619b9a3f788f))
* **Front/View:** Disable double trace rendering ([689d59f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/689d59f50729cbede0100f1da292c08597eee7b9))
* **Front/View:** Improve progress bar ([797a5ce](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/797a5ce84b64f6a8023b1b5b7b39ef1485095634))
* **Front/Worker:** Reduce slightly allocation time + Add future TODO ([22df592](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/22df59236951c319bcbf0bf38a2cc6b14e8339c6))
* **Front:** Extract shadows to its own file ([1ae7a86](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1ae7a86a47d56f91b3a7aaee7c7c037fe2779527))
* **Front:** Improve all plots rendering + Remove auto margin user setting ([83cc31d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/83cc31d723e1a5d41f6e4d93ff3761552f8d87d3))
* **Front:** Improve audio data and error flow ([ee80224](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ee802247dc47ab27e1cef66ecd0ecd7b666af5bc))
* **Front:** Improve details layout ([77a61d6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/77a61d61094ed08292fe01def71a3f1aecfc9e98))
* **Front:** Improve draggables backdrop constrast ([0234c9a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0234c9a0473ebef06547f9f3ea6db144b7e7e508))
* **Front:** Improve labels and temporal layouts + Add future TODO ([75de9d3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/75de9d3ad0ac8798ad07a7d3918c04cedd48c2de))
* **Front:** Improve layout and conditional styling ([82a2f7b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/82a2f7ba5f252857089732ccf48dd750c26b612e))
* **Front:** Improve loading layout + Extract blurs ([cba88f4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cba88f47ae849698df9805621e1ba0ba6c5164b4))
* **Front:** Move setting checks actually in scatter click handler ([8dbbe0c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8dbbe0c6841d29e1645648c401663d0719b04f1a))
* **Front:** Move timeline component ouf of beta ([87b1431](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/87b1431405e38775b0b4c070c3477408daa3fcd4))
* **Front:** Remove duplicate seleciton hotkey ([db5db64](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/db5db64d73a6b6d78afd6d3ae340d1d01379891c))
* **Front:** Remove unnecessary enclosing div ([423920f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/423920f840e0346311ed29cacd880ce5859dbe98))
* **Front:** Replace deprecated icon lib ([0cb0045](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0cb0045e4ae390da13bec1f57c436d5594ceb744))
* **Front:** Unescape when draggable direct open ([96dc98b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/96dc98b6037a2b4a753753563ab0868d6f4b2319))
* **Front:** Use more explicit expressions than ?? ([046c708](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/046c708a8d3de22a30bc941274da1eb348ab3c61))
* **Visualisation:** Properly inject audio path (relative, absolute, config from other folder) ([bacff96](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bacff963f4bac947fe1a9926e7736947e52d6407))
* **Visualisation:** Set readonly attributes ([a2d3c45](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a2d3c45e847c40ba9de700c998bb4754e77cf420))


### Features

* **Examples:** Add new nn extractors to example configuration files ([4eb73c3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4eb73c3dc54e31ab5a3a2d8e137649db80b76bca))
* **Front/AppLoading:** Add progress bar ([a61d060](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a61d0606f266242faba25d13c6ecfd4259bb672b))
* **Front/Audio:** Add vu meter ([229a5e2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/229a5e2a9b0de3610c2b52afed898b47ea1562b6))
* **Front/Calendar:** Add alpha timeline ([cc782b9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cc782b9f3ad2a3a1ff5435e58c5b738b7542b0bc))
* **Front/Calendar:** Add collected / filtered count tooltip ([c229e42](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c229e42bd3a5686ba83a784e0c865d5eeb50860f))
* **Front/Calendar:** Add timeline overview component ([2018a1a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2018a1a959dfed7f08b5c92d11c36140b2439bcf))
* **Front/Calendar:** Add window tooltip + Improve layout ([d39e7ce](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d39e7cedf8f6cddc8501de792e348fea92e79517))
* **Front/Calendar:** Improve beta timeline ([e3306ad](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e3306ad55a4ffe4849c1b6a858b76a5e077ab55e))
* **Front/Calendar:** Improve UI and beta timeline ([5b910cb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5b910cb91c5ec7775eab468036eaad28f5e5bf90))
* **Front/Draggables:** Add stack for memoized z indices ([999db38](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/999db38e10eee76b6e65384596e3cf20504f0d8d))
* **Front/FilteringInfo:** Add interval selector actions and current interval state ([aabb03b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aabb03b9fc1d9c3df45ead186c424734ea2bc3f1))
* **Front/Heatmaps:** Allow plot overdrive for high res exports ([f12a2c6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f12a2c694c75606e8f58a5b691f3def7b0069c53))
* **Front/Histogram:** Add first version of distribution visualisation ([2fa9c6a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2fa9c6a78c488e7c636544ac5213e0aefa63607e))
* **Front/Intervals:** Allow forward and back actions to cycle ([8661246](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/86612466d9790a8a309396b0a5fc586d831fbccd))
* **Front/Labels:** Add sites as labels for easy user selection ([a8cf493](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a8cf493fc74a12f276de7d31e64490cec1e94a28))
* **Front/Labels:** Allow multiple size for label window + Add settings interface ([47b1615](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/47b1615e529561b2e887f3f4f960a5763f271b2e))
* **Front/Labels:** Improve UI layout ([3f5af4a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3f5af4a046686ef4ba6154ae38129ed751a87ac8))
* **Front/Plots:** Add auto margin client setting ([c5e19d5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c5e19d5deeebae0d39feed37600d64e4cdaa4393))
* **Front/Settings:** Add custom scatter border width ([9c8e2a1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9c8e2a1da7026661e829ffb5a38909569cace3ce))
* **Front/Shortcuts:** Add X to close all draggables except current ([c2062f0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c2062f093c3b9e6505ac6339f9b7bed4b677a8b5))
* **Front/Temporal:** Allow draggable expansion to screen width ([a0babb5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a0babb52dec63345a1e44c14a9dae98f9788733f))
* **Front/Timeline:** Add active element state ([bb1ca69](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bb1ca69e96d5bc79a0f05d8fe002d86b6d42a43f))
* **Front/Timeline:** Add adjcacent actions on interval indices ([946e588](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/946e588508d7f81b0b5cf20c500aba5e0551b5f1))
* **Front/Timeline:** Add interest zones to overview ([ce22bfe](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ce22bfeccb2b37052f7972425dc95092827f321e))
* **Front/Timeline:** Allow doubling and halving + Fix transport ([aca9939](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aca9939676cb3d73dfcd87eb61301aab9a8adfa6))
* **Front/Timeline:** Allow overdrive fo calendar range ([057ae4e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/057ae4e2cfaea063c21caff3cf74a49a85f7cb7c))
* **Front/Tooltips:** Add delay to hover effect ([37999f9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/37999f94390982a0e54830a1f40a69d60f9f60f7))
* **Front:** Add filtering info component ([200df22](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/200df22fefda61ddd06f6e643cd4475f6758e959))
* **Front:** Add global notification handler ([1af8b3e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1af8b3e2e0e0860d1f634f6d47b7d3af1159c1cc))
* **Front:** Add tiny scrollbar custom styling ([ed2f0e7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ed2f0e7a091be514bab8b8185e700579650bf42b))
* **Front:** Reference new nn extractors ([b462d5a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b462d5a4a3a5cece87db4addc2459a3650349b6a))
* **Front:** Sort upcoming features by alpha / beta flags ([c4dd98f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c4dd98f682a2b5020656f53449a42020839ea9a5))
* **Front:** Streamline export names + Add user setting for detailed naming ([efc72be](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/efc72be3e9b28c86d87ec8103ac42db24e22abd2))
* **Front:** Switch to CSS modules to prevent collisions and leaks ([95a8011](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/95a801187f002a66e47b06cb8fbe1fdd8c491f14))
* **Front:** Upgrade to vue 3.5 ([9328bfe](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9328bfe7a9e9317d5824c4b15670869c0dc258cd))
* **Front:** Use new tiny scrollbar ([21cd11f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/21cd11fea99240f234ea6cded3ca5775d9462786))
* **Front:** Use space for audio play pause + Prevent AppButton focus ([014e634](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/014e63426e2d6594b646f80df5afde5d0f79ed22))
* **Processing/Extractors:** Add new nn extractors (log mel spectrum + log melogram) ([727e9d1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/727e9d1e6e0920d9a1a9419c1b68984e69da8ce3))


### Performance Improvements

* **Front/Scatter:** Improve time filtering speed ([9c9cd3d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9c9cd3d29a06a1cb43935443bfdc9917fbadf00c))
* **Front/Scatter:** Improve tracing speed ([d711097](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d711097e130c27bc4d09566c65401cd548fa48e3))
* **Front/Utils:** Improve interpolation speed ([188f5d3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/188f5d3babd48c18a3b587592975e1275bf3d1bc))
* **Front:** Improve plot layouts code splitting + Add future TODOs ([b3b43f2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b3b43f284c4a04fba74e8d362bf71f674abd03b4))
* **Front:** Update chroma js to latest ([6d56c49](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6d56c49dcb74555f826b0848d9724b5ed355ced2))
* **Front:** Update plotly.js to latest ([3aedfdc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3aedfdc198399bda389236c534f314ba1606eaca))

# [13.7.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.6.1...v13.7.0) (2024-09-16)


### Bug Fixes

* **Front/Audio:** Increase opacity of loading overlay ([61a5179](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/61a5179f2cbea07bd2353454670eefcbfb82a0df))
* **Front/Audio:** Set correct loading overlay size and border radius ([e9a9f40](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e9a9f404538b66d28eed6c1c8b3cd9ee05346d97))
* **Front/Temporal:** Fix error on site selection change ([d65bf1b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d65bf1bc8e84ac1d97a65762f997132956b7214e))
* **Front/Temporal:** Improve continuous chart x axis legend ([d9a9a11](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d9a9a11a7636fd196e2997283d58fdb2bd348454))


### Features

* **Front/Audio:** Add audio loading state overlay ([c9dbd79](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c9dbd79b58d2d0d7de050493c6dbefd2b8ba722c))
* **Front/Audio:** Add clip detection + Improve gain staging ([6a55bf5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6a55bf5ed29ea86356515fb3cfcb2dc98411fea9))
* **Front/Audio:** Add PEAK tooltip on top of detection square ([265b5eb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/265b5eb59b4c1e269a87aced455fc21061e0aa36))
* **Front/Scatter:** Add optional selected point highlighting ([7854b0e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7854b0ef581552581926f02e9174a7bda0cf248b))
* **Front/Scatter:** Add red border for currently selected interval ([61794ed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/61794ed2264afb2648ed17322f38edf94c766100))
* **Front:** Reset all settings if versions differ ([8136185](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8136185b0bd2f5a818f2bb8100f3baaecc619b4d))

## [13.6.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.6.0...v13.6.1) (2024-07-19)


### Bug Fixes

* **Front/Colors:** Use sanitized color state before generating scales ([d72ffc2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d72ffc2c3b88b0acc9af48f1db5783ff857414a0))

# [13.6.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.5.2...v13.6.0) (2024-07-19)


### Bug Fixes

* **Front/AppInput:** Handle undefined tooltip prop ([9af8240](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9af8240bad8fcaaf893f3295925bc3bfabd10905))
* **Front/Audio:** Invoke audio context watcher once ([4b3a5a6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4b3a5a60fcc1f8178ab38b0e87219be34e41f1dd))
* **Front/Audio:** Prevent history going back to null ([31a6995](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/31a699518bfaab64149acea647f9ae55dae85c77))
* **Front/Colors:** Disable label range coloring before mount ([e0e60dd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e0e60dd03137787e764942f1cc1ed6eabdcb7678))
* **Front/Colors:** Use right cycling scale + Extract it to its own hook ([63680f3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/63680f3dbe25ada26c32f2f664edd51082f27f9f))
* **Front/Draggables:** Improve selected header styling ([660e7eb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/660e7ebfee992c500ea06f8862b7dd57b7abef8b))
* **Front/Menu:** Use correct details icon ([ccfd6f7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ccfd6f7a219f366067ee24f945561170fa5aef1a))
* **Front/Notifications:** Remove unused code ([db77b39](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/db77b3988005c7c0b4201d553e85475164f0654c))
* **Front/Scatter:** Use global interval filter for exports ([6fc3ca0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6fc3ca0984bf9d8e49422dcee53795c6c4c92281))
* **Front/Styles:** Update z-indices ([a7da5ff](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a7da5ff0e2369df81a40efa4f7a7dd0c8d8cc066))
* **Front/View:** Invoke lifecycles once ([ecd13b9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ecd13b986d45b258388e247941787139b036dcfe))
* **Front/View:** Lock keyboard on view loading ([1b15525](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1b1552550ec3fb07d11445af671e1a3bf1e42283))
* **Front/View:** Purge temporal thresholds on unload ([200ac25](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/200ac25035bcdb338abf65798920585d7228e5fc))
* **Front:** Add tooltips to history actions ([daa13f1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/daa13f1cd90adc27d89b84ab4c2ed428abc50733))
* **Processing/Storage:** Force string conversion ([09a3d7d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/09a3d7d38ec468187427d5c8fa49bb4a707adab0))
* **Visualisation:** Rollback mixin in electron code ([388e030](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/388e03062ebd606a73de4fc3868c7fa201fe1c60))


### Features

* **Front/AppInput:** Add enter handler prop ([28d83fa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/28d83fa21fa264d2067e8ce549d636ef36f5eb27))
* **Front/Audio:** Add history and actions ([55343c2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/55343c2ec62699f378e96cc27564d4c7e09f98d5))
* **Front/Draggables:** Improve UI feedback for currently selected draggable ([eb43e9f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb43e9fb376c25d157486985964b5ff50abe7448))
* **Front/Menu:** Add selected styling ([4e71b95](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4e71b9565ef85793ad3fe253615a11a06242f8d0))
* **Front/Settings:** Add hide menu option on draggable toggle ([4ad1c9d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4ad1c9d7943668311665664ba433ae30896524ed))
* **Front/Shortcuts:** Add Shift+Tab for reverse draggables cycling ([15247da](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/15247da50045108ab0a2ceb7f0d399b1ba3f3923))
* **Front/Temporal:** Filter on submit with enter ([76fbc7d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/76fbc7df986ddddadb993d01c090b58dba52434b))
* **Front/Trajectories:** Add user selection history and actions ([fdabfd6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fdabfd63ac0e9ee83f121ebe913a6bc670515c84))
* **Front/View:** Add dev mode autoselection ([daee2fb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/daee2fb4eb69e61b7d671f9712f2f7a0d8a25662))
* **Front:** Add app console for global UI state feedback ([215edaf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/215edaf38940ae11c9a835f79a1ec69c92212166))
* **Front:** Add settings for dev ([f7339b0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f7339b05c1805a81757f6e1d93f715043eb5261f))
* **Front:** Display icon for each draggable ([c46ef13](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c46ef137768790813073df6fdefc302f3502bf74))
* **Front:** Upgrade to vue 3.4 ([c9a11b8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c9a11b894ce240a783b5975e7e5ed37e4cc1fef0))


### Performance Improvements

* **Front/Temporal:** Remove unused import ([60c6abc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/60c6abc42d1fcc5cc7256565229eaf6d38c23435))
* **Front:** Refactor draggable suspense + Improve details watchers ([3f35f5b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3f35f5b1cdd81c93b100bc482d40051658253c21))

## [13.5.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.5.1...v13.5.2) (2024-07-10)


### Bug Fixes

* **Front/Colors:** Disable label range coloring on unmount ([26bb7f7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/26bb7f7dc50ef6a57c053f10ed0771e81ccb261c))
* **Front/Colors:** Prevent inverting color map when coloring with categories ([c56d181](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c56d1815487c37048b4f1bb26c7dc5e1f38af6b3))

## [13.5.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.5.0...v13.5.1) (2024-07-10)


### Bug Fixes

* **Front/Colors:** Streamline UI ([8e07ebe](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8e07ebed8527e1ea0ad93f5422e25b87e5bd1a02))

# [13.5.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.4.3...v13.5.0) (2024-07-10)


### Bug Fixes

* **Audio:** Add ffmpeg path validator ([31ad21e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/31ad21ebd3e677671d7c7bed491b3cc41af20cf5))
* **Audio:** Disable unsecured header ([d29a7d9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d29a7d9847f6dd9992dd198f131dbf92393e899a))
* **Audio:** Specify CORS origin ([c3182a5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c3182a5c8e77b1e1f8c5379b083f477217e0edaf))
* **Front/AppButtonNew:** Add grow prop ([b2ead90](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b2ead902461440b47b338fcc54b0bdc74160e634))
* **Front/AppButtonNew:** Remove empty style source ([616c43b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/616c43b57675deee622dd1f66f13f45683650219))
* **Front/AppInput:** Add flavours for number and strings ([84b4dc7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/84b4dc703d1773d875fe710752805476bd8e0a07))
* **Front/App:** Load correctly autoclusters config from storage ([846cda8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/846cda8c8856cec92202912ea7efd06eecd12508))
* **Front/App:** Remove old button primitive and replace with new ([e63db6d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e63db6ded750302a66535e479ba812955bf0db0f))
* **Front/AppTooltip:** Inject placement correctly ([c962134](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c96213457efead1837f2eab21198b6f96a143ae3))
* **Front/CalculateMean:** Improve iteration ([aad702d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aad702d9de95637a7357cda18094a5e44ad25f11))
* **Front/Candles:** Improve UI rendering + Place lifecycles at SFC level ([3026554](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3026554d32881009a37ce4919959a82da92029f2))
* **Front/Colors:** Hide color map for labels ([0912227](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0912227b63887f00989474b8ae3e125bbc84e693))
* **Front/Colors:** Improve UI ([4cbdfec](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4cbdfec3f6a0c1e6cb99da0884f6e8f7ee5998da))
* **Front/Draggables:** Improve iteration over draggables ([b549372](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b549372d98a75ffdef430f529d8437d34b540522))
* **Front/Draggables:** Select next active on close ([6ba49d1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6ba49d1c1b0b7129fcb3ec10f511dbf83853f302))
* **Front/Heatmaps:** Improve UI + Modularize SFC ([d7cc46b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d7cc46b938103fe1613afeaaabf82cf12c914a35))
* **Front/Import:** Set fixed width ([8a81953](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8a81953ccd54f410de6d6f4c3f38289d3a4a875e))
* **Front/Import:** Simplify import details ([26acd62](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/26acd626c1945f33e2a7ccc0604fe60e70fe53eb))
* **Front/Import:** Write details on 3 columns ([70110b6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/70110b68deab3f4398febb68debb30d49b8801c6))
* **Front/Indicator:** Improve ux ([e951ae3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e951ae3f8ff1af42e64199c19451188becd2975a))
* **Front/Indicators:** Improve candles UX ([06c76ba](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/06c76ba121e57eca2fbeec201ff893f587e684d6))
* **Front/Indicators:** Improve selection and state reactivity ([25079dc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/25079dcb4d2ddd9ea8df05800dd69725ae35b1a7))
* **Front/Indicators:** Rename labels selection button ([e3481b8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e3481b872a007f5202cc90c6fceefdeb1de6dd84))
* **Front/Labels:** Split component ([1c77b63](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1c77b63b6ede425a41c0c641e9b25f566cef273f))
* **Front/Labels:** Use better "zoom" icon ([1cb4faf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1cb4faf11c8e23065c833f4896e7fd616b1ee51f))
* **Front/Open:** Improve UI ([7375b53](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7375b53309145fc663086e6d89ed2cb98b7fc09a))
* **Front/Scatter:** Improve iteration when retrieving file indexes from points ([61b2ad9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/61b2ad9f03cf3642cd3baaba51fa9f12b77c1308))
* **Front/Scatter:** Improve notification on 2d selection ([8deaf4b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8deaf4b14732c0ef8cbfa467a92bf05a09a7e766))
* **Front/Scatter:** Prevent temporal filtering if no indicators available ([976c37b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/976c37bfc8f69d9f2c0df430f45e42b61e24d292))
* **Front/Settings:** Put Screen 3d selection behind preview + Improve settings ([e186102](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e1861025425d185857e67a011916c9bff935dca0))
* **Front/Settings:** Use new app input component ([c9de383](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c9de383f19a3ecfd715e1ee456c7f05174fe391e))
* **Front/Temporal:** Change tooltip placement ([da0d7c8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/da0d7c8981419a4005ab78b3d1b0a4e28f4430b8))
* **Front/Temporal:** Improve iteration over sites ([5823517](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/582351756e634f86ef7c229fbf3ca14826d4ec7e))
* **Front/Temporal:** Improve scatter filtering ([d93abdc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d93abdc80be2ff21a37d7ff545ad45cc2b39d873))
* **Front/Temporal:** Select all sites by default ([0d03f0a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0d03f0a56ada3ffd2898e545f186b5b2a99c9fc9))
* **Front/Temporal:** Switch labels for scatter display and use as default ([6d0a975](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6d0a975db6e0ac14d80e0285f1708f58906d31e2))
* **Front/Temporal:** Use correct ref name ([e855316](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e85531635391f7b104aaa109784de4a3ea66b4fb))
* **Front/Time:** Use new button primitive ([4aed6b2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4aed6b2e0ef8fc4eba6847451df3231c698dd7ab))
* **Front/Trajectories:** Improve UI ([21cd9d3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/21cd9d3905b8898c5e67b6196a29c8576f6e2d04))
* **Front/View:** Improve UI ([ebef977](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ebef9774d65c54d6f161b28da8f5df7ae8a7707d))
* **Front/View:** Improve UI ([a4c24e5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a4c24e5d1198ce124af4109c1a0bac0154542d00))
* **Front/View:** Reduce composable code duplication ([a73ad49](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a73ad492a11c2e40d2a0e7a1143a9e565f6e2322))
* **Front/View:** Use dynamic background ([afa29b7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/afa29b772d3e5a55ae7321afd8cfb3773e925602))
* **Front/Worker:** Sanitize relative file path when building interval details ([539cc46](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/539cc46cce545861c2b44f7bca089a20e0b218e4))
* **Front:** Extract injection key to its own file ([5c9dc7b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5c9dc7b0e1c75009c40ac57f566dfc8cf80dc14f))
* **Front:** Improve console feedback ([957d3de](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/957d3de9f714f9248b92011104c109d3d776f3d7))
* **Front:** Typo ([0607b83](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0607b83c607008bf103f287d2492c8f1e6c7bb17))
* **Front:** Use correct types for number inputs ([93c2ead](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/93c2eadf6d10e30644f948981af4939727bea43a))
* **Visualisation:** Force cell object to string + Detect absolute values ([e55a853](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e55a8536ad75ea04a428cf27b184657df54c9116))
* **Visualisation:** Improve instanciations ([5612957](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5612957774a2a132d6f4d641e11a225d07956094))
* **Visualisation:** Remove storage import for audio service start ([89b03b1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/89b03b1d4ebcfcb7ae020d3a434ddbd502cba515))


### Features

* **Front/App:** Add app input component ([594ea07](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/594ea07d3b3387f28de5270a4b8168fe78ce7dbf))
* **Front/App:** Add primitive section component ([f0c638b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f0c638b6c8274255c341129d508f3e55f8b055a7))
* **Front/AppButton:** Add all available sizes ([c8b6b16](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c8b6b1612cfb7b05fa519965d93e2ed078979d49))
* **Front/AppButtonNew:** Add background color prop ([b100126](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b100126ec2df4895b2276d95a9875941370e94c1))
* **Front/AppButtonNew:** Add disable and icon props ([077bed2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/077bed2c8257ede68c131edc11bd0b6d434269df))
* **Front/AppInput:** Pass injection key for dynamic model updating ([a13dabf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a13dabf611598923c4be9fbe764f96bfff41754a))
* **Front/AppSidebar:** Add shift props ([5497d2b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5497d2b476a3308feb845b3ea3a9f7f11f72a0af))
* **Front/Colors:** Add color map invert ([9c89217](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9c89217c48b607c4577422f2fafd7a4d260e00c5))
* **Front/Colors:** Add coloring by indicator range + Improve UX and state ([5b90b7c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5b90b7c40c5e67af16c8c8f55eeef97d5587ac8d))
* **Front/Colors:** Add range coloring for numeric compatible user labels ([6676978](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6676978c1b19d82a52a2c4b945821b4c98581650))
* **Front/Colors:** Sync component settings with local storage ([3738dc6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3738dc6790035a5c6a6a0ae15e942051e99c836a))
* **Front/DraggableMenu:** Add size prop ([44569a8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/44569a8336f153d2b3e6147ba3350765d920f3e9))
* **Front/Draggables:** Improve UI and UX + Add <Tab> and <Esc> ([2e70d28](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2e70d288ab9b8138cfdb525096bd1b19a19e74e5))
* **Front/Help:** Add discord link ([eea4c55](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eea4c558e4063928c02a12ef954a78fb3898ae52))
* **Front/Indicators:** Add new row for filtering (WIP) ([d12cfd5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d12cfd56a1cdfd7f4ef8d8396989564358fa688d))
* **Front/Labels:** Sync component settings with local storage ([178a6b6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/178a6b6674ec3d7e8dc39103437bc345bf75ed52))
* **Front/Labels:** Use numeric range coloring for checkbox backgrounds ([bad5681](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bad5681460f06f6e36e95f22235a539e2eac6f67))
* **Front/Scatter:** Add temporal filtering ([0e57588](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0e57588aa0c5592a5ca67e6c3ccd495fb4f56def))
* **Front/Scatter:** Use spectral as default color flavor ([45ae5f9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/45ae5f96fd527ca989b2c930c6c77a9224600caa))
* **Front/Settings:** Add option to disable Audio auto open on scatter click ([61e99bc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/61e99bcf32bb994112a569622aa806ec88c9553c))
* **Front/Settings:** Improve UI ([d000e96](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d000e96162f95ebc1e3164633a1aa035dca752d2))
* **Front/Settings:** Notify on defaults restore ([785e95b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/785e95b789df7347fa1711329c68fbf1c6beffd2))
* **Front/Temporal:** Add chart display toggle button to draggable sidebar ([95600ed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/95600edc39616e3d0c6544f2c1a3c7ad1f2ec12b))
* **Front/Temporal:** Add collected tooltip on filtered count hover ([2541323](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/254132364681f29eea5b083d51dc0b0519a1b7f7))
* **Front/Temporal:** Add placeholder for next fitlering feature ([861a1c8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/861a1c81b0a2dc4b9f17b99e9cc79025de85b2d7))
* **Front:** Display count tooltip for labels and temporal filtering ([fd6b5ba](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fd6b5baeac5c8cbeb295bd0d7d3e1da193956ab7))
* **Front:** Sync settings with local storage ([72b9334](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/72b9334370471c87bc028f5869f186554d712307))
* **Front:** Update all keyboard settings + Rework meta keys + Improve help UI ([688f1d7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/688f1d757b3bd93a29a7deec99b198dae712a7d3))
* **Front:** Update h5wasm ([9e8e9ab](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9e8e9ab62d6a9ac080206bdae6cb692b6118a8e5))

## [13.4.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.4.2...v13.4.3) (2024-07-09)


### Bug Fixes

* **Front/Worker:** Sanitize relative file path when building interval details ([987b9e3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/987b9e3c4f59abe9cbc8115a72a5216fe3dddf14))

## [13.4.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.4.1...v13.4.2) (2024-07-08)


### Bug Fixes

* **Visualisation:** Typo ([8c39fb4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8c39fb4170cd26a3879d1110c198b03b8a33bbe2))

## [13.4.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.4.0...v13.4.1) (2024-07-08)


### Bug Fixes

* **Visualisation:** Force cell object to string + Detect absolute values ([54bf9ff](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/54bf9fff3a367b93e4a3474e16f1720b82ed78d4))

# [13.4.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.3.1...v13.4.0) (2024-06-20)


### Bug Fixes

* **Front/Audio:** Remove context validation ([5dc0295](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5dc02953b918c5a4d6c810af5c9e094a1c42e1a7))
* **Front/Scatter:** Hide overflow on all axes ([3a39fa3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3a39fa3d5b2e36d89f7922099c03909f27b67a1f))
* **Front/Settings:** Improve vue components ([96e2fc8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/96e2fc8ddcc060936f4049b726f645b61a56519e))
* **Processing/VggExtractor:** Use rich print ([35a9b15](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/35a9b153703aabdd058675a5621e472ec778a382))


### Features

* **Front/Indicators:** Add candlesticks + Rework functionality ([703d63f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/703d63fb389044cb384a2714c14b4e27210e1ce3))

## [13.3.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.3.0...v13.3.1) (2024-06-12)


### Bug Fixes

* **Processing/Digesters:** Catch missing MDM at SilhouetteDigester level ([8004074](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/800407460088d5c7ed85bf80532102d58841f252))
* **Processing/MeanDistancesMatrix:** Catch out of memory error on calculate ([34950e9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/34950e977617269c84ebe0fe753f2958e39d60a4))
* **Processing/Storage:** Add prefix to console feedbacks ([55d14a8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/55d14a806a04f16ae92b2035f96c1d86141e7765))
* **Processing/Storage:** Remove redundant console outputs ([176f34b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/176f34b70ab8dc4829c0774ecce0036324dea8c3))

# [13.3.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.2.5...v13.3.0) (2024-06-04)


### Bug Fixes

* **App:** Upgrade pnpm lock file ([140c6c4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/140c6c49f23b71805dace60732b2e7d2d464c372))
* **Audio:** Upgrade pnpm lock file ([076c838](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/076c838f420495069b0bbac497cc4cff38393988))
* **CI:** Use macos 13 ([d572219](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d5722199308ca2999c258a70a8b159b854ceb84e))
* **Front/AppDraggable:** Change bound order checking ([83eda96](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/83eda9672da2689e2e5d3187ca7fdf1f1455e328))
* **Front/AppDraggable:** Check bounds on every mount ([2873855](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/28738553df6cc8b7c378f34ffbb8078cdd1efbb7))
* **Front/AppDraggable:** Check bounds on window resize ([116d519](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/116d519c920eb5224d634f726a52b25766066c83))
* **Front/Audio:** Lock scatter camera on slider use ([77587c7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/77587c773398fc8abb9dcb75c998a11850cdf32b))
* **Front/Menu:** Disable settings button if no storage file provided ([675f63f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/675f63f6134e2a61dcf91c9bc17a3d6a8abd05f8))
* **Front/Menu:** Restrict settings if storage not ready ([8150ba5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8150ba507569437db94a1edbe226206d9125021f))
* **Front/Scatter:** Add client setting for copy on 2d selection ([2588e8f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2588e8ff6047988370f6997f014566e556716a0f))
* **Front/Scatter:** Always show mode bar ([0806447](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0806447c4ef95836eee075aafe75645097b2fc2d))
* **Front/Scatter:** Check if enabled before rendering ([dad9bf3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dad9bf304aeca52ff4786571180ad78f27c38100))
* **Front/Scatter:** Dispose useless condition ([a53a415](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a53a41566e9f097f40b3e6032d6bf2f95016d923))
* **Front/Scatter:** Prevent container from overflowing vertically ([4a968c1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4a968c134db937f039fad037e68a569ce1672051))
* **Front/Worker:** Add hook edge case ([c7eb22d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c7eb22d50544a66cda8d5efd9e5cfd1bb60a1c81))
* **Front:** Improve state loader ([cb56bbe](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cb56bbe57f58b3afdcad5a4221b872ec59bdcf8d))
* **Front:** Move proto 3d selection behind preview user setting ([1610a78](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1610a78c9d09e695a52ff428c10178bb1233e97b))
* **Front:** Multiple fixes + Work on 3d selection ([88590cd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/88590cd08218e1b15c9d052143da4c79f6acfd05))
* **Front:** Remove gl matrix for now ([38a7d55](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/38a7d5508a1e440f5214a833ea5b8361be65be98))
* **Front:** Upgrade pnpm lock file ([c800d53](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c800d53d50346337d6123524d1c74a9749f4777e))


### Features

* **Front/Scatter2d:** Copy selected intervals as file indexes ([d37e5ef](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d37e5ef852608a9d6f501ee7bfa1bcd886645a02))
* **Front/Settings:** Add scatter2d gl option ([be30236](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/be30236b609d8ab4fc0548c1d79879fdd48148ad))
* **Front/Settings:** Add time shift user setting ([ab91ec4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ab91ec4a81b5a75089777661bb569728b8d847af))


### Performance Improvements

* **Front/AppNotification:** Use better hook name ([3d687b8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3d687b8a85d16fe6ba33a823f9ad46b9bc3fe006))
* **Front/Scatter:** Move lifecycles instructions at SFC level ([c029c86](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c029c86afe2d1526e63edd70e41191f50de023e2))

## [13.2.5](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.2.4...v13.2.5) (2024-04-19)


### Bug Fixes

* **Processing/AutoclusteredStorage:** Skip reading if path does not exist ([bd70e4e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bd70e4eb595a6bb133e9ddd2392aaa6c090a15cb))
* **Processing/ExportDataframe:** Skip reduced features if path does not exist ([eaa44ce](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eaa44ce9ce5a8166b94bc298c658b553989635de))

## [13.2.4](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.2.3...v13.2.4) (2024-04-18)


### Bug Fixes

* **Front/AppDraggable:** Improve border repositionning ([2a094c0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2a094c0c3bf8e51f4c11dd6b517bade75292696c))
* **Front/AppDraggable:** Improve drag zone styling ([83d6681](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/83d6681a8c48adae7b8b5b2c541f5b19efa25b6d))
* **Front/Help:** Actually redirect to /docs ([05c2430](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/05c24307e12107d7a289d8dbb4d1abb8820ce4c6))
* **Front/Scatter:** Clarify label ([2a5bd04](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2a5bd047b87b0ad0a76bc853165166bf71769471))
* **Front/Scatter:** Display block start date instead of filename ([9df97c1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9df97c1aacae33288dd93ced4c1d90e526910602))
* **Front/Scatter:** Set no name to scatter points to gain space on hover ([d8c9d4a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d8c9d4a7a68a8a4aae030bd6a14d5e7584867590))
* **Front/Time:** Prevent changing play state if all points are selected ([37c6b96](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/37c6b9600991d09c42604f840d9ac12ab27e5057))

## [13.2.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.2.2...v13.2.3) (2024-04-18)


### Bug Fixes

* **Audio:** Prevent audio service from crashing + Catch better errors and feed them to Front + Improve code quality ([9a70db4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9a70db41b5cbd02012868c8ddd5bbeb5b5ab5f9a))
* **Front/AppDraggable:** Use dedicated drag zone ([0f23bed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0f23bed7abc771296a4d2562b5ce0c9662901b65))
* **Front/Audio:** Display audio duration + Improve layout ([ea1663a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ea1663ab7970f857f7c7915aabc4e18b1ba07e5d))
* **Front/Audio:** Do not throw primitives + Pass string to fetch ([52c1303](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/52c130344e80fd600d6bf892f1cad27cd2b86821))
* **Front/Colors:** Add color legend for isDay scale ([a57daf1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a57daf14f9d7dab8b840ae103a0d4abda0ee9fd0))
* **Front/Dates:** Apply timezone setting to all time fields + Streamline behaviour ([08a4554](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/08a4554e7d0c659ed9be8d7980a824bc0ee98840))
* **Front/Help:** Add links to changelog and bug report ([8b378e0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8b378e06a5cd986150bbdbb87d7edec1501ac624))
* **Front/Help:** Generate keyboard short dynamically from enum ([ec6afeb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ec6afeb16a0af9e1e5a707528a6fc63dc0c0ae9e))
* **Front/Notifications:** Remove auto bug report opening ([e017f7d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e017f7d33a048d38059280a71a0817c973906cb8))
* **Front/Scatter:** Lock camera and all interactions when handling draggables ([98a8fba](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/98a8fba23f4d7dd106c75347e56f125adf91d00b))
* **Front/Worker:** Handle missing relative trajectories in storage ([15994c2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/15994c2ec4b50f9edc2a66f9584db290194cf72e))
* **Front:** Remove auto open for dev env ([8caceef](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8caceefd274661f5a72560b2b3d03570439bde89))
* **Processing/AutoFill:** Transform filename to be case insensitive ([0e3c882](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0e3c8828292e9e24394d22de34636eb568f7a262))


### Performance Improvements

* **Processing:** Improve code quality + Remove code smells ([b328f49](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b328f49bdfe122d6b3b48b4b11f147596c76305c))

## [13.2.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.2.1...v13.2.2) (2024-04-17)


### Bug Fixes

* **Processing/Timeline:** Add details to TimelineIntervalOverlapError ([d55988c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d55988ce5130292bf992052ced537983b3266111))

## [13.2.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.2.0...v13.2.1) (2024-04-17)


### Bug Fixes

* **Audio:** Send whole file if no slice asked + Set requested end to max file duration if needed ([83ffcc9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/83ffcc92c197c0b12207a99cbef098e92f4e5df0))

# [13.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.1.8...v13.2.0) (2024-04-17)


### Bug Fixes

* **Front/Audio:** Mitigate erroring when reading bit depth from audio slice (Added TODO) ([e20deb7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e20deb700d978652840a0ecb36f9b72788514eb7))
* **Front/Settings:** Disable details panel auto open ([980f46f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/980f46f2e284cc61b99523bdddff8efbe4974692))
* **Front/Worker:** Ensure file paths starts with single / ([f94eace](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f94eace6f1b834a38c83b88afae25754acedf882))
* **Front/Worker:** Wrap all read actions in error catcher ([e152367](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e152367386b401e2b67fd54639bde148935d11ee))
* **Processing/Menu:** Add warning message to remind user to Quit before visualing ([00628be](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/00628be7b1416ee768846249ae229f02e3062d85))
* **Visualisation:** Allow single Electron instance ([1da68da](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1da68dab0e424cb71aebcc90dc173e085093369d))


### Features

* **Front/Scatter:** Display details when hovering interval point ([458abf8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/458abf8ab205fd92412b471507a2ee49303161c8))

## [13.1.8](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.1.7...v13.1.8) (2024-04-09)


### Bug Fixes

* **Front/AppNotification:** Show copy and bug report button on error notifications ([eb74aee](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb74aee7fe5fcec8ea2e7e7648503e875baf9452))
* **Front/Audio:** Improve audio endpoint generation ([34b5695](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/34b5695ee79dd8e0bed3c54346db3aff406ef7d8))
* **Issues:** Improve bug report form ([7a1dd27](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7a1dd27161783fd9dcc96c16d8bd47e8528d7c2a))
* **Processing/Menu:** Move `run all` choice to first position ([d9f6c8e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d9f6c8ea16db2ab6bd8dd7127e6cbc818c5046ee))
* **Processing/Storage:** Ensure converting numbers to strings when reading from h5 ([dfef938](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dfef93839d7373a3e36c2fbf002afd9c248397fd))
* **Processing/Storage:** Extract exception ([d494ee4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d494ee4a9e80593a410064c9edbd5e123a2bea0a))
* **Processing/Storage:** Extract exception and make custom error code ([b7edcfd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b7edcfdab6175d9503b3408281f1f6dd606f1a9e))
* **Processing/Timeline:** Improve error message for overlapping interval ([62faa01](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/62faa016dec21b3111cb213da7e003518d82cdf2))

## [13.1.7](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.1.6...v13.1.7) (2024-03-29)


### Bug Fixes

* **Examples:** Create test campaign for Processing E2E all features ([d2cd23f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d2cd23fc976e7f6a4271c46acfb78a7a4ab578c3))
* **Processing:** Fix maad regression + Use latest version of maad ([49bb086](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/49bb086ef992adafca47007a9dcdf592b285370d))

## [13.1.6](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.1.5...v13.1.6) (2024-03-22)


### Bug Fixes

* **Examples:** Update campaigns configurations and datasets ([8cf862c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8cf862c318e1a6434b8c653ca427dd4c9b3b042c))
* **Processing:** Use decorator to intercept and prettify exceptions ([0c82ebc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0c82ebcbc098e20b808f72449d695ab187d7458c))

## [13.1.5](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.1.4...v13.1.5) (2024-03-13)


### Bug Fixes

* **Bin:** Fix typo when incrementing version for venv script for linux ([04fa7d7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/04fa7d7fb1664757e9fa04f17b700a78566baa23))
* **Bin:** Fix venv scripts and incrementing script for linux ([98a5449](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/98a5449a5b3e33aae24b40ec4bd9d00f5d17f831))

## [13.1.4](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.1.3...v13.1.4) (2024-03-13)


### Bug Fixes

* **Bin:** Add curl to installed requirements ([a2f416e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a2f416e2158bf5db6c363e821971c600a0d5b0ed))
* **Bin:** Rename sse-venv scripts to sse-processing and move to bin folder ([1c88818](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1c88818f45a93c581dd9c91e15a670a09e3d87b6))
* **Processing/Utils:** Sanitize Windows paths when auto filling config ([6085bd0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6085bd0ed66321f8ff4d73cb372685c20dae9981))

## [13.1.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.1.2...v13.1.3) (2024-03-12)


### Bug Fixes

* **Bin:** Remove unneeded system requirements for ubuntu systems ([c9122fc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c9122fcfaa50d2c0f66d57ef3ff653fc1c5b70f0))
* **Bin:** Rename requirements file for ubuntu systems ([db2f8b0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/db2f8b03e3c843b774d902cabb790deadad02164))

## [13.1.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.1.1...v13.1.2) (2024-03-12)


### Bug Fixes

* **App:** Add new venv scripts for easy processing installation & activation ([096aeb7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/096aeb78451db81db4ce1027f44ca21d3654bf5a))
* **Front/Settings:** Use explicit preview tag ([3d5effc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3d5effc77210e88d50885c4696a84b549d1f0488))
* **Front:** Remove old docker files ([36992ff](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/36992ff028093a5c41bbd82e39319fee7b909def))
* **Processing:** Add `soundfile` backend for Windows systems ([081f3b4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/081f3b4a7e977ecc5d553c1a4886fe4a94c78061))

## [13.1.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.1.0...v13.1.1) (2024-03-11)


### Bug Fixes

* **App:** Add new python build process + Purge old files ([1a8b508](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a8b508c1f67085ab0c6c976cf6080bc7d22aec0))
* **Release:** Add pypi token to env variables ([30a3a36](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/30a3a3615a9ff35d19e3974292c1d25b845ad174))
* **Release:** Avoid appending comma when replacing pyproject version to next ([a1e384f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a1e384f3802b4b4043fdfae008ebf91110b89580))
* **Release:** Specify src dir and commit next pyproject.toml ([dfda5b6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dfda5b64265679bfe0b4081142d89a9790a82e59))

# [13.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v13.0.0...v13.1.0) (2024-03-11)


### Bug Fixes

* **Release:** Fix pipelines ([1cca474](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1cca47404b9c4c8153326664e4aafe71aa68e5ed))


### Features

* **Processing:** Migrate to pyproject.toml ([8d58b3b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8d58b3b6b50949b22b823803be45002c44f7d9bc))

# [13.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v12.3.0...v13.0.0) (2024-03-01)


### Bug Fixes

* **App:** Remove `audio:front` unused command + Remove dev deps ([8f678fb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8f678fb7d3095910113f0799f102fe210e176de2))
* **App:** Update audio command + Add install:audio command + Remove serve dependency ([5981229](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/59812292763ae90f5890a7c8072129ece5de2caa))
* **Audio:** Add exitcrash flag ([caccf15](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/caccf1548783d4a1d478b0f9454f806701f527ff))
* **Audio:** Remove unnecessary console output ([70ecce3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/70ecce394348eb03ffa729998a2465c72721dc28))
* **CI/CD:** Commit visualisation version file with release ([3240629](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/32406299a3b002796f6fff07babc3d52284f75e2))
* **CI:** Increment modules versions correctly ([1caca18](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1caca18859b7a6a0100af42cfee65a1403b31a8b))
* **Front/AppHeatmaps:** Trim labels for consistent display ([da7de0e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/da7de0e945f94625f3874b051da8088ae5451382))
* **Front/Audio:** Add audio loading state ([5afd957](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5afd957c16b2425404d4da67c043e7a9e7907e81))
* **Front/Audio:** Fix spectrogram legacy code + styling ([1c3fa92](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1c3fa922d959bd5794e1acb8614b3fb4cde901d2))
* **Front/Audio:** Fix wavesurfer typings ([448744f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/448744f20b1bb61fdb670716d8ae8ff8361b8b1a))
* **Front/Audio:** Rectify interface typo ([2061ec4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2061ec49b3f7fb957954253a2c0f8476f2273735))
* **Front/Spectrogram:** Overflow decibels legend when present ([3158c7d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3158c7dbb1b30abdfef0f23b631c6d544c082d36))
* **Front/Spectrogram:** Use strict comparison in legacy code ([c81d4ab](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c81d4ab94304eda705039a85d81cba6e13e4012c))
* **Front/Spectrogram:** Use user FFT size on new plugin register ([b5d0873](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b5d0873f6acb61f143f093e3bd4b35a4dbce0f7a))
* **Processing/CLI:** Feed ffmpeg and ffprobe paths to new audio command ([c100e0d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c100e0d7e30c302d9be81986ea76f2fecbb42eb3))
* **Processing:** Report CSE fixes to SSE (Silhouette and MDM) ([10506b0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/10506b01c886b421ac8f60f6ca73d6c388932573))
* **Visualisation/Renderer:** Improve configuration file loading zone ([2db2481](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2db248141833bf0bc3c7ea0266f8dbda3ef36701))
* **Visualisation/Renderer:** Improve styling ([1a0687d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a0687d5bd75999c83bb0d68a4e3d89986b510a7))
* **Visualisation:** Improve home screen styling ([9a1382a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9a1382a19bbc9dc2b44deffe772efef3f78f4c55))
* **Visualisation:** Remove storage path injection as input file modification is forbidden ([20913d3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/20913d334e6171b2dbe50e12e5d90f7b2b7553e6))


### Features

* **Audio:** Add versioning to audio service + Update CI/CD pipeline ([dec8554](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dec85542559939de3b01ace2e4c66686f96c8286))
* **Audio:** Create API to slice files before sending over network ([87ef944](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/87ef944aae93bed8b25a283addf280adb6fc920a))
* **CI/CD:** Add visualisation building to release pipeline + Remove old Docker pipelines ([41e4632](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/41e46328caa39848406df1d3edbef3b84b9f539e))
* **Front/AppHeatmaps:** Add dynamic font sizes ([e26e52f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e26e52f9d5af48110aa5ebef03441665fc1c51a6))
* **Front/Audio:** Add decibel scale legend to spectrograms ([cdc5be6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cdc5be679589c29e7f52c2cc3f8ed57528423299))
* **Front/Audio:** Add overflow setting to spectrogram legends ([463232c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/463232c4148156c7a3ffcd035090497804854947))
* **Front/Audio:** Allow decibels legend toggling ([4ffd8e3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4ffd8e30e3aa3219c6469a39ae8375607ab74214))
* **Front/Audio:** Allow on the fly spectrogram color map changes ([bbd81d8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bbd81d8122022ce48c2f957f94cd99bdcff223b3))
* **Front/Spectrogram:** Use dynamic bit depth ([f0dc985](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f0dc9859643567c1d25f770afe340f0c78ef9a90))
* **Front/Timeline:** Add WIP component ([deb81c0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/deb81c00a6f7986c08d6b715efa96731ed09b5b9))
* **Front:** Add preview setting for beta features ([1a87ed0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a87ed0e8542ba6acbab5b7c5fe24e871beb73cb))
* **Front:** Use new audio service API ([4715765](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/47157653bcc5f7a5749b5e34b31ffa01b3e41ef6))
* **Visualisation:** Allow input h5 files ([934eb35](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/934eb35eca1797a3b0f4dd142a1f3cf6c5004691))
* **Visualisation:** Bundle visualisation services with Electron ([d95a0bc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d95a0bceaa11dd0bc9eff9f13af8537b98e67230))


### Performance Improvements

* **Front:** Remove audiobuffer-slice dependency ([e49a765](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e49a7657ca4f508f745cb7ce91c96b6f44d18209))


### BREAKING CHANGES

* **CI/CD:** The visualisation binaries are now built and added to
each release
* **Visualisation:** The `front` and `audio` services are now bundled inside
an Electron app.

# [12.3.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v12.2.0...v12.3.0) (2024-01-02)


### Bug Fixes

* **App:** Commit incremented front version file ([9c8bd60](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9c8bd600c0b341c4efafc37d87590c1e891f845e))
* **App:** Set `serve` package to production dependency ([9a66e9a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9a66e9a14f7c899aa2a997c3330509d39f43c447))
* **Examples/Config:** Add link to campaign user guide ([6b9db54](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6b9db54f66407a322fce63dc6ac28736829f28ea))
* **Examples/Config:** Fix first column in files tab ([92f95cf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/92f95cf5af19f21d83b91f2d09801b629fe48fd0))
* **Examples/Config:** Remove `vae` and `sparse_pca` reducers to prevent usage ([685e771](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/685e77141458f8d3e5be486f4bd9a72a0f402d0c))
* **Examples/CoralReefLight:** Regenerate processed data ([ad266ac](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ad266ac6fdb7990b1379ef3c2e4a88e652471948))
* **Examples/CoralReefLight:** Translate files labels to english ([e934949](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e9349491829fea1c44001d1444c0b958c80a1ac0))
* **Examples/CoralReefLight:** Use latest template + Remove unwanted data ([422d2bc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/422d2bc081a744172d33d7277b1c923577355367))
* **Front/AppHeatmap2d:** Fix values prop typing ([a58aab9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a58aab9e988ac52b63dc874bce741a53a680f301))
* **Front/AppHeatmaps:** Refresh plot backgrounds on settings change ([ccc124f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ccc124f0dd27f71d90ca051dcca561a4ec657ff4))
* **Front/AppPlot:** Refresh plot background on settings change ([313f1a4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/313f1a405c8ad1f3a8974dc44c46b029c293eb70))
* **Front/Audio:** Extract rate and transport functions to composable ([ccd0648](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ccd0648362eaffedc1bc0cadd7626287885eee5f))
* **Front/Audio:** Extract volume handlers to composable ([4e51e8b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4e51e8bcbdb5b855da2f6e253f88a4f7219a027e))
* **Front/Audio:** Improve code splitting + Remove unused unmounted hook ([53393e5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/53393e50b792e9d51b6a853bccde381487cf2028))
* **front/Audio:** Improve composability ([2b3e3b5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2b3e3b5bf31d0755b7e2d1ce9dd7c749e628ac09))
* **Front/Audio:** Improve composability ([2c63cff](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2c63cffc039477881028713aea2f7b1be667ece9))
* **Front/Audio:** Improve composability ([cbb3684](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cbb36843137d91c1ef5e2c3cadcfa345b3eeae48))
* **Front/Audio:** Remove unused check for spectrogram colors ([7a135df](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7a135df8726d1c88c3227e8e0ebfa5b6d59dcc5b))
* **Front/Audio:** Remove unused imports ([8ae961f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8ae961f9dfa94e596b15391c3461df5c70e3aecd))
* **Front/Colors:** Remove color type shadow default value ([fcdeaae](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fcdeaae00120e6fe02f7e501117db6c6276f95ba))
* **Front/Colors:** Use `cycleDay` as default color type ([4cffece](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4cffeceb2ad6ac0129c6aab8ffde78812d75e31b))
* **Front/Details:** Rename extracted data to indicators ([ebf64f6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ebf64f6a1a5d578bb948736207a7109a170ebb7e))
* **Front/Indicators:** Fix typing ([adc1c66](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/adc1c668cb6ba0e9255689cde3c167dd1c4d9d04))
* **Front/Label:** Encapsulate text to control coloring behaviour ([0435967](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/043596724f6ad77beb190f809912ec8091adda12))
* **Front/RelativeTrajectories:** Add app prefix to exported CSV ([871953a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/871953a60caecc21da685cb6a70e9025bc8b8291))
* **Front/RelativeTrajectories:** Transpose exported CSV data ([efbd045](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/efbd045d20cbb974cf529b21de215a28baac245e))
* **Front/Scatter:** Rewrite PNG export for stable behaviour ([c1527ec](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c1527ecc82470e1074b11f6c4796f99372ebec06))
* **Front/Scatter:** Use dynamic export filename ([5ecfac0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5ecfac0f1c65ef8708a6b6a889338b3b1b27b881))
* **Front/Time:** Display end date + Improve behaviour ([d256e3d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d256e3d6c7abd66892e758e48400cfc769c07474))
* **Front/Utils:** Use base64 line breaks ([e3570f0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e3570f0f0b85fc4884bb5bc5cb2b893ffec7df3d))
* **Processing/Utils:** Add line break before printing action status ([8250204](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8250204b108b05d60cc927f12399e652e57740d9))


### Features

* **App:** Add MIT License ([d2d1800](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d2d180080c8b0de5f36bbdbc5e2e0d6f04f1ad30))
* **Front/Import:** Display timeline origin in human readable format + Display timezone ([161ec00](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/161ec00687014dc7c3117ac698d7be5758110746))
* **Front/RelativeTrajectories:** Add custom exports + Use dynamic filenames ([3c33875](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3c3387509e2e39759764a762946380395d530b98))
* **Front/Settings:** Add apply timezone option ([751af34](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/751af34e8b502457ec77d76ae4fac7cc9489596f))
* **Processing/CLI:** Add `sse_audio` command ([fe0c694](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fe0c6944b5db0362e720d406e8ff59de11d80137))
* **Processing/Menu:** Remove audio windows fix for versions prior to 10.7.2 ([82b4ea4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/82b4ea4a5f368f43a509049330201679eb005bed))
* **Processing/Menu:** Remove repack menu option to avoid errors on non UNIX systems ([b46994f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b46994fccfccc4898980d9cea5e6c31c09713b87))

# [12.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v12.1.0...v12.2.0) (2023-12-21)


### Bug Fixes

* **App:** Add bash util to increment front version ([a38c5ea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a38c5eaec532a4d971decff4c929265bbde939b1))
* **App:** Add front version increment on next release preparation ([d0a4e1a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d0a4e1a56445fe77daa6b5331f118578373a7bb0))
* **Front/AppGrid:** Add tiny y gap ([f9d5fad](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f9d5fad79b3f7c80ed92dfb33504ea4e7e5e013f))
* **Front/Audio:** Prevent creating multiple WaveSurfer instances ([484737e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/484737ef59c3d1dc3a6b210a765d6e35b8bf2956))
* **Front/Scatter:** Remove obtrusive notifications ([f19d0ed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f19d0ed289c843d76d97edc1dce2e130c2d7514c))
* **Front:** Add current module version ([66249d0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/66249d0756b059b6967c9703aed370bab2e07dec))
* **Processing/Action:** Validate aggregated data before computing requirements ([5408460](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/54084609bfd06444a15de0f1d8b25ec0dfa86eeb))
* **Processing/Action:** Validate aggregated data before reducing ([87fa748](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/87fa74826c653ccda638ffb5dd65e1d543bb0f3d))
* **Processing/Action:** Validate aggregated data before tracing trajectories ([dcb56d5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dcb56d58320278010c716b8b0f66a98a04ee0978))
* **Processing/Action:** Validate autoclustered data before digesting ([0802622](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0802622fa9eb689636c195b67be62c0468fab5b8))
* **Processing/Action:** Validate reduced data before tracing trajectories ([192e5cd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/192e5cd165c741c70a0676fe6f4ffe1d01a37bb9))
* **Processing/Menu:** Improve action rendering ([fb5e905](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fb5e9054974487c53a91e4919657155e585caa89))


### Features

* **Front/Help:** Display current module version + Improve UI ([edc09c9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/edc09c909a847a6b5a2ff419f022469c59d8e380))
* **Processing/Menu:** Add storage state in menu choices ([bc0230a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bc0230a8a487f49c30592c8a06d9003413098cfb))

# [12.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v12.0.0...v12.1.0) (2023-12-20)


### Bug Fixes

* **Examples/Campaigns:** Update configuration files to version 12 ([1a0d323](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a0d3232c9d85cc06b5ed8e9232745329f2c34a0))
* **Processing/Autocluster:** Add clustering fallback values if OOM ([4de3a92](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4de3a92ba975a0249b4954c6cd864bba6091e960))
* **Processing/Autocluster:** Catch memory errors when fitting ([aa40a70](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aa40a704bf758969a33483c9c1dcd987cd3f2add))
* **Processing/Autocluster:** Feed the MDM dataset ([3566ecc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3566ecc959e6c3863665e80a5a64ee84074bb2d1))
* **Processing/ExportDataframe:** Use correct config validator ([6e29e6f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6e29e6f8aef21e0f6fdb76c0488c81728d508288))
* **Processing/Utils:** Remove misleading default gigabytes ram limit (test) ([19cb44b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/19cb44b1363a4c1f25e708cd4df799db7152911b))


### Features

* **Processing/Utils:** Add memory resource limiter helper for testing purposes ([837eb15](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/837eb158c9952ff4e55b87061f47150c81b561c4))

# [12.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.10.0...v12.0.0) (2023-12-08)


### Bug Fixes

* **App:** Remove `audio:front:windows` unused pnpm command ([87dbf99](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/87dbf99c52ebcec7fa8b2ee454f0b2e1635a5bf8))
* **Bin:** Add gcc to ubuntu requirements ([c457d1e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c457d1ef16c2f8fc0dca00c874994b657f1fe86d))
* **Front/AppPlot:** Move legend to right top corner ([e3704b9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e3704b9b14cd33af05e4cef406ac4484f0641d13))
* **Front/Help:** Improve layout ([3afbdb7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3afbdb7418492df48ce1d7fece691ef928c18833))
* **Front/Indicators:** Rectify typings ([ec83b67](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ec83b675b4cb2f1df5921bebc96d4beb9edc1240))
* **Front/KeyboardShortcut:** Replace `space` with actual raw string ([ac5806e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ac5806e88f6b8d671a6b683d371fc97a7d79c5b5))
* **Front/Labels:** Remove coloring notifications ([c20ac69](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c20ac69762f1634c7c7ae4dd02dad4ac8a22a9b2))
* **Front/Scatter:** Remove last camera position button ([afed7f7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/afed7f761228773f2886ce0c0f0e691904a8e7ec))
* **Front/Selection:** Close modal on selection load ([4cf5879](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4cf5879d02fc599efa45a7bcafcbeaf6eb1b6013))
* **Front/Settings:** Lock keyboard shortcuts when typing in audio host field ([6fb5bab](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6fb5bab280db3644f65eb2a650ba3c66bd13ef7b))
* **Front/Settings:** Rework interface + Remove unused settings ([cb6ad95](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cb6ad95290f43b8e6580df2b0d94052dbf96d054))
* **Front/Storage:** Fix typo in settings ([8b596b1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8b596b17821174a39e074d67e99eeb08c1db91d9))
* **Front/Worker:** Catch unpopulated data for autoclusters and relative trajectories ([95291bf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/95291bf74758c4dbe930c33ab93dcd7a802de371))
* **Front:** Improve plot layout + Add relative trajectories legends ([247803f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/247803fea913db3eddf1f45fd85bae28771e180e))
* **Front:** Improve plot layout + Replace old histogram component with plot ([6560bed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6560bed4ec4c7cad30d2529b9ac031d9dfbb782c))
* **Processing/CLI:** Audio paths containing spaces are now working on Windows ([73d0991](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/73d0991a34e71ac121096cdcb6546154fc68047d))
* **Processing/CLI:** Remove bare `viz` sse command ([40ae89f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/40ae89f954bef6e248f45842bcd884563958db59))
* **Processing/Config:** Display config loading status in console ([767b812](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/767b812e04e2685426a4478e7ac6bd01ff344d26))
* **Processing/ContinuousTimeTrajectory:** Store relative timestamps as floats and not ints ([96538cd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/96538cddb196bc1bc542832df93de477ae7df6d6))
* **Processing/ExportComputationUmaps:** Add specific decorator with configuration object ([17d4f1e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/17d4f1e4d2216497cd968e6e0307fa5d56fe90c3))
* **Processing/ExportMeanDistancesMatrix:** Add specific decorator with configuration object ([0c31efb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0c31efb33672979c52cd410c8f4c7059a6e54e6b))
* **Processing/Menu:** Improve layout ([82024aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/82024aa23904b1a059a3fd6c146244355ca00c99))
* **Processing/Menu:** Remove configuration refresh from export choices ([3256f9f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3256f9f225c4b7300a4a7d796dc10125fafca226))
* **Processing/Menu:** Remove unused file detection choice ([49a1645](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/49a1645164c81e7b68f0d6c0fc87bc6c1a5dc022))
* **Processing/Reduce:** Improve console output ([d8f1c10](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d8f1c1016993670fc8c197ec01daa6c62e51271a))
* **Processing/RelativeTrajectories:** Add attributes to written datasets ([681af9f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/681af9f8ce4760f60598d782fb8e1895b9bbc1eb))
* **Processing/RelativeTrajectories:** Add console output ([724756a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/724756a1ddb5034d573cb8cd153066d483fd13f6))
* **Processing/RelativeTrajectories:** Rectify relative trajectories implementation ([8d3cea7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8d3cea7f679c0741d47a4128070539f2a99450d1))
* **Processing/Utils:** Use importlib instead of deprecating pkg_resources to retrieve app version ([d1824f2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d1824f26639451903971c12dc418b7ec9db51b53))


### Features

* **App:** Add shell script to install requirements on ubuntu systems ([18723f2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/18723f2a57c1dc245d75a5e97f3f0a01c269b803))
* **Examples/Config:** Add VLOOKUP descriptors ([591e254](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/591e2545cd91c13d9ec52ea0c8ac6ff1a3f4ce08))
* **Front/AppGrid:** Add grid dumb component ([3e3b8d3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3e3b8d3ebbda5ecdd589ff0492e7a61781f4fac4))
* **Front/Hooks:** Add keyboard hook to register keys with finer ([a081323](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a0813231c223fd3a144b37722ac9b8023618eb8e))
* **Front/Hooks:** Read config file version and autoclusters configuration ([e620e5d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e620e5dd5e165a02ca85a78b3b4b0fbe12effcdf))
* **Front/ImportDetails:** Display all settings, specs and confs ([c9566f2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c9566f23f07ba2d8ab51638665267031bc2b5d48))
* **Front/Labels:** Add <S-z> shortcut to toggle labels' zoom ([51745dd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/51745dd30c3694229d1f1d3eadb8a68a69cade07))
* **Front/Labels:** Add bucket icon for quick scatter coloring change ([4047682](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/40476823592258025237a95c7c261d5cbda188f7))
* **Front/Labels:** Add columns toggle ([6b57c30](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6b57c3098223c6770e4b1f6f5512b80f539eb476))
* **Front/Labels:** Rework styling + Spread checkboxes on two columns ([0c1906b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0c1906b94566f18c95c06d6655baa158db97d01f))
* **Front/RelativeTrajectories:** Add CSV export ([550fe5b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/550fe5b476a2fe8cc305724cb4d440ae9ad71de9))
* **Front/RelativeTrajectories:** Add relative trajectories interface ([41bcb69](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/41bcb6935756be1d046a6415a8b201a5533fffc3))
* **Front/Settings:** Add background options for plots + Update label for auto open ([fd33aa7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fd33aa73e6afeb2dd5b893570d4622ca06715477))
* **Front:** Add PWA integration ([5ee0519](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5ee05197f5d580a285979a76d531ef0285436bfc))
* **Processing/CLI:** Add `sse_fill` command for automatic file appends ([902384e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/902384e30627b99b5c9dad4fe1a13f407c6c2368))
* **Processing/Menu:** Add vim motions ([0a6fb95](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0a6fb950ca150bdb154432d5b58309c87636a3d8))
* **Processing/Menu:** Improve menu welcome message ([65a5ef1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/65a5ef13f1af93460116b67a144b95dc73b0ee86))
* **Processing:** Add relative trajectories + Various ([880177a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/880177a48a70576080fb593251624882e369d6e2))
* **Processing:** Replace installation commands ([267b36a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/267b36ac094dec2906f9b6b97f86ee7479064746))


### Performance Improvements

* **Examples/CoralReefLight:** Remove old processing log ([56400ba](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/56400ba46137baf7a124121712a5e196a0a17676))
* **Front/Details:** Clean component ([a0d2443](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a0d244397050dbe6daa9d5ad487d6ade5d1b2bb7))
* **Processing/Autocluster:** Extract write to storage ([9e6a24b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9e6a24b6b88734853111c7687e50ccfdbfa35517))
* **Processing/ComputationUmaps:** Extract storage helpers ([bc26073](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bc26073b0f7286abba7d5963c21472f584dc5ec7))


### BREAKING CHANGES

* **Processing:** This commit introduces new installation process for the
`Processing` module. Now, CPU dependencies are installed first and by
default, then users can add CUDA dependencies on top by using the new
commands.

# [11.10.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.9.0...v11.10.0) (2023-11-14)


### Bug Fixes

* **Examples/CoralReefLight:** Update configuration and storage file ([ae0875d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ae0875d1652e0a30f8759edf69cc714a1e82a215))
* **Examples/DefaultConfig:** Center file headers ([3cc8c31](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3cc8c31f0c78188a67e702990c3d553807dfc44e))
* **Examples/DefaultConfig:** Make audio_host optional ([8dec8a2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8dec8a2b3a590be0035f54596fe5f05b00af000e))
* **Examples/DefaultConfig:** Replace audio_path with relative ([47e0cd7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/47e0cd7c760d8425e1992133be17f03c390dd1b0))
* **Examples/DefaultConfig:** Update audio host example ([4e823f6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4e823f69e1679a94414ad606405b570d9809e306))
* **Front/Help:** Update links to add new docs + Change order ([5b3b904](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5b3b9045fe897de6f339b584f6fdf5fc3111489a))
* **Front/Import:** Validate file extension before hitting worker load ([b1d6e0a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b1d6e0a7c6f44998a66573e9f9a3cd044a1f72d1))
* **Front/Plotly:** Use more consistent button behaviours ([11bcc50](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/11bcc507e5f64498dffdf93e405dcf793f93fbbd))
* **Processing:** Improve console outputs when extracting files ([3721e66](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3721e6617ecad43d59ddaa276e73f4511f8ee521))


### Features

* **Front/Menu:** Lock exploration icons waiting for selection ([640d547](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/640d547fb8708b728b0aed78311b353bf5c420d4))
* **Front/Scatter:** Add export csv as plotly button + Clean selection ([835750b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/835750bdc7a223113ab95eb1d3afc65cc94d15ed))
* **Processing/Config:** Allow optional `audio_host` + Update vue settings ([c04b892](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c04b892d486f920b635678dc95081f1ed3a25a45))


### Performance Improvements

* **Processing/ComputationUmap:** Extract storage operations to dedicated `ComputationUmapStorage` ([4cd9996](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4cd99963cb32fc58b3bfe4c40318ebbd16311c91))
* **Processing:** Import some libraries dynamically ([ca9ef2a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ca9ef2a35da871ef54881182a4c2c3c349d1cc01))

# [11.9.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.8.0...v11.9.0) (2023-11-09)


### Bug Fixes

* **Processing/CLI:** Feed absolute audio path to visualisation command ([3675fec](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3675fecd175625d1b1471c2f2f26384511f2c8c3))
* **Processing/Files:** Handle files' dates that can be parsed as strings from pandas ([977e653](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/977e653627dd9a66f52db620c97b2dce57b84900))
* **Processing/Storage:** Attach version as dataset attribute to binary storage ([0373913](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0373913b5535de4d2e865975759234bf518e92d5))


### Features

* **Processing/Config:** Warn user for files under 1 sec in duration ([aa2a7c0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aa2a7c04b8d64e17a0f7f6756e3b8e0bda1f0279))
* **Processing/Utils:** Add warning mode to console print ([5a882ef](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5a882efcc62deda7aa94e448ce37600f2f3a5b52))

# [11.8.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.7.0...v11.8.0) (2023-11-09)


### Bug Fixes

* **Front/AggregatedLabels:** Filtering on labels now works with empty files labels ([399328d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/399328d8f2b2c5c82fe59da75bc194b2c9726a89))
* **Front/AppHeatmap2d:** Rename component with `2d` instead of `2D` ([57f652d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/57f652d30fea86bfc063d947d735b33f220b9cb8))
* **Front/Digested:** Use global constant as plotly base size ([030c1bb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/030c1bb5a0a41c26de046e5b204a2c133230db2d))
* **Front/Scatter:** Add useful name to PNG export files ([04362a2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/04362a207f93137c8d44ce67ab8c168164be2139))
* **Front/Scatter:** Reduce legend size on PNG export ([9cf6e1e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9cf6e1e1e2beaa65bc867d0d29fab4259e7d6d80))
* **Front/Scatter:** Use better variable wording for PNG exports ([b4384a8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b4384a82eb8be573bb852e721fa84b4244bdb410))
* **Front/Utils:** Remove too strict typing on naive options conversion helper ([e048794](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e048794631f1de087507fe025950780006f46b84))
* **Front/Utils:** Rename svg export button tooltip ([91d1eed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/91d1eed8a46c6ea099f0a7d9c5aa5debb0711655))
* **Processing/Config:** Add checks for labels declared in trajectory tab ([99338d7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/99338d7f4f1aea56d7e1048722cd657a1134f3fd))


### Features

* **Front/AppHeatmap2D:** Add SVG export ([6fa92a4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6fa92a4579d1d45e557ff28db511e8d9d28491f5))
* **Front/AppHeatmap:** Add SVG export + Split component code ([39032ea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/39032eae70efba943623cb9bc26ba42538d0328b))
* **Front/Digested:** Add 16:10 rendering size + Sort button positions ([fa3e41a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fa3e41afd3a72b753554b2fd1f3b91a5744f7a05))
* **Front/Digested:** Add PNG exports (heatmaps) ([4dbd369](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4dbd36961f8d44b4e7e1caa3e177b87e99bcd92f))
* **Front/Digested:** Add rendering size presets ([5639198](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5639198b0019d1c37772845147b52e1e68ac8343))
* **Front/Exports:** All timestamps in CSV exports are now converted to ISO dates ([c58ae68](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c58ae68554285fb814e647c77e2b6bcad9642b26))
* **Front/Import:** Add lock to storage file + Populate unload function ([9f7d25e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9f7d25e29dc496e790bf8c8603280f572b43f5cd))
* **Front/Selection:** Add auto selecting bands, integrations and extractors if single option available + Use reactive references for naive dropdown options ([7723f7b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7723f7b2a557c13e02184e4ed2bbb2d32d3d9253))
* **Processing/CLI:** Add `sse_viz` and `viz` as aliases to `sse_vis` ([befffb2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/befffb2bdfd71ea0073fb30c11fd1ce673a5cb64))


### Performance Improvements

* **Front/Scatter:** Export scatter configuration to its own hook ([04cef2f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/04cef2f0ee4ced6078e158971c72189e53741cca))
* **Processing/UmapReducer:** Import UMAP dependency dynamically to prevent numba's AOT ([c549e3a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c549e3a832e494ae25404722916e158dff04199d))

# [11.7.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.6.1...v11.7.0) (2023-11-07)


### Bug Fixes

* **Examples:** Update `coral-reef-light` configuration and storage files ([1519c9a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1519c9a78ec90bf9e40aff7052eb32fab392dc1f))
* **Front/Audio:** Remove resolved FIX comments ([c4034e6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c4034e63d72987fce965556ecfda81e9898a982b))
* **Front/Indicators:** Remove console output on CSV export ([8f63ecf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8f63ecfe28740639c009ef4b6126d15e919aa0a5))
* **Front/KeyboardShortcut:** Remove resolved TODO ([0e6b790](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0e6b79023da29ba7e329ccc61a912480703ee910))
* **Processing/CLI:** Paths on Windows containing a string are now supported ([b44b664](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b44b6644ee993297bd0a92efbdab129794d90429))
* **Processing/TimelineWalker:** Reassign TODO comment as INFO ([6d35dc3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6d35dc3fcebc3fa7461c51ce1727a4bf740ce4d5))


### Features

* **Front/Indicators:** Replace histogram by scatter markers and lines ([fab053b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fab053be79eecbdb8f94a6ab79847e46c75b6608))
* **Processing/Config:** Allow configuration files with no labels (dirty) ([5c6640d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5c6640d3e608e06a654b6930d2e8d4fcf4f9cbf6))


### Performance Improvements

* **Examples:** Rename coral reef files with light suffix ([6c5ba04](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6c5ba049f12a5b3af4ab0f7a3cf63ee8df19bce8))
* **Front/Digested:** Extract heatmap presets keys to single enum file ([eb71bf0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb71bf03ac52e965c9265973113adc65ec15febe))
* **Processing/Utils:** Write more pythonic string comparison ([20ea69c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/20ea69cdf6809988ba2cce3f052ae9107e822dc8))

## [11.6.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.6.0...v11.6.1) (2023-11-06)


### Bug Fixes

* **Front/Extractors:** Add `yamnet` as nn extractor (Add to constants file) ([410862d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/410862da1ba28ce2b73dc265366ebcaa2596caa0))

# [11.6.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.5.0...v11.6.0) (2023-11-04)


### Bug Fixes

* **Front/Scatter:** Increase marker size for 2d datasets ([8839562](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/883956299ec222f203fe3969b6f898ae659a5435))
* **Front/Selection:** Correctly reset extractor reference ([16b0a46](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/16b0a4681d3c78d40cdde4af8bfd3d0dd438b504))
* **Front/Trajectories:** Fix 3D detection for traced data (fixes 2D trajectories) ([9c34660](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9c34660824b46fc48578b584fcf44d6b7204d1b0))


### Features

* **Front/AppHeatmap:** Add margins to figure layout and improve readability ([b4a982e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b4a982eeae5077d041eba9fc6853336cc1061f37))
* **Front/AppHeatmap:** Autoswitch color scales and ranges on digester change ([db32df5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/db32df5fc57bbf2e28ab1ec77ac60b2c8bde4d3e))
* **Front/AppHeatmap:** Reduce gap width for increased readability ([abfabf9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/abfabf94792dcc1c0ffcb71debd6f941520dfe51))
* **Front/Selection:** Lock selection when done + Add selection unloader for clean state purge ([fef62e0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fef62e07085b5507ce6a67ef88644f92d56b2f79))


### Performance Improvements

* **Front/AppHeatmap2D:** Organize Vue file without hoisting ([0188033](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0188033af9d5b922c3d7692e0936a9526d1a964e))
* **Front/AppHeatmap:** Merge data generation to common hook ([85a458f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/85a458fa3a7d19fbbae49c52d8f2a74035a520a9))
* **Front/AppHeatmap:** Organize Vue file without hoisting ([c6dc1af](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c6dc1afe6ee63c5a420616a2cf8ecb39c554c3b6))
* **Front/AppHeatmaps:** Improve rendering performance ([dedda49](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dedda49312eebadca8af6d535026cfa82b8a2f2b))
* **Front/ScatterFeatures:** Improve 3D check ([b34b5ac](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b34b5ac18fc0eedbc5e386b630d54f916076d5f5))
* **Front/Trajectories:** Merge default options + Adjust size for 2D traces ([1269719](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/126971915e522d07c2e822ff3fd45cf19f7862fa))

# [11.5.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.4.2...v11.5.0) (2023-11-02)


### Bug Fixes

* **Front/Details:** Increase audio block listening buttons size ([f6f31b1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f6f31b1371c0d90e6fdf61ac455e2283b9b0b03d))
* **Front:** Use shorter notification timer ([d535954](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d53595457f97aab8d7fae17872aeadd448f2d72f))


### Features

* **Front/Audio:** Add interval details ([5b85255](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5b85255c8dde8a9ba819fface1342ae6b9586535))
* **Front/Details:** Autoplay audio if interval contains one file ([79fe696](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/79fe6968cff2126371c76b8c30c0db6d5035c522))
* **Front/Digested:** Add dynamic color scales and multiple value ranges ([8da51a5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8da51a51f3eea612e8e08e4edf622306d5e445de))
* **Front/Scatter:** Add new downloads as PNG and SVG with label legends ([e0c27d9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e0c27d9a49375f6e44d47674652495f797f85f6c))

## [11.4.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.4.1...v11.4.2) (2023-11-02)


### Bug Fixes

* **Processing/Config:** Initialize python module for binary ([91038ab](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/91038ab7734b7a2ea390895de875c5d6674e3f41))
* **Processing:** Make starter with installation for windows script correctly print line breaks ([416b8ae](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/416b8ae1293488632a588e9590550abce2cd097e))
* **Processing:** Merge get_version_from_setup into setup file to fix import issues ([eb589cd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb589cdb6e262bbdf376680bc226f981e9b857ae))
* **Processing:** Removing windows batch starter script with installation as it can have unwanted side effects ([658f2fd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/658f2fddc79577f2648935ad0b72b7f4d3777620))
* **Processing:** Return to hardcoded cli name and add documentation about needed changes to modify this ([b0abbc1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b0abbc1b17cec94c56974de011bfd562a9331845))
* **Processing:** Split setup env variables and app constants ([4deabb0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4deabb0ff13c70c6c2aa74aa8ac2ffeb1be3a685))


### Performance Improvements

* **Processing:** Add starter windows batch script with auto install of visualisation modules ([db5002d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/db5002dd37ee851981e1ca26626329f4341b39b1))

## [11.4.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.4.0...v11.4.1) (2023-11-02)


### Bug Fixes

* **Processing:** Move constants file to `processing` module (bug introduced in 11.4.0) ([2227a6e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2227a6ecba319a4f0af035c31ec0c03dc6400bb4))

# [11.4.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.3.0...v11.4.0) (2023-10-30)


### Bug Fixes

* **Processing/Config:** Add fallback to default values for extractors parameters + Misc ([9a3fc02](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9a3fc02e81497cc4d29bb50d4f2bbcae710e45c1))
* **Processing/Config:** Forbid reducers with no dimensions requested ([c5e90f9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c5e90f93ef5f6f09582bc536906d2748a859b465))
* **Processing/Storage:** Improve string comparison ([5daa174](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5daa174cefd25ede8ca7cee7bc2cfaf3356f073e))
* **Processing:** Print CUDA device in console ([7d1086d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7d1086dce7abf0bbb7ac670188187113ce60f943))
* **Processing:** Replace `sse_front` with `sse_vis` CLI command ([1e9a2f7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1e9a2f76ec0471cea89babd950ed5105c3b067ed))


### Features

* **Config:** Add inline help + Improve UX ([34fd0b0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/34fd0b0548ce119646b8f985ce32981b61439a36))
* **Processing/Storage:** Attach app version as attribute to every dataset ([577f658](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/577f6582b5c812b25e42024ad5d7e4366032c474))
* **Processing:** Add constants for app name and CLI prefix for easy modification ([c8044b9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c8044b951f44235ddd1363c3f6f2a859e85071ce))


### Performance Improvements

* **Processing:** Move previous constants upper scope ([dfd9e2f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dfd9e2f01ed521a56f159a18aae6c05da64dd222))

# [11.3.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.2.0...v11.3.0) (2023-10-27)


### Features

* **App:** Add all variants of `install:all` ([cb1e433](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cb1e433f03f44c54651e6d2df5acd8da7c6c5a81))

# [11.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.1.0...v11.2.0) (2023-10-27)


### Bug Fixes

* **Processing/Binary:** Rename variables shadowing builtin names ([95efa87](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/95efa8707e5cf58dc0330db36e292fbe3936f9bb))
* **Processing/CLI:** Use single purpose function to retrieve audio path from configuration file ([35a88aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/35a88aa2fef81d4fa6ea0d31f360a3ee2b2aed13))


### Features

* **Processing/CLI:** Add `sse_config` CLI to export .xlsx from .h5 ([751caa7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/751caa71d71906e1f77ce867c8f0d3cb89ce00d4))

# [11.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.0.2...v11.1.0) (2023-10-26)


### Bug Fixes

* **Examples/CoralReefLight:** Update results with 10 iterations, 3d calculation UMAPs ([549c5f8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/549c5f8805d743dd441f55c1f69ba74b4b9040b4))
* **Examples:** Update Excel documentation ([9423aee](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9423aeefca9030a73a27165a825dbc4c0ee5eede))
* **Processing/Autocluster:** Print warning no cluster selected FIXES [#119](https://github.com/sound-scape-explorer/sound-scape-explorer/issues/119) ([283cd9a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/283cd9a4a0bfde0dd8644b573896a9bb162232f7))
* **Processing/Config:** Allow numbers as trajectory names ([e0adf9e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e0adf9e0ac8837a9d102c62a263a4bbf9500a58e))
* **Processing/Config:** Allow numbers of names for bands, integrations and ranges ([778845f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/778845ffd39c1eed4b33b982425f39579bbc70d1))
* **Processing/Files:** Fix typo in full path helper ([a8693aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a8693aa88e2b806dcc6ec7b5f5baae71316c3f29))
* **Processing/Files:** Handle files in configuration not starting with '/' ([a333133](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a33313309c0916fd4df4f06489613b78ed481cea))
* **Processing/Requirements:** Avoid computation if no autoclusters are requested ([c0bbee5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c0bbee503349eed9ba92e5fab9c77b932560eba4)), closes [#119](https://github.com/sound-scape-explorer/sound-scape-explorer/issues/119)
* **Processing:** Add automatic refresh configuration for single menu actions ([768f529](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/768f529d5389fb01850a3a722a759f59500d4fcd))


### Features

* **Config:** Update default configuration's ergonomy ([75fe5a8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/75fe5a8602827501a004a01789be7db36429b94f))
* **Front:** Open browser on node server start ([250e024](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/250e024c16fa9aaa26c749b6aff35b88fcc7c39e))
* **Processing:** Add binary storage for configuration file ([4590550](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/45905505d7980821bddcc3c0954e6057de1d8487))

## [11.0.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.0.1...v11.0.2) (2023-10-26)


### Bug Fixes

* **App:** Use common pnpm commands between operating systems ([caf7d20](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/caf7d20dbc263fef0c7300ef5b01d9b8c0e23d91))

## [11.0.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v11.0.0...v11.0.1) (2023-10-26)


### Bug Fixes

* **Processing/Main:** Remove unused var ([e0d9cb4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e0d9cb433a21bc1827938b1c4c5db8d59ffd4ed9))

# [11.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.8.1...v11.0.0) (2023-10-26)


### Bug Fixes

* **App:** Make `sse_front` behave differently on Windows ([7c87d01](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7c87d018fd170a98002686fa8976580628e399b0))
* **Examples:** Update `new-campaign` template (remove YAML + Update xlsx) ([a4821c6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a4821c6434e57c1b3683fda6366920c3a478584f))
* **Processing/Docker:** Update dicts filename ([c6646dd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c6646dd9099ab867e5b3a6bc21a1011c19b7c5a9))


### Features

* **App:** Add `sse_front` cli command available if Processing module has been installed ([16ba5b1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/16ba5b13cd2d101a6b9617d0b060086130d494a3))
* **Config:** Added `storage_path` + Update documentation ([4057334](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4057334efa78a3777ad9e462b2c673b55594716c))
* **Examples:** Add audio files of coral-reef-light campaign + Update xlsx and h5 ([0cf2502](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0cf2502c6866d93d477402fc3c87b19450c11210))
* **Processing:** Add storage path under configuration object + Remove YAML file ([f8bf152](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f8bf152920676553219ac043e52b1b85e3c740ab))


### Performance Improvements

* **Processing:** Remove old dictionnary preparation file ([3d1c655](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3d1c65549de69d14111862e4c372a09a332ca23f))


### BREAKING CHANGES

* **Config:** `storage_path` has been added to the configuration.
* **Examples:** Configuration file has been changed (`storage_path` has
been added).
* **Processing:** YAML file has been removed. Users need to specify the
storage path inside the Excel configuration file.

## [10.8.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.8.0...v10.8.1) (2023-10-23)


### Bug Fixes

* **Processing/Setup:** Increment version on release then commit ([6882a6f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6882a6f86758912ac43ee9e8be5ed1c7cfb8d07e))

# [10.8.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.7.2...v10.8.0) (2023-10-23)


### Bug Fixes

* **App:** Remove powershell scripts (replaced with simple batch script) ([d86a5e4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d86a5e4e73866c1bc1dee047fd456ff27f448543))
* **App:** Update pnpm commands for Windows ([8e0d2f3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8e0d2f3ee69662e6a06623e2a6afb4831aff0079))
* **App:** Update process commands ([9cd41ec](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9cd41ec2c1396d3201bc3b9d0c8fddc35fc48c55))
* **Front/Audio:** Adding checks and console outputs to reproduce Windows error ([e5fe139](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e5fe1392dfe958af1ff1e30710eba07e3f606628))
* **Front:** Open the dev command to public networks ([6078133](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/607813372d5cedb01d4913eac3ea0a74cdd756c2))
* **Processing/AggregatedDetails:** Add missing separator to `block_details` ([14965d0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/14965d03b7545198399d1731955ce1a5d70ba3df))
* **Processing:** Add missing init files for proper imports ([54897b2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/54897b2483ad2b6951f5005a73e143c87ba0821b))
* **Processing:** Synchronize current version ([d07aadb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d07aadba49569bda44567dbed2795671136bea9b))
* **Processing:** Update default dicts ([7f4c62d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7f4c62d56d0118132445bde8085b318d74450a26))


### Features

* **App:** Activate venv for windows powershell script ([fd22ac7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fd22ac7631fb3a23eca4ef499c8e695ee356a39d))
* **App:** Add `start.bat` for easy venv setup on Windows ([86be984](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/86be984e0f698d13605d96ed68bc3a17f305bf41))
* **App:** Add commands for processing on windows with venv ([d691a3a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d691a3abb1de9e4e1f2795866777820e2c6b71ff))
* **App:** Add new commands using venv ([cf5c09a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cf5c09ab101efbc8b56383d0f64c38a182c3d7b5))
* **App:** Add processing module version increment on publish ([df60896](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/df60896d0b3121876db2f498a962cddd708af229))
* **App:** Add script to increment setup.py ([4e6a5e5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4e6a5e56b662d57724e5a433b70aad833e770828))
* **Processing/Action:** Add action for fixing audio on Windows ([389b1dc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/389b1dc62aa0f8b4acdf37450092b0ea509c6ca8))
* **Processing:** Use `sse` cli shortcut ([f2d22c6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f2d22c6de3801f8967c98059af6222cf5d9f661a))

## [10.7.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.7.1...v10.7.2) (2023-10-12)


### Bug Fixes

* **Processing:** Remove `PyInquirer` dependency from CPU requirements ([accfcb4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/accfcb47cdcc3ed435446c4a0e368c9a4da61a91))

## [10.7.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.7.0...v10.7.1) (2023-09-08)


### Bug Fixes

* **Front:** Add various improvements ([0ce0c6c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0ce0c6cd83f4624d0bd5a5584b576b1277eff343))
* **Processing:** Remove some inline TODOs ([d47015a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d47015a528eae58d1ca603061337d235550ba34b))

# [10.7.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.6.0...v10.7.0) (2023-09-08)


### Bug Fixes

* **Examples:** Update excel template ([4920085](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/49200851b4b79077bc7fc9d403bb30c152a1cea5))
* **Processing/Aggregations:** Ensure interval_data is not empty before aggregating ([72c585b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/72c585b4beea7bdb243e6f8b2ac9fe49a9146adc))


### Features

* **Front/Trajectories:** Add csv export for fused traces ([4333e5d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4333e5d9071219af03c9e7bbe76984e96518419d))


### Performance Improvements

* **Examples:** Replace coral reef light h5 with repacked version ([7695f1e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7695f1e59d02cc5aa508b1476b2d48dbd394b81f))

# [10.6.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.5.0...v10.6.0) (2023-09-07)


### Bug Fixes

* **Processing/Actions:** Fix console prints unconsistency for new exports ([0ce57b6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0ce57b6744196ba729f590f5bdd0305620ca90b3))
* **Processing/Actions:** Save computation UMAPs to `.npy` file + Misc ([d241a62](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d241a62b44b308257e4eb0232ea25d96ab145f0b))
* **Processing/Digests:** Trying to mitigate Théo's bug ([6c67e45](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6c67e45ad45172224258fccb1e21942422b2f12f))


### Features

* **App:** Add `audio:front:windows` pnpm command ([0d18347](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0d183476b4921539eac526113d2d1e5bb3890b5e))
* **Examples:** Provide coral-reef-light example with 50 computation UMAPs ([d0b4b2c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d0b4b2c30ce95f65d103f5a02b47c30c363ac6af))
* **Processing/Actions:** Add computation UMAPs export ([7f56e8a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7f56e8aceebd193b26325d5a71c26649b45002f1))
* **Processing/Menu:** Add choice for computation UMAPs exports ([cd933f9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cd933f900b919624e0e9762d705c95fe61728937))
* **Processing/Silhouette:** Keep all values to verify symmetry in UI ([4e872bb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4e872bb54bc0120d4d702f53e524ec4fdab41336))

# [10.5.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.4.0...v10.5.0) (2023-09-07)


### Features

* **Front/Common:** Create new Csv class to create csv files and exports ([6afe536](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6afe53621c8be7334763adb13be117375c7dfb5d))
* **Front/Digested:** Add export to csv ([10fe486](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/10fe48625e5dbed6ce7b021734ab5daa39c1d051))
* **Front/Heatmaps:** Improve rendering presentation ([69bdf6e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/69bdf6ee89f1c7b5bf0002b2d30530e86b6dfc41))
* **Front/Indicators:** Add export to csv ([891dc23](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/891dc2366ce4fe6762b442cb90ba022b0e93d511))
* **Front/Trajectories:** Add csv export for single trajectories ([76b8493](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/76b84935028a9c125660e5a71e4221dc1d6db400))
* **Processing/Menu:** Add new action to export MDM ([42f7aba](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/42f7aba6213ce5cc590da923ac397f17b1fad5bc))


### Performance Improvements

* **Front/Selection:** Use new `Csv` class ([3a55801](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3a558018761f79bf22872706787f0342708c7ffa))

# [10.4.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.3.1...v10.4.0) (2023-09-06)


### Bug Fixes

* **App:** Update pnpm scripts ([f30f632](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f30f6321babf4e7c10fee89953b0fbe3fb342a8a))
* **Processing:** Update `prompt-toolkit` dependency ([54c55e3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/54c55e3c911fc3c98a2c6560e7000383c598903b))


### Features

* **Processing:** Use `InquirerPy` instead of `PyInquirer` making app compatible with Python 3.10 ([79d2c55](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/79d2c557961767cd179f40dfb8e5a162d8b732a0))

## [10.3.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.3.0...v10.3.1) (2023-09-06)


### Bug Fixes

* **App:** Update pnpm scripts ([ad05e70](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ad05e70b789b55be61d1076edabc8eced5d62477))
* **App:** Update powershell scripts ([c276b7a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c276b7a92232e51a8acc3aa188e9b79f33fb155e))

# [10.3.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.2.0...v10.3.0) (2023-09-05)


### Features

* **App:** Add startup scripts for Windows ([8053034](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/80530342eaa45e6ce35b5bf20e1bd75207a0aa80))
* **App:** Update `pnpm` commands ([eba9171](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eba917142e598b2d50798daa6ef9dbc21392f58b))
* **Examples:** Move template files under `new-campaign` folder ([ac1f50a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ac1f50ac5d39450fda456a9cccf1b2b671b28b02))
* **Processing:** Add list of requirements for Nvidia less users ([69cb42b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/69cb42bf85f400dfdff18071da395b45454ed48c))
* **Processing:** Instanciate app correctly (checking PYTHONPATH before imports) ([049a6ea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/049a6ea4af9edc2e3809f930587b02c9027deedc))
* **Processing:** Prepare dictionnaries downloads prior for download at installation stage ([59308b5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/59308b5d3c8b709791af8ce928bdc26b45270166))

# [10.2.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.1.0...v10.2.0) (2023-09-04)


### Bug Fixes

* **Processing/Trajectories:** Compute rolling count correctly (via single step and not rolling step) ([4276afd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4276afdfbdc2132e792d77363f7303bb7aea8a3b))
* **Processing/Utils:** Allow integers to be 32 bits (Windows environments) ([77371a3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/77371a3a728a6ae07bc57652669a08e83ca98652))
* **Processing:** Move PYTHONPATH helper function under main, might not work as it is ([11f9777](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/11f9777a598db966952475941673915b68d7ae37))


### Features

* **Front/Scatter:** Improve color rendering ([873a99b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/873a99b13f7966449f33b0e09e669a8776c9eff6))
* **Front/Trajectories:** Improve rendering ([776bc0f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/776bc0f3e584f669ef787ab3775771371e156131))
* **Front/Trajectories:** Set trace width as constant ([ceabcc8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ceabcc837afcd177a75c69ca167674986242fa8d))
* **Processing/Autoclusters:** Allow min_samples to be `None` by using values as strings ([9b9bc5c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9b9bc5ce974db78409942f6e2d7c1db5f9ec973d))
* **Processing/Autoclusters:** Write autoclustering options to dataset attributes ([e976c47](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e976c47457bf06ca7b581b1eed9af9e41d133a81))


### Performance Improvements

* **Processing/Main:** Remove doubled PYTHONPATH updater ([7e8189a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7e8189a4b6a22684a49cdf3fdae45aa44e3e3977))
* **Processing/Main:** Remove unnecessary prints ([faff7b3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/faff7b32028343688b2894b062ee41c746c534e2))

# [10.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v10.0.0...v10.1.0) (2023-09-01)


### Bug Fixes

* **Front/Colors:** Apply dynamic opacity to label coloring ([4644410](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4644410c9f7c81d8b29e57620e3326edebeeb3da))
* **Front/Scatter:** Trigger new render on opacity change ([15eab2e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/15eab2e025808434107096b66f4eaaa10e2facf6))


### Features

* **Front/Selection:** Add indicators to selection export ([db2897b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/db2897b1b90c9689f2c49a7899e1200d27150f22))

# [10.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.1.5...v10.0.0) (2023-08-31)


### Bug Fixes

* **App:** Update README remove typo ([1606560](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/160656075580a2afd9658d91d7faf143a01f7196))
* **Config:** Change `audio_host` default Docker port ([a253be1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a253be12977216cd7ec33fa18f0633646fbe5c4a))
* **Front/Aggregated:** Rename features hook + Clean worker ([9ae7fda](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9ae7fda954457e57806d47545f61a2d229c966b4))
* **Front/AppDraggable:** Add viewport visibility check on mount + Improve selection behaviour to display on top of other draggables ([15604b2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/15604b2d2b60f6e89aa9cb6b50ce14730d4c39c7))
* **Front/AppDraggable:** Allow dragging only outside of modal content ([e290591](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e290591833e3fedea20815921bcaf19d687c9790))
* **Front/Audio:** Audio slice has now the correct sample rate ([104fbd4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/104fbd4e7977584960f9cef2eecce7981c06e18d))
* **Front/Audio:** Improve modal behaviour when setting audio file ([aa0d79e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aa0d79e7e241deed212ee21bc50332511fd44dd3))
* **Front/Audio:** Improve play pause button state ([a6a5a33](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a6a5a334c79d931decd9ac7b546770de867e93f8))
* **Front/Details:** Display indicators ([0b85ba0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0b85ba01054c820b5d3fb59032944cb37930eb77))
* **Front/Export:** Improve export performance ([c12b0d5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c12b0d5bd89ff11cdad3f8c617d4b8a14dcbdb9f))
* **Front/Hooks:** Remove console output ([77a70f6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/77a70f69ca7a758f789d663c357da868fefe38e6))
* **Front/Hooks:** Remove unnecessary console output ([d69f853](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d69f85307cfa50957e50aebeda6e1048f68580ab))
* **Front/Import:** Enlarge setting column width ([3bf07e3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3bf07e375464a76d00efe2b241e42c50ddd88525))
* **Front/Indicators:** Improve dropdowns ([0ab2f7f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0ab2f7fc65df992693196b67e5842b1ee0addf97))
* **Front/Indicators:** Replace old volumes with indicators ([fca6403](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fca640359f50ae72427f625cf971de440d986db2))
* **Front/KeyboardShortcut:** Remove scatter motions ([380ce76](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/380ce76d933025f4ad42146b2d4ff22e4c43e3ea))
* **Front/Labels:** Rewrite selection + Load correctly into scatter first render ([1ebb640](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1ebb640abcd9cdc7a0e817e1ebc4ce6ba27424e5))
* **Front/Matrices:** Add typings and remove unnecesarry array nesting ([db2e257](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/db2e2576f3e2686b0408a3f4d0d8def1ce08f65b))
* **Front/Menu:** Hide scatter transport button and camera reset while porting scatter to plotly ([39517ec](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/39517ec31013cdef1560a0076f12102bc639435f))
* **Front/Meta:** Improve selection on mount and on change ([d1a4dd7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d1a4dd7a2fe0000382ebc582f92665bfec8045e0))
* **Front/Meta:** Sort autocluster labels ([46d8e72](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/46d8e726d37f0071e1189a7d0c763af08e461e30))
* **Front/Pairings:** Add typings and remove unnecessary array nesting ([6d90777](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6d907777411b063ca165fb5a62fa994904f857f5))
* **Front/Pairings:** Fix async hook ([989afe0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/989afe07ff9a6913ddd90e63591e1f002dc36e05))
* **Front/Scatter:** Convert meta selected index to number before accessing to meta selection ([d1e3cb5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d1e3cb5c1364f793c62c124750486b48e99243d9))
* **Front/Scatter:** Remove and replace old scatter code ([9dc82e6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9dc82e6588d5e9d168ec2340724e7218e6b002e5))
* **Front/Scatter:** Remove domain contraints on cycling colors ([ebc5532](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ebc55321522460c771d587c00586d150e5bb1312))
* **Front/Selection:** Make screenshotting available anytime ([e48d93e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e48d93e33a8ed8fd0c4656cddc06870b6583d4ef))
* **Front/Selection:** Remove dead css class ([68589ea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/68589ea8864f00bf508def81492e3cce96625e99))
* **Front/StorageLoadSelection:** Add empty template to avoid vue warning ([24c36cb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/24c36cbf841b3bacbc369dbaa125f8b4d5f09f5d))
* **Front/StorageLoad:** Watch `reducerRef` to trigger selection ([3d26a56](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3d26a562e9d6d73dc7034611e72d885e5339c12b))
* **Front/Storage:** Watch storage read dependencies instead of trigger ([731a24f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/731a24fc8763daa5a2e26b0515c6a599229a4113))
* **Front/Time:** Add blur on click to avoid collision with keyboard shortcut ([257bf4c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/257bf4cce02639aab8b95b85c0ebd5ca64e4261c))
* **Front/Time:** Display range name instead of index ([2b49d8d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2b49d8d035de7bd391972737bab0d707a97f5de8))
* **Front/TimeOptions:** Improve styling of transport buttons ([f91a729](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f91a7294a7d0a3c33eb9ba84b93eed769c85d8ce))
* **Front/Traced:** Sort trajectories data temporally + Provide relative timestamps ([d962d0c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d962d0c3da2f4be59be2062fb54924ff01d1caa9))
* **Front/Worker:** Read flat autocluster ([555b724](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/555b724458cbb13ecc718a4ee9e02bd3efd3dffd))
* **Front/Worker:** Remove unneeded console output ([c551b6a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c551b6a2bd8454345ec2c5ca0f7fd7ec6dc8ff3d))
* **Front:** Set correct eslint dev dependencies ([148e963](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/148e963032230e501f8caae682f9c8addda77ff7))
* **Processing/Actions:** Add extraction and aggregation storage paths + Store extractor meta data in aggregated datasets ([6a9c1c9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6a9c1c931ac6ef4ae5762b9ff20f1c6c1d64aadf))
* **Processing/Actions:** Add pairings to grouped actions ([ed0bf87](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ed0bf872980d4c6e6c6ac0bcce64e11fbade3db2))
* **Processing/Actions:** Fix printing typo when repacking ([7b868ec](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7b868ec765bac93b9ad0c05fb7594fb0a4dd7184))
* **Processing/Actions:** Improve console output for configuration refresh ([408bcc9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/408bcc90cf21af0453dcd20d06ded57fda7b294f))
* **Processing/Actions:** Improve console output for extractions and aggregations ([4a7bdb1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4a7bdb1c8da06d147d108199a1180a3b0b4b7779))
* **Processing/Actions:** Improve console outputs ([b84f6fb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b84f6fb2063e27767ab89a2aa967f27712a2949b))
* **Processing/Actions:** Improve console outputs ([e5989ad](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e5989add32b9e38165a0ed1494f669404d145bb4))
* **Processing/Actions:** Improve console outputs ([68c2d72](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/68c2d72b5df39713b58e33f606d5c20f212ed6f0))
* **Processing/Actions:** Remove dead actions ([5a604aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5a604aa31ba66db1b60e047d1ba56a7c95d6c04d))
* **Processing/Actions:** Remove purge from all scenario ([8facd98](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8facd980fa2d94823cf7dc81192bc1d2fc7db611))
* **Processing/Actions:** Remove site printing when refreshing configuration ([8c6258c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8c6258ceda756df3fd05c0c7538d5b7ed5c8e32c))
* **Processing/Actions:** Use better action file and function names ([d4faae0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d4faae0295db7586cad42e14dd21a13d8023b55a))
* **Processing/AggregatedLabelStorage:** Use proper extractor index to get path ([f959d4f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f959d4f92de927fa7f765f735073b6198d23c822))
* **Processing/Aggregated:** Reflect new site path ([731d48f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/731d48fb2cf4d110ab835645459578401c76684d))
* **Processing/Aggregated:** Remove redundant labels storage ([4c78c69](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4c78c6947e2d4d1bbf2b17e5dc36dc055020a3cd))
* **Processing/Audio:** Use `pydub` to read from audio files ([69c5358](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/69c5358eb84bb1d55a91891d467f83e7e21d79ba))
* **Processing/Autoclusters:** Import `hdbscan` using suggested path from official docs ([753ab00](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/753ab00bdb76c4572b2fe0619fffa8076ec4ab9d))
* **Processing/Config:** Allow empty lines for `Digesters` ([07f16d3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/07f16d34c89afc4cbfc76e97c3a8b49459774a4c))
* **Processing/Config:** Force ints for extractors offsets and steps ([54d8dbc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/54d8dbc2410067d93a6633b67aa4dbb20e0d7de8))
* **Processing/Config:** Improve behaviour of `LabelConfig` ([37b50f2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/37b50f2788f1d0c0fef7beb8c4f7946a3cf3d196))
* **Processing/Config:** Prettify timeline origin to date string instead of timestamp ([0d325fb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0d325fb8b2bfa6de821f7c10cdef5f811f064337))
* **Processing/Config:** Remove builtin shadowing for `LabelStorage` ([90fa2b2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/90fa2b2895ff52249fe475b97fef87efe439ea4c))
* **Processing/Config:** Remove builtin shadowing for `RangeConfig` ([482501a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/482501a84aea9d1a97e7bef45e28e7985b7ffba6))
* **Processing/Config:** Remove commented class variables for `AutoclusterConfig` ([2df0283](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2df02834d26a68dccb4de02d90ea86c861a30aa5))
* **Processing/Config:** Set correct path aliases for `TrajectoryStorage` ([5e836e7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5e836e71c0686f6af97f54a6a49b635db4312606))
* **Processing/Config:** Set exhaustive sheet list ([abbaa37](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/abbaa37fc7ce7725fc820fbc7f894b22122d83de))
* **Processing/Config:** Silently force uppercase meta properties + Document for potential error handling ([31ca18e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/31ca18eb6aea9fad5b54e7a4c036c643915a1278))
* **Processing/Config:** Use listed storage paths for `ExtractorStorage` ([1a08611](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a08611f660d16baf4b0c03f01f068b80567d35a))
* **Processing/Derived:** Fix values typings + Mirror them in ([d71b6db](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d71b6db40c9b41ca284dbd394ef4112cb7b116ae))
* **Processing/Digesters:** Fix typos ([fcd22fe](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fcd22fe84aaffc7c8c1bed9f79e1694ad8a94c4c))
* **Processing/Export:** Better column naming ([3a9a7d7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3a9a7d7c6b195cc86d69720b8435b4d43b2483bb))
* **Processing/Export:** Set default filename to storage filename if empty ([56a0417](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/56a0417c86d68735eb323d5b795974bc24f5f35f))
* **Processing/Extractions:** Store extracted data to storage only for first integration ([55225a9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/55225a95f80f06304d5d74c1032fb33d19ad5813))
* **Processing/Extractions:** Use settings object ([af9be11](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/af9be11d919db1d6d79cae5d7a0bccb41552eed4))
* **Processing/Extractors:** Add sound walk method yield filtered samples slices ([cc123c9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cc123c9a582066a1119feb0b18ed507c7dae630b))
* **Processing/Extractors:** Correctly store persistence value from configuration ([ddaf064](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ddaf0645d13713c465f23d1d7d938f64009ded9b))
* **Processing/Extractors:** Remove useless string concatenation ([e79352c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e79352cc03268ab77f79c8a50495ae94bfcb4514))
* **Processing/Extractors:** Specify the way to add nn extractors ([6273dee](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6273deea96d094353d1f99bf32a03f78a1df0422))
* **Processing/Extractors:** Use `slice_` to prevent overwriting builtin `slice` class ([71b8d60](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/71b8d60c346adaf27018fec11734b40a13041b83))
* **Processing/Groups:** Correctly retrieve file timestamp ([cd13c98](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cd13c9817597a3c773d50452c47fdd6e02ae0629))
* **Processing/Groups:** Correctly set interval limits and iterate over ([31d79bd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/31d79bd21fa7c6520c789df8210efd4a5c9415eb))
* **Processing/Groups:** Improve variable naming ([e7b8f01](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e7b8f0151a11c1be07769b34a7c1f8c529939557))
* **Processing/Groups:** Remove redundant groups_count computation ([16c1fad](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/16c1fadb5a1a661806fe04170844d7f19bd4e005))
* **Processing/Groups:** Retrieve new files count ([1f1e9ee](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1f1e9eeb4fc984a6fda62e25c35d3f10b8345326))
* **Processing/Groups:** Store original interval start ([bcf83d4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bcf83d4321bfd9958d2892a10c361b95d2b6a961))
* **Processing/Indicators:** Improve console output ([1cafc39](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1cafc39be1188ab17a2e995e17e9a327d2cad4f4))
* **Processing/Indicators:** Remove recursiveness ([c53b082](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c53b082e0f71a1f57f185ce4289c33a7f69287ad))
* **Processing/Indicators:** Set correct timer length ([ad43b64](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ad43b64a95a027074dfe1df36e335b4ea9fe376f))
* **Processing/Labels:** Always sort uniques (sets) alphabetically / numerically ([43d4fd0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/43d4fd048e3776e5aec513a6f2d1290602390050))
* **Processing/Loaders:** Move status verification under loader ([5a2128f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5a2128fa3a4ff622fabe83f6aacb29d5285b2d52))
* **Processing/Loaders:** Remove builtin shadowing ([94795a1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/94795a15820f59f2542b3a38ec107331fbce7723))
* **Processing/Loaders:** Use sound slice start and ends as keys for spectrograms caching ([d36b18b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d36b18bf01fccc32ba65d36ac8750ca5940ce88d))
* **Processing/Matrices:** Fix typo ([9d763c4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9d763c4bc69930a8f83ba1036b1a6d86477ab1d1))
* **Processing/Matrices:** Remove recursiveness + Various ([cdb12ac](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cdb12ac9905de2ae8dbc4b7b18a8ecc537bfedc4))
* **Processing/MeanDistancesMatrix:** Move under common module ([e3fda9e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e3fda9e8af46d050cd53c16940e76fbf31df3ad6))
* **Processing/Menu:** Improve wording for digests ([f45a52d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f45a52d736016888a9073c60e660e3f2e66663cf))
* **Processing/OverlapMatrix:** Fix overlap typing ([4fef3b0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4fef3b0c445f6e0b6268ea7e7a0ec3291444178a))
* **Processing/Pairings:** Remove recursiveness ([4570dba](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4570dbab2767e91c47f7883d4517d214be134b56))
* **Processing/Reducers:** Improve console output ([e287bdc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e287bdcc2cd12cd9613fbe52ff121932f1d04789))
* **Processing/Reducers:** Remove recursiveness + Improve console ouputs ([6eb8735](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6eb8735828e878b1b07447cbd0d0299f775172ce))
* **Processing/Storage:** Adapt grouped meta values read to new grouping timeline strategy ([e15bf55](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e15bf55a6c3ffff8e4e15241d86ab0ecd3a5979e))
* **Processing/Storage:** Add type return for `read_config_trajectories` ([11814e2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/11814e2e39c06ca4725d2510f370ea154baf569d))
* **Processing/Storage:** Merge implicitly concated string ([f5ec8ba](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f5ec8ba8a19c6a2b66820d1fe2858b10ce908795))
* **Processing/Storage:** Remove builtin shadowing ([714e481](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/714e481fd413f387e0bb0d924d916ef5c9e82c41))
* **Processing/Storage:** Remove dead paths in storage ([5c42030](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5c4203056454e0141bb6e17c7b871c014a55330a))
* **Processing/Storage:** Remove unused method to compute old group counts ([633fcc1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/633fcc1f8be9fc4fcb202b18a745061a810bbe70))
* **Processing/Storage:** Save flat version of `files_durations` dataset ([bdb8607](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bdb860778b8d3a29a775409290759d0d367055ee))
* **Processing/Storage:** Set correct audio path for docker environment. ([2cf87ff](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2cf87ff4a8655c948e008bf0a2f39b888066f668))
* **Processing/Storage:** Use consistent naming for files related methods. ([c88dd50](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c88dd50a736b06a202b94d987724b90863d1e7ee))
* **Processing/Storage:** Use identical enumeration for storage paths ([2663c23](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2663c23431fe1e2cfacd5ed2c4d1d64e1efeae62))
* **Processing/Storage:** Use seconds for `Integrations` ([f53dbb1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f53dbb1f5ebd8d74df3dedf0af3bd62a36254546))
* **Processing/TimelineWalker:** Correctly compute block data start to pick from file data ([cd227e4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cd227e4747a33f47c9d32124806676ab2264e235))
* **Processing/TimelineWalker:** Handle extractor offset and step when getting block data ([bf4d6b2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bf4d6b275b1c73ffdc7645968af4b4d8289e059c))
* **Processing/Traced:** Add storage helper for deletion ([67080d2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/67080d29af1e679cd76ffcedefc0294b74621c54))
* **Processing/Trajectories:** Adapt configuration and storage reconstructs to numbers and not strings ([fd371d9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fd371d9535a86b08ca240834493d57d94bccdedb))
* **Processing/Trajectories:** Correctly feed features to trajectory algorithm ([899e77d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/899e77da44e31352ab23f7eccd8d3ec67ca01620))
* **Processing/Trajectories:** Remove commented class variables ([b4c5b44](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b4c5b442554970a2b729ee2b1cd59f40ecb51fee))
* **Processing/Utils:** Add optional flatten flag to dataframe to list converter ([9beb3ff](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9beb3ff269f35f949095d43e7c95aebafc172598))
* **Processing/Utils:** Add typing to reverse array helper function ([7fde12d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7fde12da691052cc4bafb053549597c075a47aca))
* **Processing/Utils:** Add typings for menu prompt ([fc19361](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fc19361c02a07b7f66c7188499f82c151f4a3289))
* **Processing/Utils:** Improve menu choices ([a31860b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a31860b83e4c7a01867b97f5cf98bef10c959a72))
* **Processing/Volumes:** Remove recursiveness ([ef12316](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ef1231628feaaf555dbb6bc82de1cbba21037a6a))
* **Processing/Volumes:** Remove unnecessary dataframe conversion ([fde2b87](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fde2b87ecac04dd254cc0ace1c343c7d9e7f4471))
* **Processing/Worker:** Remove dead code ([fde585a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fde585a8dd1ff9fc8ff613a832369a5c5eeba874))
* **Processing:** Actions now correctly deletes all unwanted paths in storage ([487b779](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/487b779e5268fd4f3a9c962035b7d1db3f0784df))
* **Processing:** Handle audio files of different lengths ([1ef29ec](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1ef29ecd6f8e5c13ab6db585d3198510b1139b8d))
* **Processing:** Improve CLI and actions + Remove old pnpm commands ([15838d2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/15838d2563f81539e4a2343e0bfbadf41041c000))
* **Processing:** Move mean distances matrix out of storage + Improve code ([2a4e4a5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2a4e4a57281f557b0e95dcf1a1881c6333fdc8d9))
* **Processing:** Remove `pnpm process:indicators` command + Update readme ([8831c2c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8831c2cd7ae2d1f35653bfd6dfa36d525eb7172d))
* **Processing:** Retrieve correct part of file features + Remove group durations + Rename group counts ([cfde5ef](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cfde5ef62341b01cdbdd2911dc34de4297812542))
* **Processing:** Rewrite groups enumeration due to different audio ([a39e9fb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a39e9fb5a82db1e2a623b5aa2e98df61f1c68cad))
* **Processing:** Upgrade `hdbscan` to succeed builds ([777ca3b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/777ca3bf8fadf37179c43160e95c2c856ff55393))
* Set new storage paths everywhere + Remove old ones ([f37fc90](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f37fc9095bbed0cddd7d48a192dce6943407d5cb))


### Features

* **App:** Add `dev:audio` pnpm command ([854c5bf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/854c5bfe457b4cdcc6338d395164e64b218b9e9f))
* **App:** Add installation procedure to README + Add utility scripts ([a5fa1c3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a5fa1c39b498f937c0578ada042c9b19b511f1a0))
* **App:** Change default ports to 5530 (front) and 5531 (audio) ([d839913](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d839913155d221480661374c307a11dbd21df2ee))
* **App:** Update `pnpm` commands ([f4f38a7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f4f38a7f95775539469425510e936c645b6e0d71))
* **App:** Update `pnpm` commands + Update README ([ae6cf64](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ae6cf64f372bc9c1db2ed559c271d38fbf89bad3))
* **App:** Update pnpm lockfile version ([f9505d2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f9505d286b1177605314010907a6c541d0673e45))
* **App:** Update README with `Front` and `Audio` endpoints ([24ea439](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/24ea4395b46a1c89b098b30a4b89aadfd50dafc9))
* **App:** Update README with Docker with CUDA documentation ([668ed70](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/668ed708866ac87162805fe6f8e306cb16b51a72))
* **App:** Update README with testing scripts for Windows ([def4b60](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/def4b60e12b7514bc24c06710cb39dc538f98641))
* **App:** Update v8 migration `pnpm` command + Update documentation ([51431f6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/51431f6f7655edfde576fb27f423da967e3ef95e))
* **Bin:** Add utility to set python path for UNIX systems ([c9d0e1d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c9d0e1d6761aaf954eda03aeab92bef357420f19))
* **Bin:** Add utility to set python path on Windows systems ([f928df7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f928df7d750d5eb792dacd6015c22618ab922ab8))
* **Config:** Add new `Trajectories` tab ([47cce23](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/47cce231ac98b69e4567e50be8f273dba810fc1b))
* **Examples:** Add coral reef campaign example ([afac5aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/afac5aa59760c5620ad38a57a833c7a875688d3f))
* **Examples:** Update template configuration file ([04f6c8b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/04f6c8bf8291fb749412175a614215f41fdffc72))
* **Front/Aggregated:** Read aggregated indicators ([89d1d06](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/89d1d06600d040c09f031651bfc17471a9268244))
* **Front/Audio:** Add current audio file path ([cbb3a81](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cbb3a81ddef9d8f8252f1f600023225e18c484af))
* **Front/Audio:** Display resulting Hertz ([48b4930](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/48b4930a2b417902607cfb00d9a4fee8cdff952c))
* **Front/Audio:** Use new audio block from interval details ([109e4c6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/109e4c682beb1765323f276f8636dc9ea3fa1fc1))
* **Front/Colors:** Improve cycling day colors (morning/afternoon distinction) ([828d8ea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/828d8eaefb2794b9555be777bc35715ecfcc3079))
* **Front/Details:** Add interval block details as tooltips for player buttons ([f4794cc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f4794ccde9e1cd493ed01037bdacd9600451a287))
* **Front/Digested:** Display digested data ([d071d31](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d071d3179f16a7b9946038a70b7ac267d1d1dcf2))
* **Front/Export:** Add site ([984aa9f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/984aa9fd329938cdc08d3cfc0905f8082080640c))
* **Front/Hooks:** Add hook for trajectories reference ([10c2749](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/10c2749be4476df5d2a609362bec2df8e8bffefd))
* **Front/Indicators:** Display indicators ([6577fcc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6577fcc4b725484d97863df8175dde60cc83b6ba))
* **Front/Indicators:** Replace submit with state watchers ([d273e11](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d273e1138a532b82ae62a8e9defe7f1f393ab96b))
* **Front/Loading:** Add reading details ([77a2367](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/77a2367545639eec1e3a941f08004123bf92f04e))
* **Front/Menu:** Rewrite `Menu` items with dynamic background upon active state ([4c30a84](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4c30a84bc21c8edd6cec5f5016c096bd7b5f71b5))
* **Front/Scatter:** Add camera reset button and shortcut ([3954dc1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3954dc16376f06b925fa7a82812ecd0478cc687f))
* **Front/Scatter:** Add navigation buttons and shortcuts to iterate through collected points ([7a9068e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7a9068ea2fc6da3b379533a14fb6ddc6055b807c))
* **Front/Scatter:** Add new `ScatterNew` component using plotly for rendering data ([2ad9e0a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2ad9e0a525e1ddaf7cccacb9600d31d697893b9b))
* **Front/Scatter:** Move to Plotly definitely and remove old scatter-gl code ([6c3ce7d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6c3ce7d19c2a139905d49ef688ff105b1c2dd7b9))
* **Front/ScatterNew:** Add trajectory basic plotting ([bd723ac](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bd723ace583b21f8edbd6d37d7cd9172d5b4db42))
* **Front/Settings:** Add automatic window opening on scatter click option + Improve settings ([3273561](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/327356101f6f14fb1b9d5b06644cf3fbb054c12b))
* **Front/Storage:** Add new paths to storage + Fix group counts ([ca898b1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ca898b160b77c7bd2b1623b6fe5172891c519782))
* **Front/Storage:** Add trajectories configuration paths ([9c0f992](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9c0f99276af348682b270c11f69bdd5c2f850f71))
* **Front/Storage:** Update paths ([01baeed](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/01baeeda969e5b2606771e052c8579fbabbc395b))
* **Front/Traced:** Read timestamps ([e6c198f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e6c198fb1a512dbe491998acaacdb41ede01cdb4))
* **Front/Trajectories:** Add color scale legend ([5390841](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/53908419915e4b828b4728f5fd5407bade7f7142))
* **Front/Trajectories:** Add cycling coloring to fused trajectory ([3d0ee95](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3d0ee9540f0f742dea392f0572c041b398d83849))
* **Front/Trajectories:** Improve coloring and behaviour ([6175d52](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6175d522af9596e2fd20344804b859ca7fb77180))
* **Front/Trajectories:** Improve coloring of fused trace ([85d5dc8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/85d5dc8ae5545961f6966c2532af4433cd168ac5))
* **Front/Trajectories:** Make cycling based on trajectory start reference date ([732f092](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/732f0924cc73e93789217a76690d7726121553ce))
* **Front/Worker:** Add read for trajectories ([3c5b38b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3c5b38baa7b5ea1b2a639a210f6122a95e677da5))
* **Front/Worker:** Front can now display multiple autoclusters ([2fa1541](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2fa1541f37f8613a2bf107c1ce0d503a88123d74))
* **Front:** Adapt to new storage (WIP) ([b697bdc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b697bdcf1dee30cbd23715978b78744d5d2602a2))
* **Front:** Adapt to storage with new group counts ([0c06f8e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0c06f8e64fcff48cba429c488fe687a457cafdae))
* **Front:** Drastically improve performance ([f4ca491](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f4ca49179de1bacc795bd4c2e64d83efee42a08a))
* **Front:** Improve coloring behaviour ([cff038c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cff038c49a227eeae337b7a0efdc768c7faca35b))
* **Front:** Improve indicators behaviour ([557924b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/557924b81136731c40bb11457bfe05c72e8054e0))
* **Front:** Improve menu ([253eb08](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/253eb080347f6275fbcd2ff165c0b02da9235f68))
* **Front:** Improve time filtering performance + Clean old code ([0f42961](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0f429612f75467e461caa7bcc3cad1860f8eeeab))
* **Front:** Improve window behaviours + Update `vueuse` ([02c638f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/02c638f3b7c78d5feba349d43348f0f53a73ce5e))
* **Front:** Upgrade all dependencies to latest (except three) ([9a45e91](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9a45e917c31613213dbffdd2066afb5eef4b9b49))
* **Front:** User can now change `audio_host` ([66a1671](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/66a1671bc08f0355c5150130956d0afc574de712))
* **Processing/Action:** Adapt `reducers` action to new settings ([eb01b2e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb01b2e07b5f2b1f8ae473ad161822d747c93db4))
* **Processing/Action:** Adapt dataframe export to new autoclusters ([7f4a583](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7f4a583d2b6c032106aa4a9b1ef80bf4a60e997b))
* **Processing/Actions:** Add all ([0fad59e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0fad59e8663c8b517947c70cad2210e502f0a26b))
* **Processing/Actions:** Add autocluster ([b0ac2ab](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b0ac2abefc191cfa7f9cfb2ad9d0502040531cb4))
* **Processing/Actions:** Add computation requirements + Add autoclusters and trajectories draft ([0e7458a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0e7458a44c26afd1e98736bdffed6b1cc38be5f3))
* **Processing/Actions:** Add computation requirements purge ([9da128a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9da128af97e4103f2fc1310b5fc4b2477a09dc4f))
* **Processing/Actions:** Add new export dataframe action + Various improvements ([c57dac9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c57dac96e83bae20db16a3d44badf81dbb0cb2c2))
* **Processing/Actions:** Add new trajectories ([3ec8314](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3ec8314e5ce0754fdaa1dad10efa12818f43f3ea))
* **Processing/Actions:** Add pretty configuration print ([d1bc816](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d1bc8163fb316a286b2aac31098faeff3e2e1852))
* **Processing/Actions:** Add reductions ([c50be6f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c50be6ff6823e8f9a25f06d9396a0c21f8bb862e))
* **Processing/Actions:** Ask user to replace old storage file with new repacked one ([f57a004](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f57a0044166eb2e1ad600e4ed03c36f69b0df5e4))
* **Processing/Actions:** Change dataframe action flag from `output` to `csv` ([025e2ea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/025e2eabfa78c47fea4e98ef6ae2966020801a85))
* **Processing/Actions:** Improve CLI output ([407e13f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/407e13f6cf1ce0d3f3f8d6bcacd28135a9e24a90))
* **Processing/Actions:** Print action starts + Improve printing overall ([070e49c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/070e49cc6675bd5beaa4f06743e7b9653e23c436))
* **Processing/Aggregated:** Store blocks details (timestamps and file paths) + Add storage helpers ([9114008](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/91140086f6e5f8456d643da5070b8a3aafe3d051))
* **Processing/Aggregations:** Store relative site and file indexes for aggregated data ([4b0e894](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4b0e89429a338e9f7004cf2b9275e9c8e2c8c4b8))
* **Processing/Clusterings:** Add factory class with validator ([8cd5908](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8cd59085e2c59787c5097ea8470d4aa8e8fe2b76))
* **Processing/Config:** Add `Autoclusters` tab ([18d4026](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/18d4026efa016ae66aa93f6c63c2b32e18ae1348))
* **Processing/Config:** Add configuration object for metas ([9ab3f58](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9ab3f586eefacbbe6a11ca9e64add90308e280cb))
* **Processing/Config:** Add existence check in storage ([3c77c86](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3c77c8679d3fa426d05db8669900098e350cac3e))
* **Processing/Config:** Add new `Digester` objects ([a16cb49](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a16cb49db9bb923bff9eb1bf45dfe090640c9c3f))
* **Processing/Config:** Add new computation UMAP settings + Remove ([267ad5b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/267ad5b8c11db42167329a1f649ce44c3b28c07a))
* **Processing/Config:** Add storage retrieval of labels ([d9c121f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d9c121f592e9f90b27907d96e0d3fc9cbebd1e85))
* **Processing/Config:** Allow empty lists in extractors tab ([c7cdb08](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c7cdb085fb19ed8a30186b9325c11970b8c0591c))
* **Processing/Config:** Bump version to v10 ([7191c61](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7191c61f01cd00f108d4a19fa36149ebf45123ff))
* **Processing/Config:** Digest new settings + Improve documentation (Help tab) ([ca4cdf0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ca4cdf0baeece821b93a5b48d6de6601600593ac))
* **Processing/Config:** Use `label_` as prefix for labels in files ([738f70c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/738f70c3272ebc99b72a31a1414eaae524366515))
* **Processing/Config:** Use ISO 8601 standard ([3a92974](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3a92974627c6bba5063cb6d8bac0b72208b49554))
* **Processing/Config:** Use new `audio_path` setting. ([43df9f0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/43df9f0f7ce09efc0d60cc609981eafecfa462d4))
* **Processing/Digesters:** Adapt to accept pairings ([6a4adf6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6a4adf60eed8b71d174a7eddf4825aed818c43b1))
* **Processing/Digesters:** Add `Matrices` as `Digesters` ([ab7677b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ab7677ba6d67f02a330280f39a8138b346ecb3eb))
* **Processing/Digesters:** Add all old `Volume` as new `Digester` ([e61c3db](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e61c3dbc9afe426467edef003e8ddcbf0a1e1e72))
* **Processing/Digesters:** Add contingency pairing as `Digester` ([576b4ac](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/576b4ac0595cabe652fc091e8eb8422c99db8b37))
* **Processing/Digesters:** Add full action ([fd92e1b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/fd92e1b8b6a074868cc6910748f73ba313792a17))
* **Processing/Digesters:** Add new action, objects and storage helpers ([adb56a6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/adb56a6b2a0765d9a28d75c8bfec7925f1648d4d))
* **Processing/Export:** Add site ([019931a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/019931a0e852310659fb11ec57d55d2f5943dba7))
* **Processing/Export:** Export all reduced and aggregated data ([0f313ff](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0f313ff0e9a2d893c902cd6c46dba82e4ac682f7))
* **Processing/Extractions:** Store aggregated labels + Improve `Extractor` instanciation ([22787aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/22787aaa191a8411a9bde80987397a81dba0d35c))
* **Processing/Extractors:** Add `aci` ([b58722e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b58722ecc7a3cd7a4181439e80291528e75d1214))
* **Processing/Extractors:** Add `adi` ([55f55fe](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/55f55fea3245af7fce089b8a891ad38ecceae67a))
* **Processing/Extractors:** Add `bi` ([2103a29](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2103a29db6b6e6160de69e6c9fbf604ae1539dc2))
* **Processing/Extractors:** Add `ExtractorConfig` and `ExtractorStorage` ([56e0cc1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/56e0cc16761a4fb1d7f5c16b3e2f4bef075ae71b))
* **Processing/Extractors:** Add `hf` ([a2a3ff9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a2a3ff96d6a9deb9952d2cc93adc123d02c074fe))
* **Processing/Extractors:** Add `TemporalMedianExtractor` ([22c6a97](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/22c6a97e1d73a0aa4b8ee10ce5c229e6afbae7e8))
* **Processing/Extractors:** Add temporal entropy extractor ([c9b9a9d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c9b9a9d1b4c96a4a7dcb50487296a1f7b432fc86))
* **Processing/Extractors:** Instanciate `Extractor` objects from configuration in storage ([e05d106](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e05d10683bd5d6870159255f3205717272677b2e))
* **Processing/Extractors:** Write timestamps to storage ([dc391ce](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dc391cea971c69554c0fcf6f593c8cbbef7a7639))
* **Processing/Files:** Store groups count for each file ([2636eb2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2636eb2041c8bc888bf43769f4a2cbd977b4008f))
* **Processing/Indicators:** Adapt to new groups and timeline strategy ([ca1c41b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ca1c41b79373ff11c93bde54e1f9b4d5d332e9b6))
* **Processing/Loaders:** Add filtering at sound loader level ([0a47a60](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0a47a60f4ece702ee75d90db12bb3441b5cdf8ef))
* **Processing/Menu:** Update choices + Add `digest` action + Add separators ([c585dfc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c585dfc5cf951f27992dea359ea4d58789cb2325))
* **Processing/Storage:** Add path for trajectories + Improve documentation ([b251796](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b251796b12876e803d4e9d4c932337485defc884))
* **Processing/Storage:** Add path getters for `AggregatedReduceable` ([8490c14](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8490c14050ab1ebf3cad339351cb11bedcf95763))
* **Processing/Storage:** Add point indexes counter and enumerator ([16213ad](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/16213adb693eb1f514d8a27afbbd557e8e9ab2fb))
* **Processing/Storage:** Compute group count if first file enumeration ([4910dc4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4910dc4510f0556c9f94d67770dbd0ed6c1818b6))
* **Processing/Storage:** Remove groups count upond files deletion + Rename method ([44a2604](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/44a260434e763b0a760ebc5f54afb650cba7440f))
* **Processing/Storage:** Store new files groups count values + Improve ([84ef33e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/84ef33efe9a229ba13e5ceb075e41cf0e61f53d4))
* **Processing/Traced:** Store timestamps + Add storage helpers ([d8c4211](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d8c42112f183197bbddf3854bfc108ca30c6fe17))
* **Processing/Trajectories:** Allow monthly traces ([a8fde81](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a8fde81b8ad6b9c53a369ff15b558048ef2d7366))
* **Processing/Trajectories:** Implement `ContinuousTimeTrajectory` ([1eb381c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1eb381cd2da0cca7ac4a835077b1d12d530fd85d))
* **Processing/Trajectories:** Store and display multiple trajectories ([1b20e32](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1b20e323b4c8064f3ec9795548d77dceefc8d1e7))
* **Processing/Trajectories:** Trace for specific label property/value + Store relative timestamps ([1985653](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/19856537b1b43d2b3b046de9a87f69f6a18babcd))
* **Processing/Utils:** Add console print helpers ([4244959](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/42449593c044b28aad1c3dc200f8e27583f941f2))
* **Processing/Utils:** Add new console print helpers for digesters and labels ([dc0b692](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dc0b69248e9f09196a4c846417dce2cd8bc91f90))
* **Processing:** Adapt timeline strategy to sites instead of files ([710f25a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/710f25a19273d7b4ccb834ac09ce00476b9b4e9d))
* **Processing:** Add `ndsi` + `Spectrogram` + `SoundSlice` ([d04a7a6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d04a7a669f8a25051cecf475c1842ceaa4f1a39a))
* **Processing:** Add `timeline` strategy grouping ([708429f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/708429f539e68d050d535e94addd17d496be1e37))
* **Processing:** Add main CLI action (WIP) ([a2d59c3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a2d59c30a38658473be399fdd74b571a879ff5bb))
* **Processing:** Add main entry file to inject PYTHONPATH if necessary and route to requested action ([b7d60e0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b7d60e09b3ef5b63ace7b930fff26bffdbba0482))
* **Processing:** Add new `Trajectories` configuration option ([4b5fa5d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4b5fa5d8cf4eb150bebd2b71c305078efbf852e2))
* **Processing:** Add new computation steps ([b7566d8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b7566d845927bd341d5a0552249c3eb9009c0ffc))
* **Processing:** Add SIGINT handler + Remove singletons for `Config` and `Storage` + Use callbacks in actions ([5aa1222](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5aa1222de2d1eef3595e9eaccc2aabd4cab5ea4e))
* **Processing:** Add template `sse.yaml` file ([79c23f3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/79c23f34e1055e654ed532dc47f960b4b707b02c))
* **Processing:** Add timeline extraction + Misc ([7b6b910](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7b6b910fa900cad360680767379ba526d85c1e5a))
* **Processing:** Allow user to pass any `yaml` file ([55f4132](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/55f4132fd835b44a7ff4f79e2776bd69c2c16eb8))
* **Processing:** Improve CLI console printing ([4d78d3e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4d78d3e16f1f757cdebd809b8a4a940b41879d16))
* **Processing:** Pass configuration objects around + Add various QoL ([676c6dc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/676c6dc52b923dfd6a7e0d69b74211f36366f0d6))
* **Processing:** Replace `soundfile` with `pydub` dependency ([28a24d7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/28a24d7330b2c724e63517584980e31ede9d6ed2))
* **Processing:** Wrap application in traceback pretty printer ([31a7ca2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/31a7ca21628b829999df2dd8ed63e00f2430ec1c))
* **Storage:** Add aggregated interval details ([a25e578](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a25e5783f4d5c621f39f2043b8a513f1bf76e124))
* **Storage:** Add new paths for trajectories configuration ([155e85b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/155e85b957230a0a1a91a63762615d779d0b326f))
* **Storage:** Update storage paths for aggregated sites and blocks ([089e161](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/089e1612ce555ad9fbff331388f66f1097f8817f))
* Update repository dependencies ([cb17bf4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cb17bf4a3080d7b5f8e137be013543e667275077))


### Performance Improvements

* **Front/Hooks:** Remove matrices hooks ([3c208b1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3c208b1ca3bae9a1d4c92ee3326ddf5ddb859728))
* **Front/Hooks:** Remove unused hook for trajectories coloring ([ace0e32](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ace0e3202b3e853ac4f389b6a3a773d04ed378b0))
* **Front/Hooks:** Use configuration object for ranges and reducers ([6c9f22d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6c9f22d84f342c34d22bcd0e9e879f74a90a0f7a))
* **Front/Hooks:** Use configuration objects for band and integration ([cbc18d9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cbc18d9021012b1770661bd32f3dd36fa5d624b2))
* **Front/Hooks:** Use configuration objects for files ([94c7c1b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/94c7c1be0a5d523556663a46f438be7bfea257d6))
* **Front/Import:** Sort imports ([e9d3e7a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e9d3e7a2898c5f768c4b9af83ce630b29f253313))
* **Front/Pairings:** Improve references' default values + Improve conditional rendering ([6ee19f6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6ee19f640942fd3196b8f814e4d4f844cae7b3e7))
* **Front/Scatter:** Improve reduced features and trajectories tracing ([4bc3b5e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4bc3b5ee0ffaaa46cde6449dba94babc2e9fb863))
* **Front/Storage:** Simplify storage load component ([8945979](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8945979473d84f9e15c29afccc72f495973c6a75))
* **Front/Time:** Remove old TODO ([43dd666](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/43dd666d3d0e7598361be57baf33264acd4808ab))
* **Front/Worker:** Remove unused unmount lifecycle ([70371c5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/70371c5fa359f28ea3b2f5e2d40db3401707c13f))
* **Front:** Remove `three` package ([8fd715a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8fd715ae29a9b0c9d5510d6cf8020e5fa012021d))
* **Front:** Remove three from vite bundle splitting ([57b99f5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/57b99f524e6d31b0915463022bafe54e539a1e9b))
* **Processing/Actions:** Add configuration check before running extractions and aggregations ([4737b68](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4737b683973a8b70677ea4d5e00fa340a55a8ee6))
* **Processing/Actions:** Improve configuration refresh console output ([e4ccfea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e4ccfea932f392f7ea0dd4263f54f8d306ca01b6))
* **Processing/Actions:** Improve consistency between actions (deletions, config retrievals) ([9ed1b97](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9ed1b97a790f848931de22197d8bf60de15cb137))
* **Processing/Actions:** Improve extractions and aggregations console output ([1a978ac](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1a978acc6c05633a583c0209f9bdd3a97180f94c))
* **Processing/Actions:** Remove old main entry file ([a6c5d33](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a6c5d3386a53cc6b6afc0af52b259e26a495b9d7))
* **Processing/Actions:** Use enumeration method to iterate through bands and integrations ([23397f7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/23397f7bc4ec0cc70ab0e8d432bc4a02949264b5))
* **Processing/Actions:** Use path getter during reductions ([4a9438f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4a9438f2eea2b82534ec8c5b68af849128e5bc50))
* **Processing/Action:** Use already created variable when repacking ([f93734d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f93734d4e674527245482f395d60d85036e6d15c))
* **Processing/Autocluster:** Merge logic for serialize/reconstruct ([cc76319](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cc7631976ef545ab625b1f74cae7e7ff15028ac8))
* **Processing/Clusterings:** Remove recursiveness ([751c4f1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/751c4f17069e7526f508c74783e0618acb07a33a))
* **Processing/Config:** Add `ConfigParser`, `FileConfig` and `FileStorage` ([36342cc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/36342cc6b3d7523607704dede261a22047a3a13a))
* **Processing/Config:** Improve metas parsing ([17a1370](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/17a1370213493e63b5993181f51a4f8f677dd6f8))
* **Processing/Config:** Rename `Site` to `ConfigSite` ([9695576](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9695576fa0973f876f0b3dea80024db16b50504b))
* **Processing/Config:** Rename column parser method + Rename Extractor columns enumeration ([d302f7b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d302f7bba30a11e817cd8684ae6ab08bece58da8))
* **Processing/Config:** Reorganize folder structure ([d5e5c38](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d5e5c38ef7ef90f116e7ef3e68eaaed6aebe2735))
* **Processing/Config:** Use `AutoclusterConfig` and `AutoclusterStorage` ([cbc906c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cbc906c3433d9f33b140c1b70b67661f888e697f))
* **Processing/Config:** Use `BandConfig` and `BandStorage` objects ([53d697f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/53d697f4d5937d0bf06a16188ee09a209a454ccf))
* **Processing/Config:** Use `Indicator` objects ([0961c8c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0961c8c77651c2f0f443d0024d37bad5bd1c07fc))
* **Processing/Config:** Use `IntegrationConfig` and `IntegrationStorage` objects ([2f6ae09](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2f6ae09f9015389a9f88e8ec4d60398e3399f6c0))
* **Processing/Config:** Use `LabelConfig` and `LabelStorage` ([0afa465](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0afa465877323be48f40c2f15749a499afd04f8f))
* **Processing/Config:** use `Matrix` objects ([5c731e8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5c731e836c3388f4ecf06b7ee3db37ab48ef4076))
* **Processing/Config:** Use `Pairing` objects ([6da54dd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6da54ddfd6382f21063578b872147331143bfefc))
* **Processing/Config:** Use `RangeConfig` and `RangeStorage` objects ([443d04b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/443d04bed643b9bd9da607fbb9e8519b37e58dcf))
* **Processing/Config:** Use `ReducerConfig` and `ReducerStorage` ([8fadb61](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8fadb61bdde0dc86af746fa12805ea1f48e4656b))
* **Processing/Config:** Use `Settings` objects ([d1c4172](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d1c41725e3a2fd9932096f2c94b42dc473a15337))
* **Processing/Config:** Use `TrajectoryConfig` and `TrajectoryStorage` ([016aada](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/016aadacdb939843cd55fe9a5c32ed9aeccfecf8))
* **Processing/Config:** Use `Volume` objects ([7f04b0a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7f04b0a64dcea0cbf66c6fd23547c4d46fe4fad1))
* **Processing/Config:** Use append instead of unpacking operators ([610b1e0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/610b1e01edfc9ae35fd8983a2765fd1d00478fe9))
* **Processing/Indicators:** Remove dead code ([eb0b54d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb0b54d3cbbf5a01326ce0bb26c47b938f5e5173))
* **Processing/Lib:** Transform TODO to INFO annotation + Apply code style ([9d30df0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9d30df0151c9230a714103f5f47fda3a1ce35e57))
* **Processing/Loaders:** Remove filtering dead code in `SoundLoader` ([a66c1a4](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a66c1a480767a21e7ba4ccdb1d91c5c5813f2fcb))
* **Processing/Pairings:** Improve console output ([c84caaa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c84caaa693d4442001e00f5dc2cddf51ef88caa1))
* **Processing/Pairings:** Remove unused import ([cbd4f98](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/cbd4f98fbce7bbb8d25c4b08d71460d417e9e767))
* **Processing/Prompts:** Improve CLI prompts ([464ba42](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/464ba42d027684591776771bfe99fe9a3b2fc1a6))
* **Processing/Reducers:** Improve factory sets of available names ([ea79e5b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ea79e5bd3013970181ef9c518c1dff316591683b))
* **Processing/Storage:** Improve method naming ([c7c9930](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c7c993021c36c6556f9c5466b9672c6c730f1416))
* **Processing/Storage:** Remove dead code ([09f30c1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/09f30c1c9c4c206d819c2d7f0e53ce4f0fd680c7))
* **Processing/Storage:** Remove dead code ([bc40f92](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bc40f9272c8efed745d09f9e0ef7cf6ebfd93898))
* **Processing/Storage:** Remove dead enumeration ([3aae8e3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3aae8e3e9cad9aecd7ac5c535a8b541b1f4f266e))
* **Processing/Storage:** Remove unused method ([5e4a754](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5e4a754ce333e9287b81f68a0cc57c0aabb43a6a))
* **Processing/Storage:** Remove useless console printing ([8c406d8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8c406d82af952c493b5de96a5bdd6cdf2bac9f1f))
* **Processing/Storage:** Use helper to walk bands and integrations for aggregated features ([7510e47](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7510e478b52dafa4169ba0969174fb39671072c8))
* **Processing/Timeline:** Create `TimelineWalker` ([ff20154](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ff2015472162a7f850330ac7629be29a81b853d4))
* **Processing/Timeline:** Split `TimelineWalker` into methods ([7ecb6b1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7ecb6b111e99fc01af4fcff5f54307a5d58c3f93))
* **Processing/Utils:** Improve file indexes by site console printing ([82f39ab](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/82f39aba4a4f59fd5dc71fe184b86a6d5bb1abcc))
* **Processing/Utils:** Remove unused get unique helper function ([8f2ccc1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8f2ccc19fe553d256d9823168326f6b90b346856))
* **Processing:** Purge old code when app was not writing incrementally to h5 ([ffcbed5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ffcbed510a5e03f738d8eed67c11b5707a8e11c5))
* **Processing:** Remove `Pairing` dead code ([1613464](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/161346417162c83d38d8d11c4b1e3be7b23366f3))
* **Processing:** Remove `Volume` dead code ([ecf6fef](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ecf6fef9d914e8135f6fc0b6f6902abd4b781373))
* **Processing:** Remove dead matrices code ([0b52a03](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0b52a03981e9aaa7a137d25c16583d6e403f87a0))
* **Processing:** Remove dead v9 code + Move common files ([b0e1350](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b0e13508946e510851bc72da573a194132d48a1c))
* **Processing:** Remove merge artefacts ([d2ff9c5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d2ff9c5edab9fde7b2070c5773f5a85e23dec0ee))
* **Processing:** Remove old `Indicator` code ([d0c4f99](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d0c4f9937096e19b23f78780173382e2c0d49a5f))
* **Processing:** Use `SiteConfig` and `SiteStorage` objects ([75aa9bf](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/75aa9bf4393456b6bee8949aa9daddd6dd7c666c))


### BREAKING CHANGES

* **Storage:** Storage paths have been updated for aggregated sites
and blocks details
* **Processing/Config:** Labels in configuration's files description must now be
prefixed `label_` instead of `meta_`
* **Processing/Digesters:** Path for digested data has been added to storage.
* **Processing/Actions:** Reduced data path has been updated in storage file.
* **Processing:** Add `yaml` configuration file for processing environment
* **Processing:** Paths in storage have been changed.
* **Front/Storage:** Storage paths have been updated
* **Processing:** Storage has now new paths for referencing file indexes
to their respective site index and site indexes to their respective
group index.
* **Processing:** Excel configuration storage has now a new setting
`grouping_start`. Also, the nature of `Groups` / `Aggregates`
/ `Integrated` features have been changed due to `timeline` strategy
implementation.
* **Processing/Trajectories:** Processing storage path has been updated.
* **Processing:** Storage paths have been updated.
* **Storage:** Storage has new paths
* **Config:** Excel configuration file has a new tab.
* **Front/Storage:** Adapt front to new group counts path
* **Processing:** New actions have been added and autoclusters action has
been modified.
* **Processing/Config:** The configuration file has new settings and some old
settings have been removed.
* **Processing/Config:** Configuration file has a new `Autoclusters` tab
* **Processing:** `Processing` dependencies have been changed.
* **Processing/Storage:** New path in storage `/files_groups_count/{INTEGRATION}`
* **App:** `Front` module is now served to port 5530 instead of
8080.
`Audio` module is now served to port 5531 instead of `3000`.
* **Processing/Config:** Configuration settings `base_path` and `audio_folder`
have been removed and replaced with new merged `audio_path` setting.
* **Processing:** Audio file lengths are now stored in h5 under
`/files_durations` path
* **Processing/Actions:** `dataframe:csv` command has been changed.
* **App:** App commands have been changed.
* **Processing/Config:** Configuration file has its version bumped to upcoming
v10.
* **Processing/Config:** Configuration file now uses ISO 8601 compliant dates

## [9.1.5](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.1.4...v9.1.5) (2023-06-26)


### Bug Fixes

* **Processing/Dataframe:** Compute group attributes on the fly if missing in storage ([5231cc9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5231cc9debaf62da126c3b3c54dee1a02641a8ba))

## [9.1.4](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.1.3...v9.1.4) (2023-06-23)


### Bug Fixes

* **Processing/Extraction:** Add back `files_count` and `seconds_per_file` attributes ([489bd84](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/489bd84d253097149dba8db58249a0e1222108af))

## [9.1.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.1.2...v9.1.3) (2023-06-23)


### Bug Fixes

* **Processing:** Add incremental h5 writes for file features extraction ([b4b81be](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b4b81be28ef26e041a205029b457ebed84fbe384))

## [9.1.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.1.1...v9.1.2) (2023-06-23)


### Bug Fixes

* **Processing/Actions:** Exporting dataframe has optional autocluster and reduced data ([7f4ea81](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7f4ea8154e7f3ded169d9aaa2558a8f858b466c2))

## [9.1.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.1.0...v9.1.1) (2023-06-22)


### Performance Improvements

* **Processing/Groups:** Write to h5 after each integration to avoid memory limit errors ([d054de5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d054de51245f3fe2de1691c72cdd1c8a5e91b098))

# [9.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.0.0...v9.1.0) (2023-06-22)


### Bug Fixes

* **App:** Dummy commit to increment semantic versioning ([8b10b68](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8b10b6899c3c869e3f0ae577b3090f974cc345a6))
* **App:** Dummy commit to increment semantic versioning ([eb8b1f1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb8b1f180f06e36c714c00ce2a837d7f97b75cf2))
* **Processing:** Fix typo and set correct version for files feature extraction ([6bf94e5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6bf94e595283ac5a42355082142ad555d2c44c93))


### Features

* **Processing:** Add v9 files features extraction command ([dbf57aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dbf57aaabb8650777ca669b615bf28f8f7206b6a))

# [9.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.0.0...v9.1.0) (2023-06-22)


### Bug Fixes

* **App:** Dummy commit to increment semantic versioning ([eb8b1f1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/eb8b1f180f06e36c714c00ce2a837d7f97b75cf2))
* **Processing:** Fix typo and set correct version for files feature extraction ([6bf94e5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6bf94e595283ac5a42355082142ad555d2c44c93))


### Features

* **Processing:** Add v9 files features extraction command ([dbf57aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dbf57aaabb8650777ca669b615bf28f8f7206b6a))

# [9.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.0.0...v9.1.0) (2023-06-22)


### Bug Fixes

* **Processing:** Fix typo and set correct version for files feature extraction ([6bf94e5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6bf94e595283ac5a42355082142ad555d2c44c93))


### Features

* **Processing:** Add v9 files features extraction command ([dbf57aa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dbf57aaabb8650777ca669b615bf28f8f7206b6a))

# [9.1.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v9.0.0...v9.1.0) (2023-06-22)


### Features

* **Processing:** Add v8 files features extraction command ([2572f88](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2572f88d1afd3f0efc67043fe5b7988ab547c73d))

# [9.0.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.3.4...v9.0.0) (2023-05-30)


### Bug Fixes

* **CD:** Fix typo in release github workflow ([776094f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/776094f60021b56550c2bf884fe2647885b9bd9e))
* **Front/Audio:** Add wav file extension to audio slice download ([1905de8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1905de8837d25a72eb2283002765634aad107384))
* **Front/Audio:** Improve reactive spectrogram color setting + Remove dead code ([ae8e108](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ae8e1089ae54feefdf1f40a1c9613d832e30e977))
* **Front/Audio:** Rectify condition for showing player when point is selected or not ([62ff562](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/62ff562c0708121cd25ec133091feab24b2d6dbd))
* **Front/Audio:** Set correct type for audio context ([93bcbb6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/93bcbb64de0376f727e22bfec812ff085285c0ae))
* **Front/Build:** Migrate docker build configuration from `yarn` to `pnpm` ([a5ea808](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a5ea8088874301c4e16483d522389b3cbaed4505))
* **Front/Build:** Remove `@vueuse/components` from code splitting as it corrupts runtime ([b76e047](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b76e0472a302c15a7fcd74bbb69d2dcbb68b4eaa))
* **Front/ColorTypes:** Return default options when meta properties are not available ([f9048f0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f9048f0d2a41135ab45d73098ebf2256188614ff))
* **Front/Details:** Display correct integration seconds ([348e3b9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/348e3b98dcbf960b8b94c225c19f2bdea12f4ec7))
* **Front/Docker:** Ensure safe installation ([7392905](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/73929056e7b05458f9969846c4fe8e4d5194b9b9))
* **Front/Docker:** Use frozen lockfile ([5820b09](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/5820b09062b61b83bd13096170e8de1d83f36525))
* **Front/Export:** Add `pointIndex` and `groupIndex` + Fix dimensions ([e0b8298](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e0b8298b1abbcd4c0903dd1e8186a99affd9480a))
* **Front/Export:** Use grouped filenames ([90b471b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/90b471b054cc54de0c0730ab62dfd645bd24aeb0))
* **Front/Scatter:** Prevent opening `Details` and `Audio` when no point is clicked ([376ad92](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/376ad92d77f05631945319019152bf2159aa697f))
* **Front/Scatter:** Refresh filters before first draw ([3af41ae](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3af41ae0e8b327f4575606c17d2400778185df27))
* **Front/Scatter:** Use correct ranges for file indexes and group indexes ([51e8b6b](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/51e8b6bcaa4caa17fea51990f21b392b1a17fe20))
* **Front:** Adapt payloads between CSV and WAV browser download ([aea7626](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/aea7626e3070428c4424bd511005c5305cd94262))
* **Processing/Actions:** Add console output to action ([2e2f2c7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2e2f2c7def01e4594c58f8a3ce55c230e7327992))
* **Processing/Migration:** Improve v8 migration by adding empty matrices and pairings ([74ff17d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/74ff17d0a3cd4ef846dd51334d9e1db6dcf96d4e))
* **Processing:** Add abstract methods for runtime type checks ([6f09c36](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6f09c3656938d67b46b1bb477fdbb819dcd00d11))
* **Processing:** Add missing `self` to abstract methods ([432f158](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/432f158078b7fab6e15c5da0457019070d863583))
* Update process commands ([53b292e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/53b292ed36f3ffa7555570b9591acaab7a9ad07a))


### Features

* Add optional `autocluster` user setting + Fix `yarn process:autocluster` command + Update example configuration file ([b96f8c6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b96f8c67366660a7edb32fa2f8f7f408300f0efa))
* Add optional autocluster with options + Add wav slice download + Add dynamic fft size + Move `h5wasm` to web worker + Fix pairings data sorting + Various attempts to improve Vue+TS QoL + Various code quality improvements ([a8747c2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a8747c2d1ddfc2ddbfdbd629f6aa2c7e6d3b5375))
* **Front/Audio:** Add dynamic FFT size ([10540ba](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/10540ba36596d2779be30e23e6274b886fe801b4))
* **Front/Audio:** Allow changing audio speed and display semitones and % shifts ([c8ff5cd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c8ff5cd27bf38fa4e187147c0714709802709876))
* **Front/Audio:** Display current fft size ([b8e9553](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b8e95530d3f7a3fefbf79d70a756aab6ac08a2e6))
* **Front/Colors:** Add color scale for group indexes ([6eb1f5c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6eb1f5c3fe64f025a141d0e73c4dbfbb07d57bac))
* **Front/Colors:** Add dynamic color scale for comsumption only within `getColor` for scatter performance ([f397b33](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f397b33c0eb67f41817c8eb4681314fe053b56d9))
* **Front/Colors:** Improve code separation, readability and ([8292d11](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8292d11a4d6da5616d3b4185d8bcaafc68b57c66))
* **Front/Dataset:** Use reactive alias for `isDatasetReadyRef` ([c9899a2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c9899a29e50c3ecc73aa83a3f77d3c871aeef366))
* **Front/Export:** Adapt CSV export to new flat storage and vue code style ([f5de142](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f5de14206e72ed2f15a02a0068a08471efb2b884))
* **Front/Export:** Add loading state to prevent double button clicking ([6c369b2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/6c369b2d89a125333d89bf28bdd4c68cf5046a7b))
* **Front/Indicators:** Read with flat storage strategy + Fix display in `Details` ([53e2691](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/53e26910c001acc6574b1613b892fcc65ff1eb01))
* **Front/Indicators:** Use new reactive style ([55a5169](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/55a51695d0d810690f6165b8526ede0cf6ecbcf4))
* **Front/Scatter:** Add filtering by time + Remove deprecated legacy code + Ask for specific refreshes instead of global ([8a38a1c](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8a38a1c06bbf446b73783308ba8f5d1bff27fbd0))
* **Front/Scatter:** Add loading modal when user selects reducer ([b8ff109](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b8ff109fb68781454f6daa7ae5a404fedaabf0d6))
* **Front/Scatter:** Remove v8 legacy code for scatter coloring + Add reference for future port ([0b68730](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0b68730d39c510eb30848a719cce5836cec1e4d6))
* **Front/Scatter:** Working on filtering performance ([adff679](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/adff679574ef262cdb7ee671ef70751ebcc1f70b))
* **Front/Screenshot:** Alias scatter container reference + Add screenshot function ([b7c06eb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b7c06eb8acf30ec164d31ef5a9a82d8744094532))
* **Front/Storage:** Remove deprecated `scatterDatasetStore` ([dffcafd](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/dffcafd149edd4a8b97c5f27f605c06645e51630))
* **Front/Volumes:** Use new reactive style ([a13e4a9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a13e4a9f77a75679e8d17f2b7d4e0e509de99f87))
* **Front/Worker:** Adapt to new flat shape of our storage ([f53b86a](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f53b86ab8016fbcde7f879f1e60c17dd6b6c0fe5))
* **Front:** Rewrite state access (read) through individual storage hooks ([b3afa14](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b3afa14140a35dd44a6ac55a75bf982242e85498))
* **Front:** Update dependencies + Set specific verison of threejs ([7d2cc60](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/7d2cc60bdd33529dde4add420ce409a5411784f1))
* **Git:** Merge docker examples and pnpm changes ([64396c9](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/64396c9f98d554f0869d8d6fadaaefa8d8fe6a6b))
* **Processing/Config:** Add UMAP optional settings with defaults ([24b046f](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/24b046fdd830fe89aef122ee679ce1101bff0bdf))
* **Processing/Indicators:** Add flat storage + Load audio chunks only once to iterate indicators from ([4269b72](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4269b72431e9e3238a1bfc91aa4fe2ae0e9c0502))
* **Processing/Migration:** Add v8 migration for indicators ([56fc6d5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/56fc6d5416b6865fea4255c068a52a7abdc62711))
* **Processing/Migration:** Add v8 migration for reduced features ([2332cf0](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2332cf00f9f18774561647327405367a28bd876e))
* **Processing:** Add `process:dataframe` command to get pandas DataFrame as csv ([529b6b1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/529b6b185bc9b39e6c4b23a2ccad14e548467823))
* **Processing:** Add matrices and pairings to configuration file. ([f4180be](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f4180bea10dbbdaf0ee4a16cd32f7b9be18580f2))
* **Processing:** Add migration script to handle v8 storage files (WIP) + Rename StoragePath for grouped entities ([e2679dc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e2679dc775d4f497eb052092b8698a2ebb90fd5a))
* **Processing:** Store flat datasets ([d136c9e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/d136c9e14755556fa8d1e956514727adfa1f2fcd))
* Replace `yarn` with `pnpm` ([48d77d3](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/48d77d3801667121c77782be007f2900e5bc8773))


### Performance Improvements

* **Front/Colors:** Apply new code style and remove unused TODO ([b07c3ee](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/b07c3ee2e68861d98a27dbec716cabddae501a6c))
* **Front/Colors:** Replace old color alphas store with single reactive aliases as individual references ([4fa6bf8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4fa6bf814b7c67523c2f34b86500e0411c203923))
* **Front/Colors:** Use new dataset readiness reference + Remove deprecated `useScatterStatus` hook ([735eed1](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/735eed13424575278d1c42ce1d1a7bf0c4edebb0))
* **Front/Export:** Add prefix to meta properties + Improve notification content ([06b23dc](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/06b23dc759fba7c7ed7521d3a5fc3905173d2c12))
* **Front/Export:** Improve code readability ([4772fb5](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4772fb54a12ed1425cc52782e47c4d052aa42e0c))
* **Front/Export:** Remove dead code when triggering browser download ([bec5d09](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/bec5d09532f6d1a3bf514e1d602835f00436b95c))
* **Front/Export:** Use new filtering code + Remove deprecated legacy code ([0a7d4d6](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0a7d4d6d7e81b9c4408b03c25ec0d69e7d3843bc))
* **Front/Plots:** Improve references' default values for `AppHeatmap|2D` and `AppHistogram` ([2c1cc3e](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/2c1cc3ea6fcda7747dec054184a83a309f195b56))
* **Front/Scatter:** Remove unnecessary check in meta filter ([f115d00](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f115d000b875050c1fb5585bc73acfb09c3a3f94))
* **Front/Settings:** Remove optional items for CSV exports. Default behaviour is to export all available data. ([9b3bb34](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9b3bb3442fab4f6aa57e626ffe09b58c584ca44a))
* **Front/Storage:** Improve storage hooks for better export performance ([1f409bb](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/1f409bb99e4e6a3ed37bd023f1998e4b8c7b3f9b))
* **Front/Storage:** Move typings within worker file + Remove deprecated `useStorage` hook ([ac7314d](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/ac7314d696856175db6aca63e01b46ad31d6499a))
* **Front/Storage:** Remove deprecated reactive storage object ([3bb72ea](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3bb72ea79d9b3a0c6310d477b25da9c415441b0d))
* **Front:** Add `prettier` ([9c126a2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/9c126a2f036022465ad192c142c69f81c6011d1b))
* **Front:** Remove deprecated `useScatter` and `generateScatterDataset` ([a6b72e7](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/a6b72e7ca713e71bc07e97290dde94059275ecd8))
* **Front:** Use new reactive style for storage bands, integrations and ranges ([0956ea2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/0956ea27834e333735a8cd71c8dc68c3c190a590))
* **Front:** Use new reactive styles for storage bands, integrations and ranges ([37ab888](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/37ab8883f754f0ca9034bf90cbcc8b5413ae357d))
* **Processing/Docker:** Improve dockerfile ([e1ecc19](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/e1ecc192754465ccd566362047843569befa04db))
* **Processing/Indicator:** Remove dead import ([346d9a2](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/346d9a2258860a6f05e02cf607745dae21dcf933))
* **Processing/Migration:** Split v8 migration commands ([271f1e8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/271f1e88576144603b1d73f03885b694c3c99e0f))
* **Processing:** Improve code quality and style + Prepare for modularity and storage flattening strategy ([f070026](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/f070026ea2418f6338361efc75a4f468e6275989))


### BREAKING CHANGES

* **Front/Worker:** The accepted h5 file storage is now closer to upcoming v9.
* **Processing:** Configuration file has changed, matrices and pairings
options have been added.
* **Processing:** Datasets in storage are now flattened for easier
reading.refactor
* Yarn 2 diverges too much from npm's API

## [8.3.4](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.3.3...v8.3.4) (2023-05-02)


### Bug Fixes

* **Processing/Utils:** Parse meta values for correct build of pandas dataframe ([c615503](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/c61550382fa20cdfd0da4f85125f55773632b926))

## [8.3.3](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.3.2...v8.3.3) (2023-04-28)


### Bug Fixes

* **CD:** Will you ever work as expected? ([3376521](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/3376521fa3324a7b6ae3ee11a1355d8a9139fa62))

## [8.3.2](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.3.1...v8.3.2) (2023-04-28)


### Bug Fixes

* **CD:** Fix no templating for assets ([172b3fa](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/172b3faa2653edac36ff20456a49b9adf92e60ad))

## [8.3.1](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.3.0...v8.3.1) (2023-04-28)


### Bug Fixes

* **CD:** Use lodash templates for GitHub assets + Use better asset names ([8ffbdfe](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/8ffbdfe8530c56a24c30b5e6c3b80c31cfce7994))

# [8.3.0](https://github.com/sound-scape-explorer/sound-scape-explorer/compare/v8.2.0...v8.3.0) (2023-04-28)


### Features

* **CD:** Attach version number to output assets ([4e71ef8](https://github.com/sound-scape-explorer/sound-scape-explorer/commit/4e71ef890d5732ffa42c2fd4c0c199ffff32675a))

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
