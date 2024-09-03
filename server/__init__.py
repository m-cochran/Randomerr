from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    from . import app
    app.register_blueprint(app.bp)

    return app
