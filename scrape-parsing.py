#!/usr/local/bin/python

import json
import glob

in_glob_bills = "_data/mt/bill_*.json"
in_glob_votes = "_data/mt/vote_event_*.json"

out_path_1 = 'data-processed/scrape-2017.json'
out_path_app_votes = 'app/src/data/scrape-2017-votes.json'
out_path_app_bills = 'app/src/data/scrape-2017-bills.json'

# Utility functions
def get_js(path):
    with open(path) as f:
        data = json.load(f)
    return data

def write_js(path, data):
    with open(path, 'w') as f:
      json.dump(data, f, ensure_ascii=False, indent=4)
    
def main():
    bill_files = glob.glob(in_glob_bills)
    vote_files = glob.glob(in_glob_votes)

    bills = [get_js(file) for file in bill_files]
    votes = [get_js(file) for file in vote_files]
    
    write_js(out_path_1, {'bills': bills, 'votes': votes})
    write_js(out_path_app_bills, bills)
    write_js(out_path_app_votes, votes)
    
if __name__ == "__main__":
    main()