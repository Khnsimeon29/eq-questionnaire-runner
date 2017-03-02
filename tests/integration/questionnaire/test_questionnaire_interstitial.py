from tests.integration.create_token import create_token
from tests.integration.integration_test_case import IntegrationTestCase


class TestQuestionnaireInterstitial(IntegrationTestCase):

    BASE_URL = '/questionnaire/test/interstitial_page/789/'

    def test_interstitial_page_button_text_is_continue(self):
        token = create_token('interstitial_page', 'test')
        resp = self.client.get('/session?token=' + token.decode(), follow_redirects=True)

        post_data = {
            'csrf_token': self.extract_csrf_token(resp.get_data(True)),
            'action[start_questionnaire]': 'Start survey'
        }

        resp_url, resp = self.postRedirectGet(self.BASE_URL + 'favourite-foods/0/introduction', post_data)

        post_data = {
            'csrf_token': self.extract_csrf_token(resp.get_data(True)),
            "favourite-breakfast": "Cereal",
            "action[save_continue]": ""
        }

        resp_url, resp = self.postRedirectGet(resp_url, post_data)
        content = resp.get_data(True)

        self.assertTrue("Continue" in content, "The content of the interstitual page does not contain Continue as the button text")

    def test_interstitial_page_can_continue(self):
        token = create_token('interstitial_page', 'test')
        resp = self.client.get('/session?token=' + token.decode(), follow_redirects=True)

        post_data = {
            'csrf_token': self.extract_csrf_token(resp.get_data(True)),
            'action[start_questionnaire]': 'Start survey'
        }

        resp_url, resp = self.postRedirectGet(self.BASE_URL + 'favourite-foods/0/introduction', post_data)

        post_data = {
            'csrf_token': self.extract_csrf_token(resp.get_data(True)),
            "favourite-breakfast": "Cereal",
            "action[save_continue]": ""
        }

        resp_url, resp = self.postRedirectGet(resp_url, post_data)

        resp_url, resp = self.postRedirectGet(resp_url, {'csrf_token': self.extract_csrf_token(resp.get_data(True)), "action[save_continue]": ""})

        self.assertRegex(resp_url, 'lunch-block')
