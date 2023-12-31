# Nox and nox-poetry

Development commands are consolidated using the [nox-poetry](https://nox-poetry.readthedocs.io/en/stable/index.html) package.

Nox manages virtual environments for different versions of python and consolidates development activities (e.g., testing, static type-checking) into a cli interface, while nox-poetry ensures that nox sessions have access to the same dependencies as the project's poetry.lock file.

## Key nox-poetry session methods

Make all poetry.lock dependencies (including dev) available to nox sessions:

=== "python"
    ```python linenums="1"
    session.run_always("poetry", "install", external=True)
    ```

Build package wheel and install within nox session using pip (e.g., for testing):

=== "Option 1"
    ```python linenums="1"
    session.install(".")
    ```

=== "Option 2"
    ```python linenums="1"
    session.installroot()
    ```

Install third-party packages, defaulting to the version specified in poetry.lock:
=== "python"
    ```python linenums="1"
    session.install("pytest")
    ```
