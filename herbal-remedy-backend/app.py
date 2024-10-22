from flask import Flask
from config import Config
from models import db
from resources.user import user_bp
from resources.remedy import remedy_bp
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(remedy_bp, url_prefix='/api')

load_dotenv()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True)
