import { Player } from '../types/player'
import { Buttons } from '../types/buttons'
import { TileID, Tile, Tiles } from '../types/tiles'
import { BoolFlag, BoolFlags } from '../types/flags'
import { Resource, Resources } from '../types/resource'
import { Time } from '../types/time'
import { Message } from '../types/messages'
import { applyTimeactions, Action } from '../types/actions'
import { applyTransformers } from '../types/transformers'

import ControlContainer from '../components/control_container'
import ResourceContainer from '../components/resource_container'

import Head from 'next/head'
import Link from 'next/link'

import * as React from 'react'

export class Model extends React.Component {
  time: Time
  resourceValues: Resources
  messages: Message[]
  boolFlags: BoolFlags
  tiles: Tiles
  buttons: Buttons
  player: Player

  constructor (props: React.Props<Model>) {
    super(props)

    this.time = new Time()
    this.resourceValues = new Map<Resource, [number, number]>() // new Resources()
    this.messages = []
    this.boolFlags = new BoolFlags()
    this.tiles = new Tiles()
    this.buttons = []
    this.player = new Player()
    const t = new Action.AddTile(0)
    t.perform(this)
  }

  // ?
  update (msg: Msg) {
    if (msg instanceof Msg.Tick) {
      this.time.increment()
      applyTransformers(this)
      applyTimeactions(this)
    } else if (msg instanceof Msg.PerformAction) {
      msg.action.perform(this)
      this.update(new Msg.Tick())
    } else if (msg instanceof Msg.Bulk) {
      for (const message of msg.messages) {
        this.update(message)
      }
    }
    this.forceUpdate()
  }

  render () {
    return (
      <div className="impact">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="description" content="Survive the crash!"/>
          <meta name="author" content="Toby, deciduously"/>
          <link rel="stylesheet" type="text/css" href="impact.css"/>
        </Head>
        <main>
          <div className="header">{'IMPACT'}</div>
          <div className="body">
            <span className="time">{`Time: ${this.time}`}</span>
            <ResourceContainer resources={this.resourceValues}/>
            <ControlContainer buttons={this.buttons} onsignal={(msg: Msg)=>this.update(msg)}/>
          </div>
        </main>
        <footer>
          <a href="http://deciduously.com">{'deciduously.com'}</a>{' - '}<a href="https://github.com/toman222/Impact">{'source'}</a>
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
