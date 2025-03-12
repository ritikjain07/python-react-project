from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Use environment variable for database if provided, otherwise use SQLite
database_url = os.environ.get('DATABASE_URL', 'sqlite:///friends.db')
# Fix for Heroku PostgreSQL URL
if database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Determine the static folder based on environment
is_production = os.environ.get('PRODUCTION') == 'true'

if is_production:
    # In production, static files are in the same directory
    static_folder = os.path.join(os.getcwd(), 'static')
else:
    # In development, use the frontend build folder
    frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
    static_folder = os.path.join(frontend_folder, "dist")

# Import models
from models import Friend

# Import and register blueprints
from routes import friends_bp
app.register_blueprint(friends_bp)

@app.route("/", defaults={'path': ''})
@app.route("/<path:path>")
def catch_all(path):
    # Debug information
    print(f"Request for path: {path}")
    print(f"Current directory: {os.getcwd()}")
    print(f"Static folder path: {static_folder}")
    print(f"Looking for file: {os.path.join(static_folder, path or 'index.html')}")
    print(f"File exists: {os.path.exists(os.path.join(static_folder, path or 'index.html'))}")
    
    # First, try to serve from static folder
    if path and os.path.exists(os.path.join(static_folder, path)):
        return send_from_directory(static_folder, path)
    
    # Check if index.html exists
    if os.path.exists(os.path.join(static_folder, 'index.html')):
        # If not found, serve the index.html (for SPA routing)
        return send_from_directory(static_folder, 'index.html')
    else:
        # Return a more helpful error message
        return f"Frontend files not found. Looking for {os.path.join(static_folder, 'index.html')}", 404

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=not is_production)