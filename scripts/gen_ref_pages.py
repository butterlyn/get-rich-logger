"""
Generates API reference documentation that can be referenced in mkdocs
mkdocs.yml using:

=== "yaml"
    ```yaml
    nav:
    - API Reference: reference/
    ```

Modules can be excluded from API documentation using a leading underscore
in the file name.

!!! info "Reference"
    Script was derived from [mkdocstrings recipe](https://mkdocstrings.github.io/recipes/)
"""
from pathlib import Path
import mkdocs_gen_files

nav = mkdocs_gen_files.Nav()

src = Path(__file__).parent.parent / "src"

for path in sorted(src.rglob("*.py")):
    module_path = path.relative_to(src)
    module_path_without_suffix = module_path.with_suffix("")
    doc_path = path.relative_to(src).with_suffix(".md")
    full_doc_path = Path("reference", doc_path)

    parts = tuple(module_path_without_suffix.parts)

    # rename __init__.py files to {{ package name }}.md
    if parts[-1] == "__init__":
        parts = parts[:-1]
        doc_path = doc_path.parent.with_suffix(".md")
        full_doc_path = full_doc_path.parent.with_suffix(".md")
    # skip __main__.py files
    elif parts[-1] == "__main__":
        continue
    # filter out private modules (i.e., those starting with _)
    elif parts[-1].startswith("_"):
        continue

    nav[parts] = doc_path.as_posix()

    # Define the content of the page
    with mkdocs_gen_files.open(full_doc_path, "w") as fd:
        ident = ".".join(parts)

        fd.write(f"::: {ident}")

    mkdocs_gen_files.set_edit_path(full_doc_path, path)

with mkdocs_gen_files.open("reference/SUMMARY.md", "w") as nav_file:
    nav_file.writelines(nav.build_literate_nav())
