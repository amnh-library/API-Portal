import requests
import json
import math
import os
import xmltodict

BASE_URL = 'http://data.library.amnh.org:8082/exist/rest/db/xeac/records/'

def get(id):
    path = BASE_URL + id

    return requests.get(path)

def get_xml(id):
    return xmltodict.parse(get(id).content)

def get_record_ids():
    response = requests.get(BASE_URL)
    data = xmltodict.parse(response.content)

    return [r['@name'] for r in data['exist:result']['exist:collection']['exist:resource']]

def get_stuff(records, directory):
    for name in records:
        datum = get_xml(name)
        id = name[:-4]
        path = '{}/{}.json'.format(directory, id)

        with open(path, 'w+') as f:
            js_data = json.dumps(datum)
            f.write(js_data)

def get_all():
    directory = 'xeac/data/records'

    if not os.path.exists(directory):
        os.makedirs(directory)

    get_stuff(get_record_ids(), directory)

get_all()