#!/bin/bash
ganache \
  --database.dbPath ./ganache-db \
  --wallet.mnemonic "test test test test test test test test test test test junk" \
  --server.host 127.0.0.1 \
  --server.port 8545 \
  --chain.chainId 1337 \
  --miner.blockGasLimit 30000000 \
  --wallet.totalAccounts 10 \
  --logging.quiet false