
### What has been done

First, without any need for any work, we can generate the list of files with a dummy date and site (but the proper bands etc), just to run the "sse extract all"

Then, working on the complex config.xlsx.

**the file names**

- create a new sheet
- copy the two content in the new sheet, adding the first column (site)
- also adding a folder version of the site name
- adding a column with the file path (will then use an empty suffix) formula: =C2&"Replica"&G2&"/"&F2
- (NB some columns will be added so the formula would change)

**the dates**

- we have
  - two columns: date (e.g. 2/22/2021) and heure (e.g. 16:54)
  - filenames that seem offset wrt to these dates
  - dates in local time probably
- (maybe useless) used excel format number/date to YYYY-MM-DD to have rather something like 2021-02-22
- new column, as Bora Bora is UTC-10 and format it as text for later copy paste,
  we use formula: =TEXT(E2+F2-TIME(10,0,0), "YYYYMMDD""_""HHMMSS")

**the site column**

distinguish replicates, with something like formula: =D2&"r"&I2

**the tags column**

custom formula, that adds some """ ,words """ based on some columns, and the removes the leading """ , """

Finally copy/paste the 4 columns in the config.xslx, pasting as text (no formula)

**other config columns**

- set the range (by sorting in a new file the dates and adding 1 minute to the last start)
- set the umap configs

Test with:

    sse show audio-span-plot

then:

    sse extract volume
    sse extract umap
    
    sse show config --json > generated/ghost-config.json
    sse chs

### The generated folder is just 8MB so an export could be a good idea to demo

let's go

REFERENCE WAY TO FULL-STATIC EXPORT (to host standalone somewhere)

~~~
cd sse-v2
# monkey patch https://github.com/MartinMalinda/vue-concurrency/issues/58
sed -i -e 's@var E=require("caf/caf")@import CAF from "caf/caf"; var E=CAF@g' node_modules/vue-concurrency/dist/vue3/vue-concurrency.module.js
pnpm run build
sed -i -e 's@="/@="./@g'  dist/index.html
cd ..

N=lagon-bora

mkdir "export-$N"
cp -r sse-v2/dist/* "export-$N"/
sed -i -e 's@"http://localhost:9876/"@"./"@g' "export-$N"/assets/index.*.js
cp -r "samples/$N/generated/" "export-$N"/

du -sh "export-$N"/

@send-to-dl-dir "export-$N"/ "2022-$N"
~~~

### Dataset notes and remarks

NB:

- it seems soleil=lever stays on until soleil=coucher
- probably somewhat the same for others

