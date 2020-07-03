import { Player } from '../types/player'
import { Button } from '../types/buttons'
import { Tiles } from '../types/tiles'
import { BoolFlags } from '../types/flags'
import { Resource } from '../types/resource'
import { Time } from '../types/time'
import { Message } from '../types/messages'
import { applyTimeactions, Action } from '../types/actions'
import { applyTransformers } from '../types/transformers'

import ControlContainer from './controlContainer'
import ResourceContainer from './resourceContainer'
import PlayerContainer from './playerContainer'
import MessagesContainer from './messagesContainer'

import Head from 'next/head'

import * as React from 'react'

export class Model extends React.Component {
  boolFlags: BoolFlags = new BoolFlags()
  buttons: Button[] = []
  messages: Message[] = []
  player: Player = new Player()
  resourceValues: Resource[] = []
  tiles: Tiles = new Tiles()
  time: Time = new Time()

  constructor (props: React.Props<Model>) {
    super(props)

    new Action.AddTile(0).perform(this)
  }

  processMsg (msg: Msg) {
    if (msg instanceof Msg.Tick) {
      this.time.increment()
      applyTransformers(this)
      applyTimeactions(this)
    } else if (msg instanceof Msg.PerformAction) {
      msg.action.perform(this)
      this.processMsg(new Msg.Tick())
    } else if (msg instanceof Msg.Bulk) {
      for (const message of msg.messages) {
        this.processMsg(message)
      }
    }
    this.forceUpdate()
  }

  render () {
    return (
      <div className='impact'>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta name='description' content='Survive the crash!' />
          <meta name='author' content='Toby, deciduously' />
          <title>IMPACT</title>
          <link rel='stylesheet' type='text/css' href='impact.css' />
        </Head>
        <main>
          <div className='header'>IMPACT</div>
          <div className='body'>
            <span className='time'>{`Time: ${this.time}`}</span>
            <ResourceContainer resources={this.resourceValues} />
            <ControlContainer onsignal={(msg: Msg) => this.processMsg(msg)} buttons={this.buttons} />
            <PlayerContainer player={this.player} />
          </div>
          <MessagesContainer messages={this.messages} />
        </main>
        <footer>
          <a href='http://deciduously.com'>deciduously.com</a>
          {' - '}
          <a href='https://github.com/toman222/Impact'>source</a>
        </footer>
      </div>
    )
  }
}

export class Msg {
  static Tick = class Tick { }

  static PerformAction = class PerformAction {
    action: Action

    constructor (action: Action) {
      this.action = action
    }
  }

  static Bulk = class Bulk {
    messages: Msg[]

    constructor (messages: Msg[]) {
      this.messages = messages
    }
  }
}
