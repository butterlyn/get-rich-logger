## Description

Substitute for python standard library function logging.getLogger(), but pre-configured as [rich logger](https://rich.readthedocs.io/en/stable/logging.html).

Also makes unhandled errors to be logged with [rich traceback](https://rich.readthedocs.io/en/stable/traceback.html).

## Installation

Installation using pip:

```bash
pip install get-rich-logger
```

Installation using poetry:

```bash
poetry add get-rich-logger
```

## Usage

```python linenums="1" title="Instantiate rich logger"
import logging
from get_rich_logger import getRichLogger

logger: logging.Logger = getRichLogger(
    logging_level="DEBUG",
    logger_name=__name__,
)
```

```python linenums="1" title="Handled error"
try:
    1 / 0
except Exception as e:
    logger.exception(
        "This is an example rich logger error message for handled"
        f"exception! Error: {e}"
    )
```
