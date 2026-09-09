# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Notes for this repo

Scaffolded with `npx create-video@latest --blank`. Tailwind v4 comes with the
blank template and is wired up in `remotion.config.ts` and `src/index.css`.

Two things differ from a stock scaffold:

- Rspack is switched off in `remotion.config.ts`. It bundled silently to
  nothing on Remotion 4.0.523 and renders then failed. Webpack works.
- Rendering downloads a Chrome Headless Shell from `remotion.media` on first
  run. In a sandbox that blocks that host, point Remotion at a local Chromium
  instead: `npx remotion render MyComp out/video.mp4 --browser-executable=/path/to/chromium`.

Render output goes to `out/`, bundle output to `build/`; both are gitignored.

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
