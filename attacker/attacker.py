from flask import Flask, send_file

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, Attacker!</p> <a href='/filter-list.txt'>Filter List</a>"

@app.route("/filter-list.txt")
def filter_list():
	return send_file('filter-list.txt')

