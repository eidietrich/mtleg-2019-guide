#!/usr/local/bin/python

import json
import glob

out_path_1 = 'data-processed/scrape-2019-02-23.json'
out_path_app_votes = 'app/src/data/scrape-2019-02-23-votes.json'
out_path_app_bills = 'app/src/data/scrape-2019-02-23-bills.json'

# Utility functions
def get_js(path):
    with open(path) as f:
        data = json.load(f)
    return data

def write_js(path, data):
    with open(path, 'w') as f:
      json.dump(data, f, ensure_ascii=False, indent=4)
    
def main():
    bill_files = glob.glob("_data/mt/bill_*.json")
    vote_files = glob.glob("_data/mt/vote_event_*.json")

    bills = [get_js(file) for file in bill_files]
    votes = [get_js(file) for file in vote_files]
    
    write_js(out_path_1, {'bills': bills, 'votes': votes})
    write_js(out_path_app_bills, bills)
    write_js(out_path_app_votes, votes)
    
if __name__ == "__main__":
    main()