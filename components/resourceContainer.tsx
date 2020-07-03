import { Resource } from '../types/resource'

import * as React from 'react'

interface ResourceContainerProps extends React.Props<ResourceContainer> {
  resources: Resource[]
}

export class ResourceContainer extends React.Component<ResourceContainerProps> {
  private static rId: number = 0
  title: string = 'Resources'
  resources: Resource[]

  constructor (props: ResourceContainerProps) {
    super(props)

    this.resources = props.resources
  }

  shouldComponentUpdate (_nextProps: Readonly<{}>, _nextState: Readonly<{}>, _nextContext: any): boolean {
    return true
  }

  render () {
    function renderResource (resource: Resource) {
      return (
        <div key={ResourceContainer.rId} className='resource'>
          <span className='resource-title'>{resource.toString()}</span>
          <span className='resource-amt'>{resource.amount}</span>
          <span className='resource-delta'>{`${resource.delta}/sec`}</span>
        </div>
      )
    }
    return (
      <div className='container container-resources'>
        <div className='title'>{this.title}</div>
        <div className='scroller'>
          {Array.from(this.resources.entries(), ([_idx, res]) => renderResource(res))}
        </div>
      </div>
    )
  }
}
export default ResourceContainer
