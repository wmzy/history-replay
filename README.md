[![Build Status](https://travis-ci.org/wmzy/history-replay.svg?branch=master)](https://travis-ci.org/wmzy/history-replay)
[![Coverage Status](https://coveralls.io/repos/github/wmzy/history-replay/badge.svg?branch=master)](https://coveralls.io/github/wmzy/history-replay?branch=master)
# history-replay

> run multi commands in your history quickly

## Usage

```bash
sudo npm install history-replay -g
# or just a try
npx history-replay
```

## On Bash

```bash
# add to your ~/.bashrc
alias history-replay='history -w && history-replay'
```

## Note

Only test on `zsh` and `bash`.
