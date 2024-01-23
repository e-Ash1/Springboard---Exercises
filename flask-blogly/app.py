"""Blogly application."""

from flask import Flask, flash, redirect, render_template, request, url_for
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost/blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = '#######'

with app.app_context():
        connect_db(app)
        db.create_all()




@app.route('/')
def home_page():
    return redirect('/users')

# Route to show all users
@app.route('/users')
def list_users():
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('list.html', users=users)

# Route to add a new user
@app.route('/users/new', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        image_url = request.form['image_url'] or None  
        
        new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
        db.session.add(new_user)
        db.session.commit()
        flash('User created successfully!', 'success')
        return redirect(url_for('list_users'))

    return render_template('new.html')

# Route to show user details
@app.route('/users/<int:user_id>')
def show_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('detail.html', user=user)

# Route to edit a user
@app.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
def edit_user(user_id):
    user = User.query.get_or_404(user_id)
    if request.method == 'POST':
        user.first_name = request.form['first_name']
        user.last_name = request.form['last_name']
        user.image_url = request.form['image_url'] or None  
        db.session.commit()
        flash('User updated successfully!', 'success')
        return redirect(url_for('show_user', user_id=user.id))

    return render_template('edit.html', user=user)

# Route to delete a user
@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    flash('User deleted successfully!', 'danger')
    return redirect(url_for('list_users'))


if __name__ == "__main__":
    app.run(debug=True)

    

