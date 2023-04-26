#
#   Demo of Arbitrary Code Injection in Adblock Plus
#   Copyright (C) 2023  Eric Li, Teresa Alberto, and Chengcheng Ding
#
#   This program is free software: you can redistribute it and/or modify
#   it under the terms of the GNU Affero General Public License as published
#   by the Free Software Foundation, either version 3 of the License, or
#   (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU Affero General Public License for more details.
#
#   You should have received a copy of the GNU Affero General Public License
#   along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

from flask import Flask, request, render_template, make_response, redirect
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
redir_url = '/static/dynamic-replace.js'
user_js = ''
global_lock = Lock()

def compute_csp():
	ans = []
	with global_lock:
		for enable, line in csp_list:
			if enable:
				ans.append(line.strip())
	return ' '.join(ans)

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
		with global_lock:
			return redirect(redir_url)

@app.route("/upload/user.js", methods=['GET', 'POST'])
def save_user_script():
	global user_js
	if request.method == 'POST':
		with global_lock:
			user_js = request.form['user']
		return 'Success'
	else:
		with global_lock:
			resp = make_response(user_js)
			resp.mimetype = 'text/plain'
			return resp

@app.route("/advertisement", methods=['GET'])
def parse_url_args():
	city = request.args.get('city')
	role = request.args.get('role')
	company = request.args.get('company')
	return "Buy this special offer for {} of {} in {}!".format(role, company,
																city)

@app.after_request
def add_security_headers(resp):
	resp.headers['Content-Security-Policy'] = compute_csp()
	return resp

