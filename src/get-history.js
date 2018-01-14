import os from 'os';
import fs from 'fs';
import path from 'path';
import _ from 'lodash/fp';
import tailN from './tail-n';

function getPath() {
	if (process.env.HISTFILE) {
		return process.env.HISTFILE;
	}

  const homeDir = os.homedir();
  const shell = _.pipe(_.split('/'), _.last)(process.env.SHELL);
  switch (shell) {
    case 'bash':
    return path.join(homeDir, '.bash_history');
    case 'zsh':
    return path.join(homeDir, '.zsh_history');
    default:
		return path.join(homeDir, '.history');
  }
}

export default function getHistory() {
  return tailN(getPath(), 100)
    .then(_.map(line => {
		  if (/^: \d+:0;/.test(line)) {
		  	return line.slice(line.indexOf(';'));
		  }

		  return line;
	  }))
    .catch(_.constant([]));
};
