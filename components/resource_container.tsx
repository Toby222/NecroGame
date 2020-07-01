import { Resource, Resources } from '../types/resource'

import * as React from 'react'

interface ResourceContainerProps extends React.Props<ResourceContainer> {
  resources: Resources
}

export class ResourceContainer extends React.Component<ResourceContainerProps> {
  private static rId: number = 0
  title: string = 'Resources'
  resources: Resources

  constructor (props: ResourceContainerProps) {
    super(props)

    this.resources = props.resources
  }

  shouldComponentUpdate (nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
    return true
  }

  render () {
    function renderResource (resource: Resource, [amt, delta]: [number, number]) {
      return <div key={ResourceContainer.rId} className="resource">
        <span className="resource-title">{resource.toString()}</span>
        <span className="resource-amt">{amt}</span>
        <span className="resource-delta">{`${delta}/sec`}</span>
      </div>
    }
    return <div className="container container-resources">
      <div className="title">{this.title}</div>
      <div className="scroller">
        {Array.from(this.resources.entries(), (v, i) => renderResource(...v))}
      </div>
    </div>
  }
}
export default ResourceContainer
