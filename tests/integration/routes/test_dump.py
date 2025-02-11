from app.utilities.json import json_loads
from tests.integration.integration_test_case import IntegrationTestCase


class TestDumpDebug(IntegrationTestCase):
    def test_dump_debug_not_authenticated(self):
        # Given I am not an authenticated user
        # When I attempt to dump the questionnaire store
        self.get("/dump/debug")

        # Then I receive a 401 Unauthorised response code
        self.assertStatusUnauthorised()

    def test_dump_debug_authenticated_missing_role(self):
        # Given I am an authenticated user who has launched a survey
        # but does not have the 'dumper' role in my metadata
        self.launchSurvey("test_radio_mandatory_with_detail_answer_mandatory")

        # When I attempt to dump the questionnaire store
        self.get("/dump/debug")

        # Then I receive a 403 Forbidden response code
        self.assertStatusForbidden()

    def test_dump_debug_authenticated_with_role(self):
        # Given I am an authenticated user who has launched a survey
        # and does have the 'dumper' role in my metadata
        self.launchSurvey(
            "test_radio_mandatory_with_detail_answer_mandatory", roles=["dumper"]
        )

        # And I attempt to dump the questionnaire store
        self.get("/dump/debug")

        # Then I get a 200 OK response
        self.assertStatusOK()


class TestDumpSubmission(IntegrationTestCase):
    def test_dump_submission_not_authenticated(self):
        # Given I am not an authenticated user
        # When I attempt to dump the submission payload
        self.get("/dump/submission")

        # Then I receive a 401 Unauthorised response code
        self.assertStatusUnauthorised()

    def test_dump_submission_authenticated_missing_role(self):
        # Given I am an authenticated user who has launched a survey
        # but does not have the 'dumper' role in my metadata
        self.launchSurvey("test_radio_mandatory_with_detail_answer_mandatory")

        # When I attempt to dump the submission payload
        self.get("/dump/submission")

        # Then I receive a 403 Forbidden response code
        self.assertStatusForbidden()

    def test_dump_submission_authenticated_with_role_no_answers(self):
        # Given I am an authenticated user who has launched a survey
        # and does have the 'dumper' role in my metadata
        self.launchSurvey(
            "test_radio_mandatory_with_detail_answer_mandatory", roles=["dumper"]
        )

        # When I haven't submitted any answers
        # And I attempt to dump the submission payload
        self.get("/dump/submission")

        # Then I get a 200 OK response
        self.assertStatusOK()

        # And the JSON response contains the data I submitted
        actual = json_loads(self.getResponseData())
        # tx_id and submitted_at are dynamic; so copy them over
        expected = {
            "submission": {
                "version": "0.0.3",
                "survey_id": "0",
                "flushed": False,
                "origin": "uk.gov.ons.edc.eq",
                "type": "uk.gov.ons.edc.eq:surveyresponse",
                "tx_id": actual["submission"]["tx_id"],
                "submitted_at": actual["submission"]["submitted_at"],
                "case_id": actual["submission"]["case_id"],
                "collection": {
                    "period": "201604",
                    "exercise_sid": "789",
                    "schema_name": "test_radio_mandatory_with_detail_answer_mandatory",
                },
                "data": {"answers": [], "lists": []},
                "metadata": {"ru_ref": "123456789012A", "user_id": "integration-test"},
                "launch_language_code": "en",
                "submission_language_code": "en",
            }
        }

        assert actual == expected

    def test_dump_submission_authenticated_with_role_with_answers(self):
        # Given I am an authenticated user who has launched a survey
        # and does have the 'dumper' role in my metadata
        self.launchSurvey("test_radio_mandatory", roles=["dumper"])

        # When I submit an answer
        self.post(post_data={"radio-mandatory-answer": "Coffee"})

        # And I attempt to dump the submission payload
        self.get("/dump/submission")

        # Then I get a 200 OK response
        self.assertStatusOK()

        # And the JSON response contains the data I submitted
        actual = json_loads(self.getResponseData())

        # tx_id and submitted_at are dynamic; so copy them over
        expected = {
            "submission": {
                "version": "0.0.3",
                "survey_id": "0",
                "flushed": False,
                "origin": "uk.gov.ons.edc.eq",
                "type": "uk.gov.ons.edc.eq:surveyresponse",
                "tx_id": actual["submission"]["tx_id"],
                "started_at": actual["submission"]["started_at"],
                "submitted_at": actual["submission"]["submitted_at"],
                "case_id": actual["submission"]["case_id"],
                "collection": {
                    "period": "201604",
                    "exercise_sid": "789",
                    "schema_name": "test_radio_mandatory",
                },
                "data": {
                    "answers": [
                        {"answer_id": "radio-mandatory-answer", "value": "Coffee"}
                    ],
                    "lists": [],
                },
                "metadata": {"ru_ref": "123456789012A", "user_id": "integration-test"},
                "launch_language_code": "en",
                "submission_language_code": "en",
            }
        }
        assert actual == expected

    def test_dump_submission_authenticated_with_role_with_lists(self):
        # Given I am an authenticated user who has launched a survey
        # and does have the 'dumper' role in my metadata
        self.launchSurvey("test_relationships", roles=["dumper"])

        # When I submit my answers
        self.post({"anyone-else": "Yes"})
        self.post({"first-name": "John", "last-name": "Doe"})
        self.post({"anyone-else": "No"})

        # And I attempt to dump the submission payload
        self.get("/dump/submission")

        # Then I get a 200 OK response
        self.assertStatusOK()

        # And the JSON response contains the data I submitted
        actual = json_loads(self.getResponseData())

        # tx_id and submitted_at are dynamic; so copy them over
        expected = {
            "submission": {
                "version": "0.0.3",
                "survey_id": "0",
                "flushed": False,
                "origin": "uk.gov.ons.edc.eq",
                "type": "uk.gov.ons.edc.eq:surveyresponse",
                "tx_id": actual["submission"]["tx_id"],
                "started_at": actual["submission"]["started_at"],
                "submitted_at": actual["submission"]["submitted_at"],
                "case_id": actual["submission"]["case_id"],
                "collection": {
                    "period": "201604",
                    "exercise_sid": "789",
                    "schema_name": "test_relationships",
                },
                "data": {
                    "answers": [
                        {
                            "answer_id": "first-name",
                            "value": "John",
                            "list_item_id": actual["submission"]["data"]["answers"][0][
                                "list_item_id"
                            ],
                        },
                        {
                            "answer_id": "last-name",
                            "value": "Doe",
                            "list_item_id": actual["submission"]["data"]["answers"][0][
                                "list_item_id"
                            ],
                        },
                        {"answer_id": "anyone-else", "value": "No"},
                    ],
                    "lists": [
                        {
                            "name": "people",
                            "items": actual["submission"]["data"]["lists"][0]["items"],
                        }
                    ],
                },
                "metadata": {"ru_ref": "123456789012A", "user_id": "integration-test"},
                "launch_language_code": "en",
                "submission_language_code": "en",
            }
        }
        assert actual == expected


