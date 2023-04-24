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

from flask import Flask, request, render_template, make_response
import json
from threading import Lock

app = Flask(__name__)

def prepare_filter_list():
	global filter_list
	global filter_list_lock
	filter_list = []
	filter_list_lock = Lock()
	with filter_list_lock:
		for i in open('filter-list.txt').read().split('\n'):
			if not i:
				continue
			filter_list.append([not bool(filter_list), i])

prepare_filter_list()

@app.route("/")
def hello_world():
	with filter_list_lock:
	    return render_template('index.html', filter_list=filter_list)

@app.route("/filter-list", methods=['GET', 'POST'])
def get_filter_list():
	if request.method == 'POST':
		with filter_list_lock:
			for index, line in enumerate(filter_list):
				line[0] = json.loads(request.form['c%d' % index])
		return 'Success'
	else:
		content = ''
		with filter_list_lock:
			for enable, line in filter_list:
				if enable:
					content += line + '\n'
		resp = make_response(content)
		resp.mimetype = 'text/plain'
		return resp

# https://stackoverflow.com/questions/59884338/
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

