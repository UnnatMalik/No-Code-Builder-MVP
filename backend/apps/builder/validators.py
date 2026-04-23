from rest_framework.exceptions import ValidationError


SUPPORTED_TYPES = {
    "container",
    "heading",
    "text",
    "button",
    "image",
    "spacer",
    "row",
    "column",
    "card",
    "navbar",
    "footer",
}


def _validate_node(node, path="layout"):
    if not isinstance(node, dict):
        raise ValidationError({path: "Each layout element must be an object."})

    element_type = node.get("type")
    if not element_type:
        raise ValidationError({path: "Field 'type' is required."})

    if element_type not in SUPPORTED_TYPES:
        raise ValidationError({path: f"Unsupported type '{element_type}'."})

    image_src = node.get("src")
    if not image_src and isinstance(node.get("props"), dict):
        image_src = node["props"].get("src")

    if element_type == "image" and not image_src:
        raise ValidationError({path: "Image element requires field 'src'."})

    children = node.get("children")
    if children is not None:
        if not isinstance(children, list):
            raise ValidationError({path: "Field 'children' must be a list."})
        for index, child in enumerate(children):
            _validate_node(child, path=f"{path}.children[{index}]")


def validate_layout_payload(layout):
    _validate_node(layout)
