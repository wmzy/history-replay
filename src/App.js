import {spawnSync} from 'child_process';
import fs from 'fs';
import readline from 'readline';
import _ from 'lodash/fp';
import {h, Component, render} from 'ink';
import {List, ListItem} from 'ink-checkbox-list';
import getHistory from './get-history';
import * as u from './util';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commandsSelect: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    process.stdin.on('keypress', this.keyMap);

    getHistory()
     .then(commands => {
       let start = 0;
       let end = 0;
       for (let i = commands.length - 1; i > 2; i--) {
         const index = commands.lastIndexOf(commands[i], i - 1);
         if (index === -1) continue;
         if (commands[i - 1] !== commands[index - 1]) continue;
         end = i;
         start = i - 1;
         let start2 = index - 1;
         while(start > index && start2 >= 0 && commands[start] === commands[start2]) {
           start--;
           start2--;
         }
         break;
       }
       const commandsSelect = end === 0 ? commands.slice(commands.length - 5) : commands.slice(start + 1, end + 1);
       this.setState({commandsSelect});
      });
  }

  componentWillUnmount() {
    process.removeListener('keypress', this.keyMap);
  }

  handleSubmit(commands) {
    this.setState({results: commands});
    process.nextTick(() => {
      saveAsScript(commands)
      spawnSync(u.scriptPath, {stdio: 'inherit'})
      process.exit();
    })
  }

  keyMap(chunk, key) {
    if (key.name === 'k')
      return process.stdin.emit('keypress', chunk, {name: 'up'});
    if (key.name === 'j')
      return process.stdin.emit('keypress', chunk, {name: 'down'});
    if (key.name === 'q')
      return process.stdin.emit('keypress', chunk, {name: 'escape'});
  }

  render() {
    const {commandsSelect, results} = this.state;
    if (results) return null;
    return (
  	  <List
        checkedCharacter="✓"
        uncheckedCharacter="x"
        cursorCharacter=">"
  	  	onSubmit={this.handleSubmit}
  	  >
       {_.map(c =>
  	  	  <ListItem value={c}>{c}</ListItem>
       )(commandsSelect)}
  	  </List>
    );
  }
}

function saveAsScript(commands) {
  const shebang = `#! ${u.shellPath} -i`;
  fs.writeFileSync(
    u.scriptPath,
    [shebang, ...commands.map(c => `echo '$${c}'\n${c}`)].join('\n'),
    {mode: 0o766})
}
