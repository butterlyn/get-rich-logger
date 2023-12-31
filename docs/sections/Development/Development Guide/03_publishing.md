# Publishing

## Publishing checklist

1. Package validation
    1. Check for dependency updates
    ```
    poetry update
    ```
    3. Run tests
    ```
    poetry run pytest
    ```
    4. Test build documentation
    ```
    poetry run mkdocs build
    ```
    5. Static type-checking
    ```
    poetry run mypy
    ```
2. Prepare for publishing
    1. Bump version number in pyproject.toml
    2. Test build package
    ```
    poetry build
    ```
    3. Git push version bump
    ```
    git commit -am "bump version to X.X.X"
    git push
    ```
    3. Tag version, and git push tags
    ```
    git tag X.X.X -m "<version changes summary>"
    git push --tags
    ```
3. Publishing to PyPI
    ```
    poetry publish
    ```
4. Publishing documentation
    ```
    poetry run mike deploy --push --update-aliases X.X.X latest
    ```