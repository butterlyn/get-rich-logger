# Updating code

1. Serve documentation locally
    ```
    poetry run mkdocs serve
    ```
2. Change source code, including docstrings
    1. Static type-checking
    ```
    poetry run mypy
    ```
    2. Add or remove dependencies
    ```
    poetry add <package name>
    ```
    ```
    poetry remove <package name>
    ```
    3. run tests
    ```
    poetry run pytest
    ```