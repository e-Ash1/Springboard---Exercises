#Import Library:
from flask import Flask, render_template, redirect, url_for
from forms import AddPetForm, EditPetForm
from extensions import db
from models import Pet


#Database Configuration: 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/pet_db'
app.config['SECRET_KEY'] = 'hee-hee'

#Instantiate database:
db.app = app
db.init_app(app)


# Route for the homepage
@app.route('/')
def home_page():
    # Query all pets from the database
    pets = Pet.query.all()
    # Render home template with pets data
    return render_template('home.html', pets=pets)

# Route for adding a new pet
@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    # Create an instance of the AddPetForm
    form = AddPetForm()
    # Validate form on submission
    if form.validate_on_submit():
        # Create a new Pet instance from form data
        new_pet = Pet(name=form.name.data, species=form.species.data, photo_url=form.photo_url.data, age=form.age.data, notes=form.notes.data)
        # Add new pet to database and commit
        db.session.add(new_pet)
        db.session.commit()
        # Redirect to homepage after adding pet
        return redirect(url_for('home_page'))
    # Render the add pet form template
    return render_template('add_pet.html', form=form)

# Route for editing an existing pet
@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def edit_pet(pet_id):
    # Retrieve the pet by id or return 404
    pet = Pet.query.get_or_404(pet_id)
    # Create an instance of the EditPetForm pre-filled with pet data
    form = EditPetForm(obj=pet)
    # Validate form on submission
    if form.validate_on_submit():
        # Update pet data from form data
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        # Commit changes to database
        db.session.commit()
        # Redirect to homepage after editing
        return redirect(url_for('home_page'))
    # Render the edit pet form template
    return render_template('edit_pet.html', form=form, pet=pet)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
