import { Player } from 'types/player'
import { Buttons } from 'types/buttons'
import { Tiles } from 'types/tiles'
import { BoolFlags } from 'types/flags'
import { Resources } from 'types/resource'
import { Time } from 'types/time'
import { Message } from 'types/messages'

export interface Model {
  time: Time,
  resource_values: Resources,
  messages: Message[],
  bool_flags: BoolFlags,
  tiles: Tiles,
  buttons: Buttons,
  player: Player
}

export interface Msg {
}

class Component implements Model {
}
