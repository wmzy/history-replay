import os from 'os';
import path from 'path';

export const shellPath = process.env.SHELL || '/bin/bash';
export const shellName = shellPath.split('/').pop();
export const dataPath = process.env.HISTORY_REPLAY_PATH || path.join(os.homedir(), '.history_replay')
export const scriptPath = path.join(dataPath, `${shellName}-history.sh`)
