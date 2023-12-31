# Publish new version

## Publishing checklist

1. Commit all changes
    ```
    git status
    ```
    ```
    git commit -am "<commit message>"
    ```
    ```
    git push
    ```
2. Package validation
    1. Check for dependency updates
    ```
    poetry update
    ```
    2. Test build documentation
    ```
    poetry run mkdocs build
    ```
    3. Static type-checking
    ```
    poetry run mypy
    ```
    <!-- 4. Test package
    ```
    poetry run pytest
    ``` -->
3. Prepare for publishing
    1. Bump version number in pyproject.toml
    2. Test build package
    ```
    poetry build
    ```
    3. Git push version bump
    ```
    git commit -am "bump version to X.X.X"
    ```
    ```
    git push
    ```
    4. Tag version, and git push tags
    ```
    git tag X.X.X -m "<version changes summary>"
    ```
    ```
    git push --tags
    ```
4. Publishing to PyPI
    ```
    poetry publish
    ```
5. Publishing documentation
    ```
    poetry run mike deploy --push --update-aliases X.X.X latest
    ```