from flask_sqlalchemy import SQLAlchemy

#SQLAlchemy intialization:
db = SQLAlchemy() 

default_img = 'https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc'

#User Class:
class User (db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(80), nullable = False)
    last_name = db.Column(db.String(80), nullable = False)
    image_url = db.Column(db.String(), default=default_img)
    
    def __init__ (self, first_name, last_name, image_url):
        self.first_name = first_name
        self.last_name = last_name
        self.image_url = image_url
    
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

#SQLAlchemy --> Flask Connection:
def connect_db(app):
    db.app=app
    db.init_app(app)
    
