from flask import Flask, render_template, redirect, url_for, flash, session, request
from models import db, User, Feedback  
from forms import FeedbackForm, DeleteForm  
from flask_login import login_required, current_user

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5000/feedback_db`
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
db.create_all()


@app.route('/users/<username>')
@login_required
def show_user(username):
    if username != session.get('username'):
        flash("You do not have permission to view this page.", "danger")
        return redirect(url_for('homepage'))

    user = User.query.filter_by(username=username).first_or_404()
    feedbacks = Feedback.query.filter_by(username=username).all()
    return render_template('user_detail.html', user=user, feedbacks=feedbacks)

@app.route('/users/<username>/delete', methods=['POST'])
@login_required
def delete_user(username):
    if username != session.get('username'):
        flash("You do not have permission for this action.", "danger")
        return redirect(url_for('homepage'))

    user = User.query.filter_by(username=username).first_or_404()
    Feedback.query.filter_by(username=username).delete()
    db.session.delete(user)
    db.session.commit()
    session.clear()
    flash("User and all associated feedback deleted.", "success")
    return redirect(url_for('homepage'))

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
@login_required
def add_feedback(username):
    if username != session.get('username'):
        flash("You do not have permission to add feedback as another user.", "danger")
        return redirect(url_for('homepage'))

    form = FeedbackForm()
    if form.validate_on_submit():
        new_feedback = Feedback(
            title=form.title.data,
            content=form.content.data,
            username=username
        )
        db.session.add(new_feedback)
        db.session.commit()
        flash("Feedback added!", "success")
        return redirect(url_for('show_user', username=username))
    return render_template('feedback_form.html', form=form)

@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
@login_required
def update_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if feedback.username != session.get('username'):
        flash("You do not have permission to edit this feedback.", "danger")
        return redirect(url_for('homepage'))

    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        flash("Feedback updated!", "success")
        return redirect(url_for('show_user', username=feedback.username))
    return render_template('feedback_form.html', form=form, feedback=feedback)

@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
@login_required
def delete_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if feedback.username != session.get('username'):
        flash("You do not have permission to delete this feedback.", "danger")
        return redirect(url_for('homepage'))

    db.session.delete(feedback)
    db.session.commit()
    flash("Feedback deleted!", "success")
    return redirect(url_for('show_user', username=feedback.username))
