from rest_framework.exceptions import ValidationError


SUPPORTED_TYPES = {"container", "heading", "text", "button", "image", "spacer"}


def _validate_node(node, path="layout"):
    if not isinstance(node, dict):
        raise ValidationError({path: "Each layout element must be an object."})

    element_type = node.get("type")
    if not element_type:
        raise ValidationError({path: "Field 'type' is required."})

    if element_type not in SUPPORTED_TYPES:
        raise ValidationError({path: f"Unsupported type '{element_type}'."})

    if element_type == "image" and not node.get("src"):
        raise ValidationError({path: "Image element requires field 'src'."})

    if element_type == "container":
        children = node.get("children")
        if children is not None and not isinstance(children, list):
            raise ValidationError({path: "Field 'children' must be a list."})

    children = node.get("children")
    if children is not None:
        if not isinstance(children, list):
            raise ValidationError({path: "Field 'children' must be a list."})
        for index, child in enumerate(children):
            _validate_node(child, path=f"{path}.children[{index}]")


def validate_layout_payload(layout):
    _validate_node(layout)
