# studnice-fest

Website studnicefest.cz

## Development

Site uses [`@hckr_/blendid`](https://github.com/hckr-studio/blendid) for development and building.

To run the site in development mode with hot reloading run:

```bash
op run --env-file=.env --no-masking -- yarn start
```

We store secrets in 1password and use 1password CLI to read them.
