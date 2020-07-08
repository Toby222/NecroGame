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
import MapContainer from './mapContainer'

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

  render () {
    return (
      <div className='impact'>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta name='description' content='Survive the crash!' />
          <meta name='author' content='Toby, deciduously' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Fira+Code' />
          <link rel='stylesheet' type='text/css' href='impact.css' />
          <title>IMPACT</title>
        </Head>
        <main>
          <div className='header'>IMPACT</div>
          <span className='time'>{`Time: ${this.time}`}</span>
          <div className='body'>
            <ResourceContainer resources={this.resourceValues} />
            <ControlContainer buttons={this.buttons} onsignal={(msg: Msg) => msg.act(this)} />
            <div className='content'>
              <PlayerContainer player={this.player} />
              <MapContainer tile={this.player.currentTile} />
            </div>
          </div>
          <MessagesContainer messages={this.messages} />
        </main>
        <footer>
          <a href='https://github.com/toman222/Impact'>source</a>
        </footer>
      </div>
    )
  }
}

export interface Msg {
  act(model: Model): void
}

export class Msg {
  static Tick = class Tick implements Msg {
    act (model: Model) {
      console.log('[DEBUG] Ticked. Model:', model)
      model.time.increment()
      applyTransformers(model)
      applyTimeactions(model)
      model.forceUpdate()
    }
  }

  static PerformAction = class PerformAction {
    action: Action

    constructor (action: Action) {
      this.action = action
    }

    act (model: Model) {
      this.action.perform(model)
      new Msg.Tick().act(model)
    }
  }

  static Bulk = class Bulk {
    messages: Msg[]

    constructor (messages: Msg[]) {
      this.messages = messages
    }

    act (model: Model) {
      for (const msg of this.messages) {
        msg.act(model)
      }
    }
  }
}
