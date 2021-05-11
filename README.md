# ComicBook CLI

A CLI tool to display the latest comic book releases.

![Comicbooks in the terminal](https://raw.github.com/miguelc1221/comicbooks-cli/master/screenshot.png)

## Install

Requires Node Version 16.1.0+

```js
npm install comicbook-cli -g
```

## Commands

### Display a table with all the latest issues by publisher

```js
comics -p <publisher>
// eg: comics --publisher "Marvel Comics"
// or
// eg: comics -p "Marvel Comics"
```

### Display a table with all the latest issues

```js
comics --all
```

## Contributing

1. Fork it
2. Run `npm install`
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

## License

MIT © [Miguel Correa](http://github.com/miguelc1221)
