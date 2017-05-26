from flask import url_for
from jinja2 import escape
from app.helpers.schema_helper import SchemaHelper
from app.questionnaire.path_finder import PathFinder
from app.templating.summary.group import Group


def build_summary_rendering_context(schema_json, answer_store, metadata):
    """
    Build questionnaire summary context containing metadata and content from the answers of the questionnaire
    :param schema_json: schema of the current questionnaire
    :param answer_store: all of the answers to the questionnaire
    :param metadata: all of the metadata
    :return: questionnaire summary context
    """
    navigator = PathFinder(schema_json, answer_store, metadata)
    path = navigator.get_routing_path()
    groups = []

    for group in schema_json['groups']:
        if SchemaHelper.group_has_questions(group) \
                and group['id'] in [location.group_id for location in path]:

            answers = answer_store.map()

            for answer_id, value in answers.items():
                if isinstance(value, str):
                    answers[answer_id] = escape(value)

            groups.extend([Group(group, answers, path, metadata, url_for)])

    return groups
