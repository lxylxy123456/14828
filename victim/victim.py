from flask import Flask, request, render_template, redirect
import json
from threading import Lock

app = Flask(__name__)

ATTACKER = 'http://attacker.local:8080'

csp_list = [
	[True, "script-src 'self'"],
	[True, "           'unsafe-eval'"],
	[True, "           *"],
	[True, "         ;"],
	[True, "object-src 'none';"],
	[True, "base-uri 'none';"],
	[False, "connect-src 'self';"],
]
redir_url = '/static/replace.js'
global_lock = Lock()

@app.route("/")
def hello_world():
	with global_lock:
		return render_template('index.html', redir_url=redir_url,
								csp_list=csp_list, ATTACKER=ATTACKER)

@app.route("/csp-list", methods=['POST'])
def set_csp_list():
	assert request.method == 'POST'
	with global_lock:
		for index, line in enumerate(csp_list):
			line[0] = json.loads(request.form['c%d' % index])
	return 'Success'

@app.route("/redirect", methods=['GET', 'POST'])
def open_redirect():
	global redir_url
	if request.method == 'POST':
		with global_lock:
			redir_url = request.form['url']
		return 'Success';
	else:
		# TODO: return CSP?
		with global_lock:
			return redirect(redir_url)

