from configs import *

# Load all models
from models import *

# Load schemas after models
from schema import *


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)