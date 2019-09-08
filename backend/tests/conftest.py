from app import create_app
from config import TestingConfig
import pytest

@pytest.fixture
def app():
    app = create_app(running_config=TestingConfig)
    return app