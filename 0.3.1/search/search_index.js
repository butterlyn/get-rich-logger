var __index = {"config":{"lang":["en"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"reference/SUMMARY.html","title":"SUMMARY","text":"<ul> <li>get_rich_logger</li> </ul>"},{"location":"reference/get_rich_logger.html","title":"get_rich_logger","text":""},{"location":"reference/get_rich_logger.html#get_rich_logger.getRichLogger","title":"<code>getRichLogger(level='NOTSET', name=None, format='%(message)s', traceback_show_locals=False, traceback_hide_dunder_sunder_locals=True, traceback_extra_lines=10, traceback_suppressed_modules=(), **logging_basic_config_extra_kwargs)</code>","text":"<p>Substitute for logging.getLogger(), but pre-configured as rich logger with rich traceback.</p> <p>Parameters:</p> Name Type Description Default <code>level</code> <code>_Level</code> <p>The logging level to use. Valid values include \"DEBUG\", 10, \"INFO\", 20, \"WARNING\", 30, \"ERROR\", 40, \"CRITICAL\", 50.</p> <code>'NOTSET'</code> <code>name</code> <code>str</code> <p>The name of the logger. Recommended to use <code>__name__</code>.</p> <code>None</code> <code>format</code> <code>str</code> <p>The format string to use for the rich logger.</p> <code>'%(message)s'</code> <code>traceback_show_locals</code> <code>bool</code> <p>Whether to show local variables in tracebacks.</p> <code>False</code> <code>traceback_hide_dunder_sunder_locals</code> <code>bool</code> <p>Whether to hide dunder and sunder variables in tracebacks. Only applicable to unhandled errors.</p> <code>True</code> <code>traceback_extra_lines</code> <code>int</code> <p>The number of extra lines to show in tracebacks.</p> <code>10</code> <code>traceback_suppressed_modules</code> <code>Iterable[ModuleType]</code> <p>The modules to suppress in tracebacks (e.g., pandas).</p> <code>()</code> <code>logging_basic_config_extra_kwargs</code> <code>Unpack[LoggingBasicConfigExtraKwargs]</code> <p>Extra keyword arguments to pass to logging.basicConfig().</p> <code>{}</code> <p>Returns:</p> Type Description <code>Logger</code> <p>The configured rich logger.</p> <p>Raises:</p> Type Description <code>TypeError</code> <p>If additional_handlers is not a logging.Handler, Iterable[logging.Handler], or None.</p> <p>Examples:</p> Python <pre><code>import logging\nfrom get_rich_logger import getRichLogger\n\ngetRichLogger(\n    logging_level=\"DEBUG\",\n    logger_name=__name__,\n    traceback_show_locals=True,\n    traceback_extra_lines=10,\n    traceback_suppressed_modules=(),\n)\n\nlogging.debug(\"This is a rich debug message!\")  # (1)\n\n1/0  # (2)\n</code></pre> <ol> <li>Logs will be colored and formatted with rich.</li> <li>Unhandled errors will have rich traceback.</li> </ol> Source code in <code>src\\get_rich_logger\\_logger.py</code> <pre><code>def getRichLogger(\n    level: Literal[\n        \"NOTSET\",\n        \"DEBUG\",\n        \"INFO\",\n        \"WARNING\",\n        \"ERROR\",\n        \"CRITICAL\",\n    ] | int = \"NOTSET\",\n    name: str | None = None,\n    format: str = \"%(message)s\",\n    traceback_show_locals: bool = False,\n    traceback_hide_dunder_sunder_locals: bool = True,\n    traceback_extra_lines: int = 10,\n    traceback_suppressed_modules: Iterable[ModuleType] = (),\n    **logging_basic_config_extra_kwargs: Unpack[LoggingBasicConfigExtraKwargs],\n) -&gt; logging.Logger:\n    \"\"\"\n    Substitute for [logging.getLogger()](https://docs.python.org/3/library/logging.html),\n    but pre-configured as rich logger with rich traceback.\n\n    Parameters\n    ----------\n    level : _Level, optional\n        The logging level to use.\n        Valid values include \"DEBUG\", 10, \"INFO\", 20, \"WARNING\", 30,\n        \"ERROR\", 40, \"CRITICAL\", 50.\n    name : str, optional\n        The name of the logger. Recommended to use `__name__`.\n    format : str, optional\n        The format string to use for the rich logger.\n    traceback_show_locals : bool, optional\n        Whether to show local variables in tracebacks.\n    traceback_hide_dunder_sunder_locals : bool, optional\n        Whether to hide dunder and sunder variables in tracebacks.\n        Only applicable to unhandled errors.\n    traceback_extra_lines : int, optional\n        The number of extra lines to show in tracebacks.\n    traceback_suppressed_modules : Iterable[ModuleType], optional\n        The modules to suppress in tracebacks (e.g., pandas).\n    logging_basic_config_extra_kwargs : Unpack[LoggingBasicConfigExtraKwargs], optional\n        Extra keyword arguments to pass to [logging.basicConfig()](https://docs.python.org/3/library/logging.html#logging.basicConfig).\n\n    Returns\n    -------\n    logging.Logger\n        The configured rich logger.\n\n    Raises\n    ------\n    TypeError\n        If additional_handlers is not a logging.Handler,\n        Iterable[logging.Handler], or None.\n\n    Examples\n    --------\n    === \"Python\"\n        ``` python linenums=\"1\"\n        import logging\n        from get_rich_logger import getRichLogger\n\n        getRichLogger(\n            logging_level=\"DEBUG\",\n            logger_name=__name__,\n            traceback_show_locals=True,\n            traceback_extra_lines=10,\n            traceback_suppressed_modules=(),\n        )\n\n        logging.debug(\"This is a rich debug message!\")  # (1)\n\n        1/0  # (2)\n        ```\n\n        1.  Logs will be colored and formatted with rich.\n        2.  Unhandled errors will have rich traceback.\n\n    \"\"\"\n\n    # install rich traceback for unhandled exceptions\n    traceback.install(\n        extra_lines=traceback_extra_lines,\n        theme=\"monokai\",\n        show_locals=traceback_show_locals,\n        locals_hide_dunder=traceback_hide_dunder_sunder_locals,\n        locals_hide_sunder=traceback_hide_dunder_sunder_locals,\n        suppress=traceback_suppressed_modules,\n    )\n\n    # configure the rich handler\n    rich_handler: logging.Handler = RichHandler(\n        level=logging.getLevelName(level),\n        omit_repeated_times=False,\n        rich_tracebacks=True,\n        tracebacks_extra_lines=traceback_extra_lines,\n        tracebacks_theme=\"monokai\",\n        tracebacks_word_wrap=False,\n        tracebacks_show_locals=traceback_show_locals,\n        tracebacks_suppress=traceback_suppressed_modules,\n        log_time_format=\"[%Y-%m-%d %H:%M:%S] \",\n    )\n\n    # validate the extra `logging.basicConfig` kwargs\n    try:\n        logging_basic_config_extra_kwargs_adapter.validate_python(\n            logging_basic_config_extra_kwargs,\n            strict=True,\n        )\n    except ValidationError as e:\n        raise TypeError(\n            f\"Invalid extra key word arguments provided:\\n{e}\"\n        ) from e\n\n    # configure the logger\n    logging.basicConfig(\n        level=logging.getLevelName(level),\n        format=format,\n        handlers=[rich_handler],\n        **logging_basic_config_extra_kwargs,\n    )\n\n    # return the rich logger\n    return logging.getLogger(name)\n</code></pre>"},{"location":"sections/Development/How%20to/01_setup.html","title":"Set up development environment","text":""},{"location":"sections/Development/How%20to/01_setup.html#requirements","title":"Requirements","text":"<ol> <li>Install python</li> <li>Install poetry</li> <li>Install git</li> </ol>"},{"location":"sections/Development/How%20to/01_setup.html#setting-up-development-environment","title":"Setting up development environment","text":"<ol> <li>Git clone source code, if not already done     <pre><code>git clone &lt;repo remote url&gt;\n</code></pre></li> <li>Git pull latest source code     <pre><code>git pull\n</code></pre></li> <li>Install poetry environment     <pre><code>poetry install\n</code></pre></li> </ol>"},{"location":"sections/Development/How%20to/02_coding.html","title":"Update source code","text":"<ol> <li>Serve documentation locally     <pre><code>poetry run mkdocs serve\n</code></pre></li> <li>Change source code, including docstrings<ol> <li>Static type-checking <pre><code>poetry run mypy\n</code></pre></li> <li>Add or remove dependencies <pre><code>poetry add &lt;package name&gt;\n</code></pre> <pre><code>poetry remove &lt;package name&gt;\n</code></pre></li> <li>run tests <pre><code>poetry run pytest\n</code></pre></li> </ol> </li> </ol>"},{"location":"sections/Development/How%20to/03_publishing.html","title":"Publish new version","text":""},{"location":"sections/Development/How%20to/03_publishing.html#publishing-checklist","title":"Publishing checklist","text":"<ol> <li>Package validation<ol> <li>Check for dependency updates <pre><code>poetry update\n</code></pre></li> <li>Run tests <pre><code>poetry run pytest\n</code></pre></li> <li>Test build documentation <pre><code>poetry run mkdocs build\n</code></pre></li> <li>Static type-checking <pre><code>poetry run mypy\n</code></pre></li> </ol> </li> <li>Prepare for publishing<ol> <li>Bump version number in pyproject.toml</li> <li>Test build package <pre><code>poetry build\n</code></pre></li> <li>Git push version bump <pre><code>git commit -am \"bump version to X.X.X\"\ngit push\n</code></pre></li> <li>Tag version, and git push tags <pre><code>git tag X.X.X -m \"&lt;version changes summary&gt;\"\ngit push --tags\n</code></pre></li> </ol> </li> <li>Publishing to PyPI     <pre><code>poetry publish\n</code></pre></li> <li>Publishing documentation     <pre><code>poetry run mike deploy --push --update-aliases X.X.X latest\n</code></pre></li> </ol>"},{"location":"sections/Development/Resources/01_testing.html","title":"Testing","text":"<p>Testing commands are consolidated using the nox-poetry package.</p> <p>Nox manages virtual environments for different versions of python and consolidates development activities (e.g., testing, static type-checking) into a cli interface, while nox-poetry ensures that nox sessions have access to the same dependencies as the project's poetry.lock file.</p>"},{"location":"sections/Development/Resources/01_testing.html#using-nox-in-cli","title":"Using nox in CLI","text":"<p>Nox CLI commands can be viewed by running the following command from the project root:</p> <pre><code>poetry run nox\n</code></pre>"},{"location":"sections/Development/Resources/01_testing.html#updating-nox","title":"Updating nox","text":"<p>Nox commands can be updated in the noxfile.py file located in the project root.</p>"},{"location":"sections/Development/Resources/01_testing.html#key-nox-poetry-session-methods","title":"Key nox-poetry session methods","text":"<p>Make all poetry.lock dependencies (including dev) available to nox sessions:</p> python <pre><code>session.run_always(\"poetry\", \"install\", external=True)\n</code></pre> <p>Build package wheel and install within nox session using pip (e.g., for testing):</p> Option 1Option 2 <pre><code>session.install(\".\")\n</code></pre> <pre><code>session.installroot()\n</code></pre> <p>Install third-party packages, defaulting to the version specified in poetry.lock:</p> python <pre><code>session.install(\"pytest\")\n</code></pre>"},{"location":"sections/Development/Resources/02_mkdocs.html","title":"Documentation","text":"<p>Documentation is generated using mkdocs, in conjunction with the mkdocs-material theme and docstring parsing with mkdocstrings.</p> <p>Inspiration for generating API documentation was taken from mkdocstrings.</p> <p>Inspiration for documentation formatting was taken from the pydantic documentation, which is also generated using mkdocs. </p>"},{"location":"sections/Development/Resources/02_mkdocs.html#offline","title":"Offline","text":"<p>The documentation can be shared offline by running the following command from the project root:</p> <pre><code>poetry run mkdocs build\n</code></pre> <p>The documentation will be generated in the <code>site</code> directory. The documentation can be viewed by opening <code>site/index.html</code> in a browser.</p>"},{"location":"sections/Home/index.html","title":"Welcome","text":"<p>This package is a substitute for python standard library function logging.getLogger(), but pre-configured as rich logger.</p> <p>It also formats unhandled errors with rich traceback.</p>"},{"location":"sections/Home/User%20Guide/01_installation.html","title":"Installation","text":""},{"location":"sections/Home/User%20Guide/01_installation.html#install-with-pip","title":"Install with pip","text":"terminal <pre><code>pip install get-rich-logger\n</code></pre>"},{"location":"sections/Home/User%20Guide/01_installation.html#install-with-poetry","title":"Install with poetry","text":"terminal <pre><code>poetry add get-rich-logger\n</code></pre>"},{"location":"sections/Home/User%20Guide/02_example.html","title":"Example Usage","text":"Python <pre><code>import logging\nfrom get_rich_logger import getRichLogger\n\nlogger: logging.Logger = getRichLogger(  # (1)\n    logging_level=\"DEBUG\",\n    logger_name=__name__,\n)\n\ntry:\n    1 / 0\nexcept Exception as e:\n    logger.exception(\n        \"This is an example rich logger error message for handled\"\n        f\"exception! Error: {e}\"\n    )\n</code></pre> <ol> <li>Instantiate rich logger</li> </ol>"}]}