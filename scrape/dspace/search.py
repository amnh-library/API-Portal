import json
import os
from os import listdir
from os.path import isfile, join
import re
from datetime import datetime
from elasticsearch import Elasticsearch
es = Elasticsearch(os.environ['ELASTICSEARCH_DEV'])

def load(path):
    results = []
    files = [f for f in listdir(path) if isfile(join(path, f)) and f[-4:] == 'json']
    for f in files:
        full_path = join(path, f)
        with open(full_path, 'r') as handle:
            results.append(handle.read())
    return results


def files_to_elastic_search(index, files):
    es.indices.create(index=index, ignore=400)
    for f in files:
        data = json.loads(f)
        es.create(index=index, body=data, doc_type=index, id=data['id'])


def find(files, query):
    keywords = query.lower().split(' ')
    results = []
    for v in files:
        found = False
        lv = v.lower()
        for keyword in keywords:
            if keyword in lv:
                found = True
        if found:
            results.append(v)
    return results


def upload_to_elastic_search(path, index):
    files = load(path)
    files_to_elastic_search(index, files)


for resource in ['collections', 'items', 'communities']:
    upload_to_elastic_search('dspace/data/' + resource, 'dspace_' + resource[:-1])

upload_to_elastic_search('dspace/data/' + resource, 'dspace_community')
