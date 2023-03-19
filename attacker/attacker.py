from flask import Flask, request, render_template, send_file, make_response
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

