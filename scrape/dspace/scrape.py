import requests
import json
import math
import os

def get_dspace(entity):
    uri = "https://digitallibrary.amnh.org/rest/{}".format(entity)

    return requests.get(uri, verify=False)

def get_stuff(entity, directory):
    response = get_dspace(entity)
    data = json.loads(response.content)

    for datum in data:
        id = datum['id']
        path = '{}/{}.json'.format(directory, id)

        with open(path, 'w+') as f:
            js_data = json.dumps(datum)
            f.write(js_data)

def get_all(entity):
    directory = 'dspace/data/{}'.format(entity)

    if not os.path.exists(directory):
        os.makedirs(directory)

    get_stuff(entity, directory)


for resource in ['collections', 'items', 'communities']:
    get_all(resource)

'''
def main(argv):
    # Global debug flag allows you to use one debug value throughout your code
    global _debug
    global params

    no_args = True

    # Getopt allows you to specify flag, full argument type, and input :args
    try:
        opts, args = getopt.getopt(argv, "ht:d",
                                   ["help", "datadir"])
    except getopt.GetoptError:
        usage()
        sys.exit(2)

    # Each if statement handles an option opt and an :arg as per above
    # If you wanted something to happen with just an option and no
    # arguments, you'd handle it here
    for opt, arg in opts:
        if (opt in ("-h", "--help")):
            usage()
            sys.exit(2)
        elif (opt in ("-t", "--datadir")):
            data_directory = arg
            no_args = False
        elif (opt == "-d"):
            _debug = True

    if (no_args):
        # Sometimes you need arguments; sometimes you don't!
        # Default behavior for no arguments would go here
        # In this case we require args so we print out the usage
        usage()
        sys.exit(2)
    else:
        # This is where all the argument handling happens
        # Eventually we'll add the ability to change these parameters from CLI
        print process_random_org_query(inputsize)
        print process_random_org_query(inputsize)
        print process_random_org_query(inputsize)
        print process_random_org_query(inputsize)


def usage():
    print "usage: python eventbrite.py [-i inputFile ]..."
    print "Options and arguments:"
    print "-t data directory : specify (also --datadir)"
    print "-d : debug output"
    print "-h : print this help message and exit (also --help)"


if __name__ == "__main__":
    main(sys.argv[1:])
'''