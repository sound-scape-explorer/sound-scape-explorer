# `Processing` log

```bash
👋 Welcome to SoundScape Explorer!

┏━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ File    ┃ Path                                                                   ┃
┡━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ config  │ /home/bamdad/git/sound-scape-explorer/sample-lana-semi/coral-reef.xlsx │
│ storage │ /home/bamdad/git/sound-scape-explorer/sample-lana-semi/coral-reef.h5   │
└─────────┴────────────────────────────────────────────────────────────────────────┘
? Choose your action  Run all

🚀 Configuration refresh started!

Config loaded: /home/bamdad/git/sound-scape-explorer/sample-lana-semi/coral-reef.xlsx
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Setting                     ┃ Value                                                   ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ audio_path                  │ /home/bamdad/git/sound-scape-explorer/sample-lana/audio │
│ audio_host                  │ http://localhost:5531                                   │
│ expected_sample_rate        │ 44100                                                   │
│ timeline_origin             │ 2021-01-01 00:00:00                                     │
│ timezone                    │ None                                                    │
│ computation_umap_dimensions │ 5                                                       │
│ computation_umap_iterations │ 10                                                      │
│ display_umap_seed           │ 42000                                                   │
└─────────────────────────────┴─────────────────────────────────────────────────────────┘

🎉 Configuration refresh completed!


🚀 Extractions and aggregations started!

┏━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Name ┃ Extractor                       ┃ Offset (ms) ┃ Step (ms) ┃ Persist (extracted data) ┃
┡━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ vgg  │ VggExtractor                    │ 0           │ 1000      │ ❌                       │
│ ndsi │ SoundscapeIndexExtractor        │ 0           │ 1000      │ ✔                        │
│ adi  │ AcousticDiversityIndexExtractor │ 0           │ 1000      │ ✔                        │
└──────┴─────────────────────────────────┴─────────────┴───────────┴──────────────────────────┘
integration 15, site /2022_passe_1/data_filtree/20221116T120500_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:01
integration 15, site /2022_passe_1/data_filtree/20221116T121500_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_passe_1/data_filtree/20221116T122500_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_passe_2/data_filtree/20221122T120000_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_passe_2/data_filtree/20221122T121000_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_passe_2/data_filtree/20221122T122000_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_passe_3/data_filtree/20221212T120500_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_passe_3/data_filtree/20221212T121500_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_passe_3/data_filtree/20221212T122500_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_naturel_1/data_filtree/20221116T120500_4407951432584596_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_naturel_1/data_filtree/20221116T121500_4407951432584596_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_naturel_1/data_filtree/20221116T122500_4407951432584596_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_naturel_2/data_filtree/20221122T120500_4407951432584596_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_naturel_2/data_filtree/20221122T121500_4407951432584596_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_naturel_2/data_filtree/20221122T122500_4407951432584596_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_naturel_3/data_filtree/20221212T120000_4407951432584596_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_naturel_3/data_filtree/20221212T121000_4407951432584596_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_naturel_3/data_filtree/20221212T122000_4407951432584596_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_touriste_1/data_filtree/20221116T120000_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_touriste_1/data_filtree/20221116T121000_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_touriste_1/data_filtree/20221116T122000_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_touriste_2/data_filtree/20221122T120500_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_touriste_2/data_filtree/20221122T121500_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_touriste_2/data_filtree/20221122T122500_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_touriste_3/data_filtree/20221212T120500_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_touriste_3/data_filtree/20221212T121500_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2022_touriste_3/data_filtree/20221212T122500_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_naturel_1/data_filtree/20210216T120200_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_naturel_1/data_filtree/20210216T121300_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_naturel_1/data_filtree/20210216T122400_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_naturel_2/data_filtree/20210318T120500_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_naturel_2/data_filtree/20210318T121600_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_naturel_2/data_filtree/20210318T122700_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_naturel_3/data_filtree/20210414T120500_2614231112834446_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_naturel_3/data_filtree/20210414T121600_2614231112834446_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_naturel_3/data_filtree/20210414T122700_2614231112834446_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_passe_1/data_filtree/20210218T120600_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_passe_1/data_filtree/20210218T121700_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_passe_1/data_filtree/20210218T122800_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_passe_2/data_filtree/20210316T120400_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_passe_2/data_filtree/20210316T121500_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_passe_2/data_filtree/20210316T122600_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_passe_3/data_filtree/20210419T120400_2614231112834446_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_passe_3/data_filtree/20210419T121500_2614231112834446_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_passe_3/data_filtree/20210419T122600_2614231112834446_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_touriste_1/data_filtree/20210216T120800_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_touriste_1/data_filtree/20210216T121900_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_touriste_1/data_filtree/20210216T123000_2614231121130510_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_touriste_2/data_filtree/20210318T120000_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_touriste_2/data_filtree/20210318T121100_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_touriste_2/data_filtree/20210318T122200_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_touriste_3/data_filtree/20210413T121000_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_touriste_3/data_filtree/20210413T122100_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
integration 15, site /2021_touriste_3/data_filtree/20210413T123200_2614231302179085_2.0.wav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00

🎉 Extractions and aggregations completed!


🚀 Reductions started!

┏━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━┳━━━━━━━━┓
┃ Name ┃ Reducer     ┃ Dimensions ┃ Bands    ┃ Integrations ┃ Ranges ┃
┡━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━╇━━━━━━━━┩
│ umap │ UmapReducer │ 2          │ poissons │ u_15sec      │ *      │
│ umap │ UmapReducer │ 3          │ poissons │ u_15sec      │ *      │
└──────┴─────────────┴────────────┴──────────┴──────────────┴────────┘
┏━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━┓
┃ From extractor ┃ Band     ┃ Integration ┃ Data in storage ┃
┡━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━┩
│ vgg            │ poissons │ 15          │ ✔               │
└────────────────┴──────────┴─────────────┴─────────────────┘
Reducing ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:04

🎉 Reductions completed!


🚀 Requirements computation started!

Computing UMAPs... (iterations: 10, dimensions: 5)
Band poissons, integration 15 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:16

Computing mean distances matrix...

🎉 Requirements computation completed!


🚀 Autoclustering started!

┏━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━┳━━━━━━━━━┓
┃ Autocluster  ┃ Min cluster size ┃ Min samples ┃ Alpha ┃ Epsilon ┃
┡━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━╇━━━━━━━━━┩
│ hdbscan-eom  │ 15               │ 15          │ 1.0   │ 0.1     │
│ hdbscan-leaf │ 15               │ 15          │ 1.0   │ 0.1     │
└──────────────┴──────────────────┴─────────────┴───────┴─────────┘

🎉 Autoclustering completed!


🚀 Tracing trajectories started!

┏━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━┓
┃ Trajectory ┃ Start               ┃ End                 ┃ Label property ┃ Label value ┃ Step ┃
┡━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━┩
│ day1       │ 2022-11-16 12:00:00 │ 2022-11-17 12:05:00 │ LIEU           │ naturel     │ 3600 │
│ day2       │ 2022-11-22 12:00:00 │ 2022-11-23 12:05:00 │ LIEU           │ naturel     │ 3600 │
│ day3       │ 2022-12-12 12:00:00 │ 2022-12-13 12:05:00 │ LIEU           │ naturel     │ 3600 │
└────────────┴─────────────────────┴─────────────────────┴────────────────┴─────────────┴──────┘
Band poissons, integration u_15sec, reducer umap2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
Band poissons, integration u_15sec, reducer umap3 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00

🎉 Tracing trajectories completed!


🚀 Digestions started!

┏━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Name           ┃ Digester              ┃
┡━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━┩
│ mean_spreading │ MeanSpreadingDigester │
│ silhouette     │ SilhouetteDigester    │
│ overlap        │ OverlapDigester       │
│ distance       │ DistanceDigester      │
│ contingency    │ ContingencyDigester   │
└────────────────┴───────────────────────┘
Working... ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:05

🎉 Digestions completed!

? Choose your action  Quit
Exiting...
```
