#! /usr/bin/python3
import random
import string
import time
from typing import Any, List, Optional
import requests

SERVER = "http://localhost:3000"
class InvalidResponse(Exception):
    pass

def check_request_response(response: requests.Response) -> requests.Response:
    if response.status_code < 200 or response.status_code >= 300:
        raise InvalidResponse("Received error code %d: %s" %
                              (response.status_code, response.content))
    return response

def get_random_block_id() -> Optional[int]:
    blocks: List[Any] = [x["id"] for x in check_request_response(requests.get(f"{SERVER}/blocks")).json()]
    if blocks:
        return random.choice(blocks)
    return None

def main():
    color_names: List[str] = [x["name"] for x in check_request_response(requests.get(f"{SERVER}/colors")).json()]
    id_counter = sorted([x["id"] for x in check_request_response(requests.get(f"{SERVER}/blocks")).json()])[-1] + 1
    while True:
        #Select a random action
        action = random.randint(0,2)
        if action == 0:
            # Add a block
            requests.post(f"{SERVER}/blocks", json={
                "id": id_counter,
                "name": random.choice(string.ascii_uppercase),
                "color": random.choice(color_names)
            })
            id_counter += 1
        elif action == 1:
            # Remove a block
            block_id = get_random_block_id()
            if block_id:
                check_request_response(requests.delete(f"{SERVER}/blocks/{block_id}"))
        else:
            # Change a color of a block
            block_id = get_random_block_id()
            if block_id:
                check_request_response(requests.patch(f"{SERVER}/blocks/{block_id}", json={"color": random.choice(color_names)}))


        time.sleep(10)


if __name__ == "__main__":
    main()
