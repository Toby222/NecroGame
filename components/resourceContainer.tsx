import { Resource } from "../types/resource";

import * as React from "react";

interface ResourceContainerProps {
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
        <div key={resourceId} className="row">
          <div className="col-sm-5">{resource.name}</div>
          <div className="col-sm-3 text-right">{resource.amount}</div>
          <div className="col-sm-4 text-right">{resource.delta}/sec</div>
        </div>
      );
    }
    return (
      <div className="container">
        <h1 className="sidebar-title">{this.title}</h1>
        <div className="container">
          {this.resources.map((res, idx) => renderResource(idx, res))}
        </div>
      </div>
    );
  }
}
export default ResourceContainer;
