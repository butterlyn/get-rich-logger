# Documentation

Documentation is generated using [mkdocs](https://www.mkdocs.org/), in conjunction with the [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) theme and docstring parsing with [mkdocstrings](https://mkdocstrings.github.io/).

Inspiration for generating API documentation was taken from [mkdocstrings](https://mkdocstrings.github.io/recipes/).

Inspiration for documentation formatting was taken from the [pydantic documentation](https://docs.pydantic.dev/latest/), which is also generated using mkdocs. 

## Offline

The documentation can be shared offline by running the following command from the project root:

```
poetry run mkdocs build
```

The documentation will be generated in the `site` directory. The documentation can be viewed by opening `site/index.html` in a browser.
