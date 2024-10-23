from flask import Blueprint, request, jsonify
from models import db, Remedy
from flask_jwt_extended import jwt_required  # Add this import


remedy_bp = Blueprint('remedy', __name__)

@remedy_bp.route('/remedies', methods=['GET'])
@jwt_required()  # Protect this endpoint
def get_remedies():
    remedies = Remedy.query.all()
    return jsonify([{'id': r.id, 'name': r.name, 'description': r.description} for r in remedies]), 200

@remedy_bp.route('/remedies', methods=['POST'])
@jwt_required()  # Protect this endpoint
def add_remedy():
    data = request.json
    remedy = Remedy(name=data['name'], description=data['description'])
    db.session.add(remedy)
    db.session.commit()
    return jsonify({"message": "Remedy added"}), 201

@remedy_bp.route('/remedies/<int:remedy_id>/reviews', methods=['POST'])
@jwt_required()
def add_review(remedy_id):
    data = request.json
    current_user = get_jwt_identity()  # Get the current user's ID
    review = Review(
        rating=data['rating'],
        comment=data.get('comment'),
        remedy_id=remedy_id,
        user_id=current_user
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review added"}), 201

@remedy_bp.route('/remedies/<int:remedy_id>/reviews', methods=['GET'])
def get_reviews(remedy_id):
    reviews = Review.query.filter_by(remedy_id=remedy_id).all()
    return jsonify([
        {'id': r.id, 'rating': r.rating, 'comment': r.comment, 'user_id': r.user_id} for r in reviews
    ]), 200

