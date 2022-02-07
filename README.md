# Soundscape explorer

## Description


## How to use it

## Installation 

Available in UNIX and Windows platform and ready-made in Virtual-Box 

### VirtualBox (in writing)

### Windows (in writing)

Step 0 : Donwload project 

Step 1 : Download and install required
[Python](https://www.python.org/downloads/)

[Pip](https://pip.pypa.io/en/stable/installation/)
Download the get-pip.py file
go to your directory Download

```
cd Download
python3 get-pip.py
```


[NodeJS](https://nodejs.org/en/download/)
You can avoid to install chocolatery extension. not mandatory

Step 2 : Install required python libraries

```
pip install numpy
```
```
pip install matplotlib
```
```
pip install seaborn
```
```
pip install torchaudio
```
```
pip install librosa
```
```
pip install xlrd
```
```
pip install pandas
```
```
pip install umap-learn
```
```
pip install openpyxl
```
```
pip install numpy==1.20
```

From your 

### Unix

#### Step 0 : Open a terminal update your pakages and install python, pip and nodeJS pakager

```

sudo apt update 

#####Used to re-synchronize the package index files from their sources. The indexes of available packages are fetched from the location(s) specified in /etc/apt/sources.list(5). An update should always be performed before an upgrade or dist-upgrade.


sudo apt upgrade 

#####Used to install the newest versions of all packages currently installed on the system from the sources enumerated in /etc/apt/sources.list(5). Packages currently installed with new versions available are retrieved and upgraded; under no circumstances are currently installed packages removed, nor are packages that are not already installed retrieved and installed. New versions of currently installed packages that cannot be upgraded without changing the install status of another package will be left at their current version. An update must be performed first so that apt-get knows that new versions of packages are available. 

```


NOTE : if you not find 
```
sudo apt install python3.8
#####try
sudo apt install pip #version 20.0.2
#####if not work use 
#####sudo apt install python3-pip


sudo apt install npm # 


sudo apt install curl 
#####curl  is  a tool to transfer data from or to a server

sudo apt install ffmpeg
#####is a very fast video and audio converter that can also grab from a live audio/video source
```

#### Step 1 : Install required python libraries

```
pip install numpy==1.20
pip install matplotlib
pip install seaborn
pip install torchaudio
pip install librosa
pip install xlrd
pip install pandas
pip install umap-learn
pip install openpyxl
```

The helper script

#### Step 2 : go to your downloaded root project

#### Setp 3 : run this command

```
#####install scripts project with these modules
pip install -e ./scripts

#####create specific directory 
mkdir ./sample/generated ./sample/features
```

#### Step 4 : Go to [rootProject]/sse-v1/ and run this command

```
#####create shortcut (do not duplicate content or the sources)
ln -s ../sample/features/
ln -s ../sample/generated/
```

[Hightly recommended] To activate sse command (either in your `.bashrc`, or once in each terminal that needs it)

```
#####this command bellow permit to add in you shell sse command

export PATH=\$PATH:~/.local/ >> ~/.bashrc
###logout/login of your computer session after this command to activate sse command
```

[Not Mandatory] To activate autocompletion (either in your `.bashrc`, or once in each terminal that needs it)

```
eval "$(_SSE_COMPLETE=bash_source sse)"

#####or get it with
sse help
```

#### Setp 5 : Use your audio sources **OR** Download an example of this app

Example of this app

```
curl http://149.91.90.152:8000/examples.tar > ../sample/audio/examples.tar
cd ../sample/audio/
tar -xvf examples.tar
rm examples.tar
cd ../../sse-v1/
curl http://149.91.90.152:8000/config.xlsx > ../sample/config.xlsx 
```

To import your audio sources, you must to drop it into [rootProject]/sample/audio/ and respect some rules : 


* Folder Hierarchy in order must be this : 
    * Site Name (in eexample BoraBora)
        * Logger1 (In example Logger in touristical aera)
            * Audio File name 1
            * Audio File name 2
        * Logger2
            * Audio File name 1
            * Audio File name 2
* Audio File must be folow the name rules (repalce '[' and ']' by the required information ):
    * [Time in UTC format]_[Logger ID].wav
    
    in example : 20210629T050900_2614231121130510


#### Step 6 : Extract 

```

#####Do the Neuronal Network extraction from original input with all files says in config.xlsx

sse extract all

#####this operation will take a while depending of your dataset.

```

Open a new tab terminal or new window terminal let's open the oldest tab/window terminal

```
sse extract preview
```

If you have an error in red like this

```
Assertion atempo->position[0] <= stop_here failed at src/libavfilter/af_atempo.c:501
```

don't stay on it, you can just close the terminal to avoid write problem go to the next step.

#### Step 7 : Generate config for webClient

```
cd [rootProject]/sse-v1/
sse show config --json > generated/ghost-config.json
```

#### Step 8 : install nodeJS dependencies

```
cd [rootProject]/sse-v1/
#DO NOT RUN THIS command => npm audit fix
#run this below
npm i -D naive-ui
npm i -D vfonts
npm i -D worklet-loader
```


#### Step 9 : run the python server and the nodeJS server 

```
cd [rootProject]/sse-v1/
# run the python server (default port is 9876)
# sse cors-http-server 
# it's also called in shortname
sse chs
```

Open a new tab terminal or new window terminal let's open the oldest tab/window terminal

```
#in case of error during launch of the nodeJS server
npm remove chart.js
npm install chart.js

# run the nodeJS server at same path (default port is 8080)
npm run serve 

```

#### Setp 10 : Run computation to see data on app

Open a new tab terminal or new window terminal let's open the oldest tab/window terminal

From [rootProject]/sse-v1/ path

```
sse compute umap 
sse compute covering
sse compute volume
```

All done

## For use 

### In UNIX

WARNING : Each time you change audio file (remove, add, edit in folder /audio) you should to change your config.xlsx + run this command

```
cd [rootProject]/sse-v1/
sse show config --json > generated/ghost-config.json
```

#### Step 1 : run daemons

Run a terminal with 3 tabs or 3 terminal and __**for each**__ of them go to

```

cd [rootProject]/sse-v1/

```

In first tab/terminal, run 

```

sse chs
#it's also called in long name 
#sse cors-http-server

```

In second tab/terminal, run 

```

npm run serve

```

#### Step 2 : if necessary or not done already, use a run in third tab/terminal the following commands depend of what you expect

##### Action 1 : split an audio file corresponding to the terms "Logger" in N files of 60s duration called *Sample*
Required action : None
Reason : Parse data into torch audio, a Neuronal network and permit to execute action 3 : 
Command : 

```

sse extract all

```

##### Action 2 : extract a preview of Sample to see mel-spectograme

Required action : None

Reason : Show this on browser

Command : 
 
```

sse extract preview

```

##### Action 3 : Project the 128 dimensions into 2 dimensions with UMAP

(Uniform Manifold Approximation and Projection for Dimension Reduction)

Required action : Action 1

Reason : Show this on browser by action 6 and find biologistic clues

Command : 

```

sse compute umap 

```

##### Action 4 : Compute the volume of samples

Required action : Action 1

Reason : Show this on browser by action 6 and find biologistic clues

Command : 

```

sse compute volume 

```

##### Action 5 : Compute covering

Required action : Action 1

Reason : Show this on browser by action 6 and find biologistic clues during a time period like a day

Command : 

```

sse compute covering 

```


##### Action 6 : Show app on browser

Required actions : Action 3,4,5

Open your favorite browser and go to 

```

http://localhost:8080/

```


#### Step 3 : Explanation of tabs 

##### Raw Config 

Show the configuration done in [rootProject]/sample/config.xlsx in case of step 7 for unix install have been done.

Il you want to refres the newest configuration after edit config.xlsx, you need to run this command in third tab

From [rootProject]/sse-v1/ path

```

sse show config --json > generated/ghost-config.json

```

##### Mini Tools

Permit to split the original audio sound into N Bands of frequencies (Hz)
Due to the softwar configuration, we can choose only by step of 64 

##### Covering (Not avaiable yet)

##### Volumes

Permit to see during time the volume of sounds

##### UMAP

Show in 2D an projection of the matricies of 128d for each second

You can move to see during time each point corresponding to the time 

##### Player (Not avaiable yet)

Permit to see an logger and see the specificities of an logger. For example to see the period of recording, see an zoom of the logger 

##### Preview (in rebulding)

Permit to see an preview of an logger. You can config this into minitool.


#### typical commands

```

#####run the server
sse cors-http-server
#####it's also called in shortname
sse chs

#
sse extract all

###### if a lot of files and you know they have each a 60s duration
sse show audio-span-splot -s 60
###### else (few files or patient)
sse show audio-span-splot

sse extract preview
sse compute volume
sse compute covering
sse compute umap

sse help
###### copy the config generators
sse chs

(cd [rootProject]/sse-v1 ; npm run dev)
(cd [rootProject]/sample sse show config --json > generated/ghost-config.json)

```




## Development notes

### Created with...

made a vue project

```output
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, CSS Pre-processors, Linter
? Choose a version of Vue.js that you want to start the project with 3.x
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
```

mashed-up an icon (in media/, exported to 256px)

using the icon in the vue project

```
inkscape media/icons.svg -o media/sse-icon.png
cp -f media/sse-icon.png sse-v1/src/assets/logo.png
convert sse-v1/src/assets/logo.png sse-v1/public/favicon.ico
```

### Making some test data

```
cp -t log1/ '........./Logger1/20210429_180000.WAV'  ###### strange... 
cp -t log2/ '........./Logger2/20210429_180000.WAV'


###### for each folder
ffmpeg  -i 20210429_180000.WAV -ss 0 -t 60 -c copy chunk-20210429_180000.WAV
ffmpeg  -i 20210429_180000.WAV -ss 60 -t 60 -c copy chunk-20210429_180100.WAV
ffmpeg  -i 20210429_180000.WAV -ss 120 -t 60 -c copy chunk-20210429_180200.WAV
ffmpeg  -i 20210429_180000.WAV -ss 180 -t 60 -c copy chunk-20210429_180300.WAV
ffmpeg  -i 20210429_180000.WAV -ss 600 -t 60 -c copy chunk-20210429_181000.WAV

###### alternative to fake a first one using the second
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1000 -t 60 -c copy chunk-20210429_180000.WAV
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1060 -t 60 -c copy chunk-20210429_180100.WAV
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1120 -t 60 -c copy chunk-20210429_180200.WAV
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1180 -t 60 -c copy chunk-20210429_180300.WAV
ffmpeg  -i ../log2/20210429_180000.WAV -ss 1600 -t 60 -c copy chunk-20210429_181000.WAV


```

### Extracting features and previews

```
sse extract all
sse extract preview

sse show band-freqs
sse show list-sites

###### if a lot of files and you know they have each a 60s duration
sse show audio-span-splot -s 60
###### else (few files or patient)
sse show audio-span-splot
```

For now, we use python to save a json of the config, to avoid implementing the parser (although this is easy-ish):

```
###### get the command with (use the ones that redirect to .js and .json files
sse help
```

### Some npm installs

```
# for naive
npm i -D naive-ui
npm i -D vfonts
npm i -D worklet-loader
```

### dev on the js side

```
cd sse-v1/
npm run serve 
```

and the data server

```
cd sample/
sse cors-http-server
```

### wip

##### file:// release

```

npm run build
where=../sample
#-e 's@data-src=""@src="../'"$where"/'generated/ghost-config-json.js"@g'
sed -i -e 's@="/@="@g'  dist/index.html
sed -i -e 's@http://localhost:9876/@'"$where"'/@g' dist/js/*.js
#sed -i -e 's@LOCAL:!@LOCAL:@g' dist/js/*.js
```

#### markdown
```

markdown README.md > .hiddenREADME.html

```