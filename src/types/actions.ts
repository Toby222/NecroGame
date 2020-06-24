import { TileID } from 'tiles'
import { ButtonID } from 'buttons'
import { BoolFlag } from 'flags'
import { Resource } from 'resource'
import { Model } from '../main'

export interface Action {
  perform(_: Model, ..._: any[]): void
}

export namespace Action {
  export class Noop implements Action {
    perform (model: Model) {}
  }
  export class AddMessage implements Action {
    constructor (message: string) {}

    perform (model: Model) {}
  }
  export class SetBoolFlag implements Action {
    constructor (_:BoolFlag) {}

    perform (model: Model) {}
  }
  export class ClearBoolFlag implements Action {
    constructor (_:BoolFlag) {}

    perform (model: Model) {}
  }
  export class SetResourceValue implements Action {
    constructor (_:Resource, _:number) {}

    perform (model: Model) {}
  }
  export class AddResourceValue implements Action {
    constructor (_:Resource, _:number) {}

    perform (model: Model) {}
  }
  export class AddResourceDelta implements Action {
    constructor (_:Resource, _:number) {}

    perform (model: Model) {}
  }
  export class EnableButton implements Action {
    constructor (_:ButtonID) {}

    perform (model: Model) {}
  }
  export class DisableButton implements Action {
    constructor (_:ButtonID) {}

    perform (model: Model) {}
  }
  export class AddTile implements Action {
    constructor (_:TileID) {}

    perform (model: Model) {}
  }
}
