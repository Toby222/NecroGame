import { Resource, Resources } from '../types/resource'

import * as React from 'react'

interface ResourceContainerProps extends React.Props<ResourceContainer> {
  resources: Resources
}

export class ResourceContainer extends React.Component<ResourceContainerProps> {
  title: string = 'Resources'
  resources: Resources

  constructor(props: ResourceContainerProps) {
    super(props)

    this.resources = props.resources
  }

  render() {
    function renderResource(resource: Resource, [amt, delta]: [number, number]){
        return <div className="resource">
          <span className="resource-title">{resource}</span>
          <span className="resource-amt">{amt}</span>
          <span className="resource-delta">{`${delta}/sec`}</span>
        </div>
    }
    return <div className="container container-resource">
      <div className="title">{this.title}</div>
      <div className="scroller">
        {Array.from(this.resources.entries(),(v, i)=>renderResource(...v))}
      </div>
    </div>
  }
}
export default ResourceContainer