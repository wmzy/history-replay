import path from 'path';
import os from 'os';
import _ from 'lodash/fp';
import should from 'should';
import sinon from 'sinon';
import getHistory from '../src/get-history';

describe('Get History', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    this.oldEnv = _.clone(process.env);
  });

  afterEach(function () {
    sandbox.restore();
    process.env = this.oldEnv;
  });

  it('read by HISTFILE', async function () {
    process.env.HISTFILE = path.join(__dirname, 'fixtrues/.zsh_history')
    await getHistory()
      .should.be.finally.containDeepOrdered([
        'ls',
        'cat ~/.zsh_history'
      ]).and.length(9);
  });

  it('read by homedir', async function () {
    process.env.SHELL = '/bin/zsh';
    sandbox.stub(os, 'homedir').returns(path.join(__dirname, 'fixtrues'));
    await getHistory()
      .should.be.finally.containDeepOrdered([
        'ls',
        'cat ~/.zsh_history'
      ]).and.length(9);
  });

  it('read by homedir for bash', async function () {
    process.env.SHELL = '/bin/bash';
    sandbox.stub(os, 'homedir').returns(path.join(__dirname, 'fixtrues'));
    await getHistory()
      .should.be.finally.containDeepOrdered([
        'ls',
        'cat ~/.zsh_history'
      ]).and.length(9);
  });
});

