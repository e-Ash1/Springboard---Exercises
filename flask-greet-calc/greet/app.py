# Put your app in here.
from flask import Flask, request

app = Flask(__name__)

if __name__ == "__main__":
    app.run(debug=True)
    
@app.route('/')
def index():
    return (
        '''
        <html>
            <body>
                <h1>Home Page</h1>
                <p>This is the Homepage</p>
            </body>
        </html>
        '''
    )

@app.route('/welcome')
def index_welcome():
    return('<h1>Welcome !</h1>')

@app.route('/welcome/home')
def index_home():
    return ('<h1>Welcome Home!')

@app.route('/welcome/back')
def index_back():
    return('<h1>Welcome back!')
    