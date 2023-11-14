"""Madlibs Stories."""
from flask import Flask, render_template,request
import jinja2

app = Flask(__name__)


class Story:

    def __init__(self, words, text):
        """Create story with words and template text."""

        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


# Here's a story to get you started


story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time, long-ago in {place}, lived a
        {adjective} {noun}. It {verb} {plural_noun}."""
)

@app.route('/')
def index_page():
    prompts = story.prompts
    return render_template('index.html', prompts=prompts)

@app.route('/story', methods=['POST'])
def show_story():
    answers = request.form
    story_text = story.generate(answers)
    return render_template('story.html', story=story_text)

if __name__ == '__main__':
    app.run(debug=True)
