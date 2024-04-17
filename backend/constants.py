import yaml  # Importing the YAML module to work with YAML files
from flask_mysqldb import MySQL  # Importing MySQL extension for Flask
from flask_cors import CORS  # Importing CORS extension for Flask
from flask import Flask  # Importing Flask framework

# Reading the configuration from a YAML file
with open('.\config.yaml') as f:
    data = yaml.load(f, Loader=yaml.FullLoader)

# Extracting database connection details from the YAML data
HOST = data['database_my_sql_tasks']['host']  # Database host
USER = data['database_my_sql_tasks']['user']  # Database user
PWD = data['database_my_sql_tasks']['password']  # Database password
DATABASE_NAME = data['database_my_sql_tasks']['database']  # Database name

# Extracting email and password for chatbot from the YAML data
EMAIL = data['chatbot_details']['email']  # Chatbot email
PASSWD = data['chatbot_details']['password']  # Chatbot password

# Creating a dictionary containing connection parameters for MySQL
connection_parameters = {
    'host': HOST,
    'user': USER,
    'password': PWD,
    'database': DATABASE_NAME
}

# Generating a connection string from the connection parameters
conn_string = ";".join([f"{key}={value}" for key, value in connection_parameters.items()])

# Creating a Flask application instance
app = Flask(__name__)

# Enabling Cross-Origin Resource Sharing (CORS) for the Flask app
CORS(app)

# MySQL Configuration for the Flask app
app.config['MYSQL_HOST'] = HOST
app.config['MYSQL_USER'] = USER
app.config['MYSQL_PASSWORD'] = PWD
app.config['MYSQL_DB'] = DATABASE_NAME

# Initializing MySQL extension with the Flask app
mysql = MySQL(app)
