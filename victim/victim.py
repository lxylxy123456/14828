from flask import Flask, request, render_template, redirect
from threading import Lock

app = Flask(__name__)

redir_url = '/static/replace.js'
redir_url_lock = Lock()

@app.route("/")
def hello_world():
	with redir_url_lock:
	    return render_template('index.html', redir_url=redir_url)

@app.route("/redirect", methods=['GET', 'POST'])
def open_redirect():
	global redir_url
	if request.method == 'POST':
		with redir_url_lock:
			redir_url = request.form['url']
		return 'Success';
	else:
		with redir_url_lock:
			return redirect(redir_url)