class TestDumpRoute(IntegrationTestCase):
    def test_dump_route_not_authenticated(self):
        # Given I am not an authenticated user
        # When I attempt to dump the questionnaire store
        self.get("/dump/routing-path")

        # Then I receive a 401 Unauthorised response code
        self.assertStatusUnauthorised()

    def test_dump_route_authenticated_missing_role(self):
        # Given I am an authenticated user who has launched a survey
        # but does not have the 'dumper' role in my metadata
        self.launchSurvey("test_radio_mandatory_with_detail_answer_mandatory")

        # When I attempt to dump the questionnaire store
        self.get("/dump/routing-path")

        # Then I receive a 403 Forbidden response code
        self.assertStatusForbidden()

    def test_dump_route_authenticated_with_role(self):
        # Given I am an authenticated user who has launched a survey
        # and does have the 'dumper' role in my metadata
        self.launchSurvey(
            "test_radio_mandatory_with_detail_answer_mandatory", roles=["dumper"]
        )

        # And I attempt to dump the questionnaire store
        self.get("/dump/routing-path")

        # Then I get a 200 OK response
        self.assertStatusOK()

    def test_dump_route_authenticated_with_role_no_answers(self):
        # Given I am an authenticated user who has launched a survey
        # and does have the 'dumper' role in my metadata
        self.launchSurvey(
            "test_radio_mandatory_with_detail_answer_mandatory", roles=["dumper"]
        )

        # When I haven't submitted any answers
        # And I attempt to dump the submission payload
        self.get("/dump/routing-path")

        # Then I get a 200 OK response
        self.assertStatusOK()

        # And the JSON response contains the data I submitted
        actual = json_loads(self.getResponseData())
        # tx_id and submitted_at are dynamic; so copy them over
        expected = [
            {
                "section_id": "default-section",
                "list_item_id": None,
                "routing_path": ["radio-mandatory"],
            }
        ]

        assert actual == expected

    def test_dump_submission_authenticated_with_role_with_answers(self):
        # Given I am an authenticated user who has launched a survey
        # and does have the 'dumper' role in my metadata
        self.launchSurvey("test_radio_mandatory", roles=["dumper"])

        # When I submit an answer
        self.post(post_data={"radio-mandatory-answer": "Coffee"})

        # And I attempt to dump the submission payload
        self.get("/dump/routing-path")

        # Then I get a 200 OK response
        self.assertStatusOK()

        # And the JSON response contains the data I submitted
        actual = json_loads(self.getResponseData())

        # tx_id and submitted_at are dynamic; so copy them over
        expected = [
            {
                "section_id": "default-section",
                "list_item_id": None,
                "routing_path": ["radio-mandatory"],
            }
        ]
        assert actual == expected
