UI

- [ ] do volumes etc

- [ ] include global player
  - tricky with 1min every 10min recording schemes
  - tricky as only some sites exist at a given instant

- [ ] allow for several previews
- [ ] allow scrolling spectro for long-ish preview(s)



CFG

- [ ] config umaps allow \* for all sites or all ranges (and bands, or maybe do all bands all the time)

- [ ] use gzip when saving json in python, and unzip in JS with e.g. Wasm-Gzip

- [ ] proper display and time offset with new Intl.DateTimeFormat("fr", { year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',timeZone: 'Pacific/Tahiti'}).format(d)

- [x] rename file.location as file.site (in the cfg and in the code that use it)
