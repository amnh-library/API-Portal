import base64
import requests
import json
import os
import threading

# auth stuff
client_key = os.environ['SIERRA_API_KEY']
client_secret = os.environ['SIERRA_API_SECRET']

def get_access_token(client_key, client_secret):
    '''get the oauth access token'''
    response = get_auth(client_key, client_secret)
    r = json.loads(response.text)

    return r['access_token']

def get_auth(client_key,client_secret):
    '''get auth'''
    encoded = get_encoded(client_key, client_secret)
    url = 'https://libcat1.amnh.org/iii/sierra-api/v3/token'

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + str(encoded)[2:-1]
    }

    payload={'grant_type': 'client_credentials'}
    response = requests.post(url, data=payload, headers=headers)

    return response

def get_encoded(client_key,client_secret):
    '''get encoded client_key:client_secret,
    gets appended to url to request auth'''
    client_key_and_secret = str(client_key + ':' + client_secret)
    b_client_key_and_secret = client_key_and_secret.encode('utf-8')
    encoded = base64.b64encode(b_client_key_and_secret)

    return encoded

# request stuff
def get(url, access_token):
    headers = {'Authorization': 'Bearer ' + access_token}

    return requests.get(url, headers=headers)

# search stuff
def get_results(url, entity, access_token, offset):
    '''get a search result
    response is json'''
    url = "{}/{}/?limit=2000&offset={}".format(url, entity, offset)
    response = get(url, access_token)

    return json.loads(response.text)

def save_results(results, directory):
    for datum in results:
        id = datum['id']
        path = '{}/{}.json'.format(directory, id)

        with open(path, 'w+') as f:
            js_data = json.dumps(datum)
            f.write(js_data)

def get_and_save_results(base_url, access_token, offset):
    results = get_results(base_url, 'bibs', access_token, offset)
    save_results(results['entries'], 'sierra/data/bibs')

    print "saved offset: {}".format(offset)


def get_and_save_range(base_url, access_token, offset, pages):
    for i in range(pages):
        get_and_save_results(base_url, access_token, i * 2000 + offset)

base_url = 'https://libcat1.amnh.org/iii/sierra-api/v3'
# access token wasn't working... not sure why
access_token = get_access_token(client_key, client_secret)
threads = []

for i in range(6):
    t = threading.Thread(target=lambda: get_and_save_range(base_url, access_token, i * 34000, 17))
    threads.append(t)
    t.start()
