=== "Python"

    ```python linenums="1"
    import logging
    from get_rich_logger import getRichLogger

    logger: logging.Logger = getRichLogger(  # (1)
        logging_level="DEBUG",
        logger_name=__name__,
    )

    try:
        1 / 0
    except Exception as e:
        logger.exception(
            "This is an example rich logger error message for handled"
            f"exception! Error: {e}"
        )
    ```

    1.  Instantiate rich logger