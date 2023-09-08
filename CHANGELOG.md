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
