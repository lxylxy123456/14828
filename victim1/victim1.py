from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('index.html', name='a')

@app.route("/redirect")
def redirect():
	return 0/0

