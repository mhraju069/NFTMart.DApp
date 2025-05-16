from web3 import Web3
from eth_account.messages import encode_defunct

def verify_signature(address, signature, nonce):
    message = encode_defunct(text=nonce)
    public_key = Web3.eth.account.recover_message(message, signature=signature)
    return public_key.lower() == address.lower()


    