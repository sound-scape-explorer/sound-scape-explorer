# Soundscape explorer

## Description


## How to use it

### Installation 

Avaiable in UNIX and Windows platform

#### Windows

Step 0 : Donwload project 

Step 1 : Download and install required
https://www.python.org/downloads/

https://pip.pypa.io/en/stable/installation/
Download the get-pip.py file
go to your directory Download

~~~
cd Download
python3 get-pip.py
~~~


https://nodejs.org/en/download/
You can avoid to install chocolatery extension. not mandatory

Step 2 : Install required python libraries

~~~
pip install numpy
~~~
~~~
pip install matplotlib
~~~
~~~
pip install seaborn
~~~
~~~
pip install torchaudio
~~~
~~~
pip install librosa
~~~
~~~
pip install xlrd
~~~
~~~
pip install pandas
~~~
~~~
pip install umap-learn
~~~
~~~
pip install openpyxl
~~~
~~~
pip install numpy==1.20
~~~

From your 

#### Unix

Step 0 : Open an terminal and install python, pip and nodeJS pakager

~~~
apt install python
apt install pip
apt install npm
~~~

Step 1 : Install required python libraries

~~~
pip install numpy
pip install matplotlib
pip install seaborn
pip install torchaudio
pip install librosa
pip install xlrd
pip install pandas
pip install umap-learn
pip install openpyxl
pip install numpy==1.20
~~~

The helper script

Step 2 : go to your downloaded root project

Setp 3 : run this command

~~~
pip install -e ./scripts
mkdir ./sample/generated ./sample/features
~~~

Step 4 : Go to [rootProject]/sse-v1/ and run this command

~~~
ln -s ../sample/features/
ln -s ../sample/generated/
~~~

[Hightly recommended] To activate sse command (either in your `.bashrc`, or once in each terminal that needs it)

~~~

export PATH=\$PATH:~/.local/ >> ~/.bashrc

~~~

[Not Mandatory] To activate autocompletion (either in your `.bashrc`, or once in each terminal that needs it)

~~~
eval "$(_SSE_COMPLETE=bash_source sse)"

# or get it with
sse help
~~~

Step 5 : Extract 

~~~
sse extract all
#this operation will take a while depending of your dataset.
#[Optionaly] 
sse extract preview
~~~

Step 6 : Generate config for webClient

~~~
cd [rootProject]/sse-v1/
sse show config --json > generated/ghost-config.json
~~~

Step 7 : install nodeJS dependencies

~~~
cd [rootProject]/sse-v1/
#DO NOT RUN THIS command => npm audit fix
#run this below
npm i -D naive-ui
npm i -D vfonts
npm i -D worklet-loader
npm install --save chart.js chart.js/helpers
~~~


Step 8 : run the pyhon server and the nodeJS server 

~~~
cd [rootProject]/sse-v1/
# run the python server (default port is 9876)
sse cors-http-server 
# it's also called in shortname
sse chs

# run the nodeJS server at same path
npm run serve (default port is 8080)

~~~

All done


typical commands

~~~

#run the server
sse cors-http-server
#it's also called in shortname
sse chs

#
sse extract all

# if a lot of files and you know they have each a 60s duration
sse show audio-span-splot -s 60
# else (few files or patient)
sse show audio-span-splot

sse extract preview
sse compute volume
sse compute covering
sse compute umap

sse help
# copy the config generators
sse chs

(cd [rootProject]/sse-v1 ; npm run dev)
(cd [rootProject]/sample sse show config --json > generated/ghost-config.json)

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
