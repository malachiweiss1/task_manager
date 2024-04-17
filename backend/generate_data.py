import mysql.connector  # Import MySQL connector to interact with MySQL database
from hugchat import hugchat  # Importing hugchat library for chatbot interaction
from hugchat.login import Login  # Importing Login class for authentication
import json  # Import JSON module for JSON manipulation
from constants import *


def func(data_list):
    """
    Function to insert task data into MySQL database.
    
    Parameters:
        data_list (list): List containing task data in the format [title, description, completed, task_group].
                          Each sublist represents a task.
    """
    print(data_list)  # Print the received data list
    # Establish a connection to the MySQL database
    db_connection = mysql.connector.connect(conn_string)
    cursor = db_connection.cursor()  # Create a cursor object to execute SQL queries
    try:
        for task in data_list:  # Iterate through each task in the data list
            # Execute SQL query to insert task data into 'tasks' table
            cursor.execute("INSERT INTO tasks (title, description, completed, task_group) VALUES (%s, %s, %s, %s)",
                           (task[0], task[1], task[2], task[3]))
            db_connection.commit()  # Commit the transaction
    except mysql.connector.Error as error:
        print("Error inserting task:", error)  # Print error message if insertion fails
    finally:
        cursor.close()  # Close the cursor
        db_connection.close()  # Close the database connection


def getChatBot():
    """
    Function to get an instance of the chatbot with authentication.
    
    Returns:
        hugchat.ChatBot: Instance of the chatbot with authentication.
    """
    
    cookie_path_dir = "./cookies"  # Directory path for storing cookies
    sign = Login(EMAIL, PASSWD)  # Create a Login object with email and password
    cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)  # Login and get cookies
    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())  # Create a chatbot instance with cookies
    return chatbot


def chat(prompt, chatbot):
    """
    Function to interact with the chatbot.
    
    Parameters:
        prompt (str): Prompt message for the chatbot.
        chatbot (hugchat.ChatBot): Instance of the chatbot.
    
    Returns:
        str: Response from the chatbot.
    """
    return chatbot.chat(prompt)  # Get response from the chatbot


prompt = """
"""  # Prompt message for the user


# Open the file in read mode
with open("prompt.txt", "r") as file:
    # Read the content of the file
    prompt = file.read()

data_list = json.loads(str(chat(prompt, getChatBot())))  # Get task data list from the chatbot
func(data_list)  # Call function to insert task data into MySQL database
