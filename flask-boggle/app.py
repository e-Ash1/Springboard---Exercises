from flask import Flask, request, render_template, jsonify, session
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = '#######'

boggle_game = Boggle()

# Load words from file
with open('words.txt') as f:
    valid_words = set(f.read().splitlines())



@app.route('/')
def homepage():
    """Display the game board."""
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('index.html', board=board)

@app.route('/verify_word', methods=['POST'])
def verify_word():
    word = request.json.get('word', '')
    board = session['board']
    result = boggle_game.check_valid_word(board,word)
    return jsonify({'is_valid': result})

@app.route('/check-word')
def check_word():
    """Check if a word is valid."""
    word = request.args.get('word', '')
    board = session['board']
    result = boggle_game.check_valid_word(board, word)
    return jsonify({'result': result})

@app.route('/post-score', methods=['POST'])
def post_score():
    """Handle posting of score."""
    score = request.json.get('score')
    # Update statistics like highest score or number of games played
    # Logic for updating stats goes here
    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    app.run(debug=True)
