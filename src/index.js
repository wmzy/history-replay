#!/usr/bin/env node

import {h, Component, render} from 'ink';
import App from './App';

const unmounted = render(<App />);
process.on('beforeExit', () => {unmounted()});
