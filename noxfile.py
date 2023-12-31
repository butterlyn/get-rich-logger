"""
### How to create nox_poetry sessions ([source](https://nox-poetry.readthedocs.io/en/stable/index.html)):

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
"""
import nox
from nox_poetry import (
    session,
    Session,
)

# an empty list will display all sessions for command `nox`
nox.options.sessions = []
# nox.options.reuse_existing_virtualenvs = True


@session(python=['3.10'], reuse_venv=True)
def check(session: Session) -> None:
    """Static type checking with mypy"""
    session.run_always("poetry", "install", external=True)
    session.install("mypy")
    session.run("mypy")
