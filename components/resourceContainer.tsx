import { Resource } from "../types/resource";

import * as React from "react";

interface ResourceContainerProps extends React.Props<ResourceContainer> {
  resources: Resource[];
}

export class ResourceContainer extends React.Component<ResourceContainerProps> {
  title: string = "Resources";
  resources: Resource[];

  constructor(props: ResourceContainerProps) {
    super(props);

    this.resources = props.resources;
  }

  shouldComponentUpdate(
    _nextProps: Readonly<{}>,
    _nextState: Readonly<{}>,
    _nextContext: any
  ): boolean {
    return true;
  }

  render() {
    /**
     * Helper function to turn Resources into Elements.
     *
     * @param resourceId - ID of the Resource inside the ResourceContainer.
     * @param resource - The Resource to render.
     * @returns Element of the Resource.
     */
    function renderResource(resourceId: number, resource: Resource) {
      return (
        <div key={resourceId} className="resource">
          <span className="resource-title">{resource.name}</span>
          <span className="resource-amt">{resource.amount}</span>
          <span className="resource-delta">{resource.delta}/sec</span>
        </div>
      );
    }
    return (
      <div className="container container-resources">
        <div className="title">{this.title}</div>
        <div className="scroller">
          {Array.from(this.resources.entries(), ([idx, res]) =>
            renderResource(idx, res)
          )}
        </div>
      </div>
    );
  }
}
export default ResourceContainer;
