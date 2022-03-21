



## 2022-03-14 recreate (sse-v2)

### rebootstrap

~~~
$ npm init vue@latest

Vue.js - The Progressive JavaScript Framework                       
                                                                                                                                                                                                                                              
✔ Project name: … sse-v2                                            
✔ Add TypeScript? … No / Yes                                        
✔ Add JSX Support? … No / Yes                                       
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes                        
✔ Add Vitest for Unit Testing? … No / Yes                           
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes      
✔ Add ESLint for code quality? … No / Yes                           
                                                                                                                                                                                                                                              
Scaffolding project in /home/twilight/projects/enes/sound-scape-explorer/sse-v2...
~~~

~~~
cd sse-v2
pnpm install
pnpm run dev
~~~

Installed dependencies

~~~
pnpm i -D naive-ui
pnpm i -D vfonts
pnpm i -D sass

pnpm i chart.js @sgratzl/chartjs-chart-boxplot
pnpm i vue-chart-3
pnpm i vue-concurrency
~~~

Removed a lot of example files...
... and imported some content

- in main.ts
- all components and js files

### some python install / update

~~~
python3 -m pip install --upgrade pip
pip install -U numpy matplotlib seaborn torchaudio librosa xlrd pandas umap-learn openpyxl

pip install -e ./scripts
~~~


### try with some data

Still having the run dev server

~~~
#i.e.
cd sse-v2/
pnpm run serve
~~~

Run a data+emilien server

~~~
cd sample/
sse chs
~~~

(no) Move away the conf to test the file list tool...

~~~
# aborted, not ready yet
#cd sample/
#mv config.xlsx git-config.xlsx
#mv generated/ghost-config.json  generated/git-ghost-config.json
~~~


Recreated an tiny expample

- in `samples/tiny/`, with manual config and recopy features (for now)
- fixed utils.py to use config in current folder

ran

~~~
# check with
sse show audio-span-plot
# gen derived config
sse show config --json > generated/ghost-config.json
(printf '%s' 'JSONJS = ' ; sse show config --json) > generated/ghost-config-json.js
# extract stuff
sse extract preview
sse compute umap
# serve
sse chs
~~~

## Searching for an efficient scatter plot library

- comparision of tech approaches to perfs https://github.com/e-/ScatterplotAnime
  - Would need direct pixel access or webgl
- tensorboard embedding projector plugin (PeopleAI Research, google)
  - nice set of features (search etc)
  - seems to be standalone-able https://github.com/tensorflow/tensorboard/tree/master/tensorboard/plugins/projector (but no release)
  - live test at https://projector.tensorflow.org/
  - also an umap-js project, maybe to consider some day (e.g. to re-umap) https://github.com/pair-code/umap-js, via https://research.google/teams/brain/pair/
  - 5-years old standalone (big bundle) version https://stackoverflow.com/questions/41643365/standalone-tensorflow-projector
  - ALSO, there is PAIR scatter plot
    - https://pair-code.github.io/scatter-gl/
    - ⭐⭐⭐ tested there demo (that has 2000 points) but ×100 (200000) and it runs, still running at ××10 (2M)
    - there seem to be a npm version https://www.npmjs.com/package/scatter-gl (not to be confused with scatter-js)
    - github https://github.com/PAIR-code/scatter-gl
    - my pb with opacity? https://github.com/PAIR-code/scatter-gl/issues/99
- deep scatter plot blog/demo
  - http://creatingdata.us/techne/deep_scatterplots/
  - uses canvas (for 20k points) and tiling (smart, hierarchical) (generated using python btw), each with (at most) 1000 points
  - had a d3.quadtree for mouse interaction (patched)
  - have some custom filters api
  - have some custom animation api  
  - ... found while looking at d3fc (see below)
- recreation of deepscatter with d3fc
  - https://github.com/ColinEberhardt/d3fc-webgl-hathi-explorer
  - and this example using it https://colineberhardt.github.io/d3fc-webgl-hathi-explorer/
  - renders in a canvas
