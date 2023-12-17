# Import the SQLAlchemy module
from flask_sqlalchemy import SQLAlchemy

# Create an instance of the SQLAlchemy class
db = SQLAlchemy()

# Definition of Database:
class Cupcake(db.Model):
    # Set the table name to 'cupcakes'
    __tablename__ = 'cupcakes'

    # Define table columns
    # - 'id' is an integer primary key with auto-increment
    # - 'flavor' is a text column and cannot be NULL
    # - 'size' is a text column and cannot be NULL
    # - 'rating' is a float column and cannot be NULL
    # - 'image' is a text column with a default value of a demo cupcake image URL
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default='https://tinyurl.com/demo-cupcake')

    # Define a serialize method for the Cupcake class
    def serialize(self):
        # Return a dictionary with the cupcake's attributes
        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }

# Define a function to connect the Flask app with the database
def connect_db(app):
    # Initialize the database with the Flask app
    db.init_app(app)
