# Necromancy Game (Working Title)

Dev: ![Code quality dev branch](https://github.com/Toby222/NecroGame/workflows/Code%20quality%20check/badge.svg?branch=dev)  
Main: ![Code quality main branch](https://github.com/Toby222/NecroGame/workflows/Code%20quality%20check/badge.svg)

An incremental game skeleton. Very much WIP.

![screenshot](https://github.com/Toby222/NecroGame/blob/main/.github/images/screenshot_1.png?raw=true)

Play the current version [here](https://necro.tobot.tech/).
Play around with the development version [here](https://dev.necro.tobot.tech/).

## Requirements

Built with Node.js.

Developed with the help of [vercel](https://vercel.com/), and its command line tool.

## Development scripts

- `yarn format` - Auto-format the codebase.
  - `yarn lint` - Check if codebase conforms to codestandards.
  - `yarn test` - Check if codebase is ready for commit, including tsc and eslint warnings.
- `yarn run dev` - Start a development server at `localhost` and watch for code changes.
  - `yarn start` - Create a production build and host it at `localhost`

## Dependencies

- [Next.js](https://nextjs.org/) - React framework
- [typescript](https://www.typescriptlang.org/) - JS, but typesafe
- [DaddyTimeMono Nerd Font](https://www.nerdfonts.com/) - A "wibbly-wobbly handwriting-like"\[sic\] font patched with icons

## Acknowledgements

Originally adapted from [deciduously's](https://github.com/deciduously/impact) prototype, translated to TypeScript as best as I could and then built upon after that.
