

PROCESS

- [ ] consider changing the ugly ~65 measure per second... that seem to come from nowhere (i.e. .92 vs .96)
  - hop_length_samples = int(round(SAMPLE_RATE*STFT_HOP_LENGTH_SECONDS))
  - ^ so no overlap
  - goal is 0.96 seconds like vggish
  - no good choice...
    - having almost 1sec (as it is) will make some second get two samples
    - taking 0.5s can be a good choice (but redundancy but it might be ok
    - taking 1s (and loosing .04s/s) could be considered too
    - warning a lot of 0.92 everywhere... to be replaced/fixed

- [ ] allow non power of two in the definition of bands
- [ ] (tool) suggest the config values when we give the band bounds in Hz
- [ ] config checker for common mistakes
  - spaces in band names, range names, site names, ...

TOOL

- [ ] helper to generate ranges, from the sse show audio-span-plot (could click on it?)

- [ ] use gzip when saving json in python (big json not the config), and unzip in JS with e.g. Wasm-Gzip

UI

- [ ] layered config? allow client side enrichment/overriding of the config (e.g. default ui / default xlsx-defined ui / client side defined ui
  - especially for layout or deciding what to group, etc
- [ ] do volumes etc
- [ ] aggregate on different scales (day, week, year?)
- [ ] allow a form a grouping too (post mean of the plot? or rather aggregate of the points)
  - give each group a color and a name
  - select the sites to use (and an advanced mode to select site×slot)
  - pure client side? allow saving somewhere for between-run thing?

- [ ] include global player
  - tricky with 1min every 10min recording schemes
  - tricky as only some sites exist at a given instant
  - ... but (mostly) ok if the ui uses a point from the umap
  - but a point on the umap contains several minutes potentially...

- [ ] allow for several previews
- [ ] allow scrolling spectro for long-ish preview(s)



CFG

- [ ] config umaps allow \* for all sites or all ranges (and bands, or maybe do all bands all the time)

- [ ] proper display and time offset with new Intl.DateTimeFormat("fr", { year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',timeZone: 'Pacific/Tahiti'}).format(d)

- [x] rename file.location as file.site (in the cfg and in the code that use it)
