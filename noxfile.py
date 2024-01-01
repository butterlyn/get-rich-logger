import nox
from nox_poetry import (
    Session,
    session,
)

# an empty list will display all sessions for command `nox`
nox.options.sessions = []
# nox.options.reuse_existing_virtualenvs = True


@session(python=["3.10"], reuse_venv=True)
def check(session: Session) -> None:
    """Static type checking with mypy"""
    session.run_always("poetry", "install", external=True)
    session.install("mypy")
    session.run("mypy")
