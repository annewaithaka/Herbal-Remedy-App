from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint('user', __name__)

@user_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created"}), 201

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials"}), 401

@user_bp.route('/me/reviews', methods=['GET'])
@jwt_required()
def get_user_reviews():
    current_user = get_jwt_identity()
    reviews = Review.query.filter_by(user_id=current_user).all()
    return jsonify([
        {'id': r.id, 'rating': r.rating, 'comment': r.comment, 'remedy_id': r.remedy_id} for r in reviews
    ]), 200
