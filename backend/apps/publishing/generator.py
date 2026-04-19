from html import escape


def _render_style(styles):
    if not isinstance(styles, dict) or not styles:
        return ""
    safe_chunks = []
    for key, value in styles.items():
        safe_chunks.append(f"{escape(str(key))}:{escape(str(value))}")
    return ";".join(safe_chunks)


def render_element(element):
    element_type = element.get("type")
    style_attr = _render_style(element.get("styles"))
    style_str = f' style="{style_attr}"' if style_attr else ""

    class_name = element.get("className")
    class_str = f' class="{escape(str(class_name))}"' if class_name else ""

    if element_type == "text":
        return f"<p{class_str}{style_str}>{escape(str(element.get('content', '')))}</p>"

    if element_type == "heading":
        level = int(element.get("level", 1)) if str(element.get("level", "1")).isdigit() else 1
        level = max(1, min(6, level))
        return f"<h{level}{class_str}{style_str}>{escape(str(element.get('content', '')))}</h{level}>"

    if element_type == "button":
        return f"<button{class_str}{style_str}>{escape(str(element.get('content', '')))}</button>"

    if element_type == "image":
        src = escape(str(element.get("src", "")))
        alt = escape(str(element.get("alt", "")))
        return f"<img{class_str}{style_str} src=\"{src}\" alt=\"{alt}\" />"

    if element_type == "spacer":
        return f"<div{class_str}{style_str}></div>"

    if element_type == "container":
        children_html = "".join(render_element(child) for child in element.get("children", []))
        return f"<div{class_str}{style_str}>{children_html}</div>"

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
        "<title>Published Site</title></head>"
        f"<body>{body}</body></html>"
    )
