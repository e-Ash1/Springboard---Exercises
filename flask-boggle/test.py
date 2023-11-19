from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        """Stuff to do before every test."""

        # Set testing configuration, which will not affect the server
        app.config['TESTING'] = True
        app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

        # Get the test client
        self.client = app.test_client()

    def test_homepage(self):
        """Test if homepage loads and board is in session."""

        with self.client as client:
            response = client.get('/')
            html = response.get_data(as_text=True)

            # Check that the response is 200 OK
            self.assertEqual(response.status_code, 200)

            # Check if 'board' is in session
            self.assertIn('board', session)

            # Checks if certain HTML elements are in the response
            self.assertIn('<div id="boggle-board">', html)

    def test_valid_word(self):
        """Test if a valid word is correctly identified."""

        with self.client as client:
            with client.session_transaction() as change_session:
                change_session['board'] = [["C", "A", "T", "T", "T"],
                                           ["C", "A", "T", "T", "T"],
                                           ["C", "A", "T", "T", "T"],
                                           ["C", "A", "T", "T", "T"],
                                           ["C", "A", "T", "T", "T"]]
            response = client.get('/check-word?word=cat')
            self.assertEqual(response.json['result'], 'ok')

    def test_invalid_word(self):
        """Test if an invalid word is correctly identified."""

        with self.client as client:
            client.get('/')
            response = client.get('/check-word?word=impossible')
            self.assertEqual(response.json['result'], 'not-on-board')