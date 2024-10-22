from app import app
from models import db, User, Remedy

with app.app_context():
    db.create_all()
    
    # Create a sample user
    user = User(username='sampleuser', email='user@example.com')
    user.set_password('password')
    db.session.add(user)
    
    # Create sample remedies
    remedy1 = Remedy(name='Chamomile', description='A soothing herb that promotes relaxation.')
    remedy2 = Remedy(name='Ginger', description='A warming herb that aids digestion.')
    
    db.session.add(remedy1)
    db.session.add(remedy2)
    
    db.session.commit()
    print("Database seeded!")
