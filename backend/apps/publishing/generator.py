from html import escape


BASE_CSS = """
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
    font-family: 'Plus Jakarta Sans', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
    background: #f8fafc;
    color: #0f172a;
    line-height: 1.6;
}
h1, h2, h3, h4, h5, h6 {
    margin: 0 0 12px;
    line-height: 1.2;
    letter-spacing: -0.02em;
}
p { margin: 0 0 12px; color: #334155; }
img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
}
button, a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 18px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
}
button {
    border: 0;
    background: #4f46e5;
    color: #ffffff;
    cursor: pointer;
}
a {
    color: inherit;
}
[data-node-type='container'] {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}
[data-node-type='row'] {
    align-items: stretch;
    flex-wrap: wrap;
}
[data-node-type='column'] {
    min-width: 240px;
}
[data-node-type='card'] {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}
[data-node-type='navbar'], [data-node-type='footer'] {
    width: 100%;
}
"""


def _render_style(styles):
    if not isinstance(styles, dict) or not styles:
        return ""
    safe_chunks = []
    for key, value in styles.items():
        safe_chunks.append(f"{escape(str(key))}:{escape(str(value))}")
    return ";".join(safe_chunks)


def _render_children(element):
    return "".join(render_element(child) for child in element.get("children", []))


def _render_with_tag(element, tag, default_styles=None):
    styles = element.get("styles") if isinstance(element.get("styles"), dict) else {}
    merged_styles = {**(default_styles or {}), **styles}
    style_attr = _render_style(merged_styles)
    style_str = f' style="{style_attr}"' if style_attr else ""

    class_name = element.get("className")
    class_str = f' class="{escape(str(class_name))}"' if class_name else ""
    type_str = f' data-node-type="{escape(str(element.get("type", "")))}"'

    return f"<{tag}{class_str}{type_str}{style_str}>{_render_children(element)}</{tag}>"


def render_element(element):
    element_type = element.get("type")
    style_attr = _render_style(element.get("styles"))
    style_str = f' style="{style_attr}"' if style_attr else ""

    class_name = element.get("className")
    class_str = f' class="{escape(str(class_name))}"' if class_name else ""
    type_str = f' data-node-type="{escape(str(element_type or ""))}"'

    if element_type == "text":
        return f"<p{class_str}{type_str}{style_str}>{escape(str(element.get('content', '')))}</p>"

    if element_type == "heading":
        level = int(element.get("level", 1)) if str(element.get("level", "1")).isdigit() else 1
        level = max(1, min(6, level))
        return f"<h{level}{class_str}{type_str}{style_str}>{escape(str(element.get('content', '')))}</h{level}>"

    if element_type == "button":
        props = element.get("props") if isinstance(element.get("props"), dict) else {}
        href = props.get("href") or element.get("href")
        label = escape(str(element.get("content", "")))
        if href:
            safe_href = escape(str(href))
            return f"<a{class_str}{type_str}{style_str} href=\"{safe_href}\">{label}</a>"
        return f"<button{class_str}{type_str}{style_str}>{label}</button>"

    if element_type == "image":
        props = element.get("props") if isinstance(element.get("props"), dict) else {}
        src = escape(str(element.get("src") or props.get("src", "")))
        alt = escape(str(element.get("alt") or props.get("alt") or element.get("content", "")))
        return f"<img{class_str}{type_str}{style_str} src=\"{src}\" alt=\"{alt}\" />"

    if element_type == "spacer":
        return f"<div{class_str}{type_str}{style_str}></div>"

    if element_type == "container":
        return _render_with_tag(element, "div")

    if element_type == "row":
        return _render_with_tag(element, "div", {"display": "flex", "gap": "12px"})

    if element_type == "column":
        return _render_with_tag(element, "div", {"flex": "1", "min-height": "120px"})

    if element_type == "card":
        return _render_with_tag(element, "section")

    if element_type == "navbar":
        return _render_with_tag(element, "nav")

    if element_type == "footer":
        return _render_with_tag(element, "footer")

    return ""


def _normalize_root_layout(layout):
    current = layout
    for _ in range(3):
        if not isinstance(current, dict):
            return {}
        if "type" in current:
            return current
        nested = current.get("layout")
        if isinstance(nested, dict):
            current = nested
            continue
        return {}
    return current if isinstance(current, dict) else {}


def render_document(layout):
    root = _normalize_root_layout(layout)
    body = render_element(root)
    return (
        "<!doctype html>"
        "<html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>"
        "<title>Published Site</title>"
        "<style>"
        f"{BASE_CSS}"
        "</style></head>"
        f"<body>{body}</body></html>"
    )
