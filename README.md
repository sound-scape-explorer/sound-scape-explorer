# Soundscape explorer

## Description


## How to use it

### Installation

Some python libraries

~~~
pip install numpy
pip install matoplotlib
pip install seaborn
pip install torchaudio
pip install librosa
pip install xlrd
pip install pandas
pip install umap-learn
~~~

The helper script

~~~
pip install ./scripts
~~~

To activate autocompletion (either in your `.bashrc`, or once in each terminal that needs it)

~~~
eval "$(_SSE_COMPLETE=bash_source sse)"

# or get it with
sse help
~~~






## Development notes

### Created with...

made a vue project

~~~output
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, CSS Pre-processors, Linter
? Choose a version of Vue.js that you want to start the project with 3.x
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
~~~

mashed-up an icon (in media/, exported to 256px)

using the icon in the vue project

~~~
inkscape media/icons.svg -o media/sse-icon.png
cp -f media/sse-icon.png sse-v1/src/assets/logo.png
convert sse-v1/src/assets/logo.png sse-v1/public/favicon.ico
~~~

### Making some test data

~~~
cp -t log1/ '........./Logger1/20210429_180000.WAV'  # strange... 
cp -t log2/ '........./Logger2/20210429_180000.WAV'


# for each folder
ffmpeg  -i 20210429_180000.WAV -ss 0 -t 60 -c copy chunk-20210429_180000.WAV
ffmpeg  -i 20210429_180000.WAV -ss 60 -t 60 -c copy chunk-20210429_180100.WAV
ffmpeg  -i 20210429_180000.WAV -ss 120 -t 60 -c copy chunk-20210429_180200.WAV
ffmpeg  -i 20210429_180000.WAV -ss 180 -t 60 -c copy chunk-20210429_180300.WAV
ffmpeg  -i 20210429_180000.WAV -ss 600 -t 60 -c copy chunk-20210429_181000.WAV

# alternative to fake a first one using the second
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1000 -t 60 -c copy chunk-20210429_180000.WAV
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1060 -t 60 -c copy chunk-20210429_180100.WAV
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1120 -t 60 -c copy chunk-20210429_180200.WAV
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1180 -t 60 -c copy chunk-20210429_180300.WAV
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1600 -t 60 -c copy chunk-20210429_181000.WAV


~~~

### Extracting features and previews

~~~
sse extract all
sse extract preview

sse show band-freqs
sse show list-sites

# if a lot of files and you know they have each a 60s duration
sse show audio-span-splot -s 60
# else (few files or patient)
sse show audio-span-splot
~~~

For now, we use python to save a json of the config, to avoid implementing the parser (although this is easy-ish):

~~~
# get the command with (use the ones that redirect to .js and .json files
sse help
~~~

### Some npm installs

~~~
# for naive
npm i -D naive-ui
npm i -D vfonts
npm i -D worklet-loader
~~~

### dev on the js side

~~~
cd sse-v1/
npm run serve 
~~~

and the data server

~~~
cd sample/
sse cors-http-server
~~~

### wip

##### file:// release

~~~

npm run build
where=../sample
#-e 's@data-src=""@src="../'"$where"/'generated/ghost-config-json.js"@g'
sed -i -e 's@="/@="@g'  dist/index.html
sed -i -e 's@http://localhost:9876/@'"$where"'/@g' dist/js/*.js
#sed -i -e 's@LOCAL:!@LOCAL:@g' dist/js/*.js
~~~
