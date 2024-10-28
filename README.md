# Nitro starter

Look at the [nitro quick start](https://nitro.unjs.io/guide#quick-start) to learn more how to get started.

## Getting started

1. Clone the repository
2. Run `npm install`

## Running the project

1. Run `docker compose up`
2. Make a POST request to `http://localhost:5000/tibber-developer-test/enter-path` with the following body:

```json
{
  "start": { "x": 0, "y": 0 },
  "commands": [{ "direction": "east", "steps": 10 }]
}
```

3. Example response:

```json
{
  "Commands": 1,
  "Result": 2,
  "Duration": 0.1733389999717474
}
```

## Running the tests

1. Run `npm test`

## Linting

1. Run `npm run lint`
