# Import Library:
from flask import Flask, request, jsonify, render_template
from models import db, Cupcake, connect_db

# Initialize the Flask application
app = Flask(__name__)

# Configure the SQLAlchemy URI for PostgreSQL and disable track modifications
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/cupcakes_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Connect the database with the Flask app
connect_db(app)

# Before handling any request, ensure that all database tables are created
@app.before_request
def create_tables():
    return db.create_all();

# Define the route for the homepage
@app.route('/')
def homepage():
    # Render and return the frontend HTML template
    return render_template('frontend.html')

# Define the route to get data about all cupcakes
@app.route('/api/cupcakes')
def get_cupcakes():
    # Query the database to get all cupcakes
    cupcakes = Cupcake.query.all()
    # Serialize each cupcake into a dictionary
    serialized = [c.serialize() for c in cupcakes]
    # Return the data in JSON format
    return jsonify(cupcakes=serialized)

# Define the route to get data about a single cupcake by its ID
@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    # Query the database to get a specific cupcake, return 404 if not found
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    # Return the cupcake data in JSON format
    return jsonify(cupcake=cupcake.serialize())

# Define the route to create a new cupcake
@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    # Get the data sent in the request
    data = request.json
    # Create a new Cupcake instance with the provided data
    new_cupcake = Cupcake(flavor=data['flavor'], size=data['size'], rating=data['rating'], image=data.get('image'))
    # Add the new cupcake to the database session and commit the transaction
    db.session.add(new_cupcake)
    db.session.commit()
    # Return the data of the new cupcake in JSON format
    return jsonify(cupcake=new_cupcake.serialize()), 201

# Define the route to update an existing cupcake
@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    # Query the database for the specific cupcake, return 404 if not found
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    # Get the updated data sent in the request
    data = request.json
    # Update the cupcake's attributes with the new data
    cupcake.flavor = data.get('flavor', cupcake.flavor)
    cupcake.size = data.get('size', cupcake.size)
    cupcake.rating = data.get('rating', cupcake.rating)
    cupcake.image = data.get('image', cupcake.image)
    # Commit the changes to the database
    db.session.commit()
    # Return the updated data in JSON format
    return jsonify(cupcake=cupcake.serialize())

# Define the route to delete a cupcake
@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    # Query the database for the specific cupcake, return 404 if not found
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    # Delete the cupcake from the database
    db.session.delete(cupcake)
    # Commit the transaction
    db.session.commit()
    # Return a confirmation message in JSON format
    return jsonify(message="Deleted")

# Run the Flask application in debug mode if this script is the main program
if __name__ == '__main__':
    app.run(debug=True)
