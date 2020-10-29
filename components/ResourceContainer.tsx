import { BaseResource } from "../types/Resources";

import * as React from "react";

interface ResourceContainerProps<T extends typeof BaseResource> {
  resources: T[];
}

export class ResourceContainer<T extends typeof BaseResource> extends React.Component<ResourceContainerProps<T>> {
  render() {
    /**
     * Helper function to turn Resources into Elements.
     *
     * @param resourceId - ID of the Resource inside the ResourceContainer.
     * @param resource - The Resource to render.
     * @returns Element of the Resource.
     */
    function renderResource<T extends typeof BaseResource>(resourceId: number, resource: T) {
      return (
        <div key={resourceId} className="row">
          <div className="col-sm-5">{resource.resourceName}</div>
          <div className="dropdown dropup toggle-on-hover col-sm-7 text-right">
            {Math.round(resource.amount * 100) / 100}
            {resource.delta > 0 ? <div className="dropdown-menu dropdown-menu-right w-auto mw-0">{`${Math.round(resource.delta * 100) / 100}/sec`}</div> : <></>}
          </div>
          {/*<div className="col-sm-3 text-right">{resource.delta > 0 ? `${Math.round(resource.delta * 100) / 100}/sec` : ''}</div>*/}
        </div>
      );
    }
    if (this.props.resources.length > 0) {
      return (
        <div className="us-none row-auto">
          <h4>Resources</h4>
          <div className="container">{this.props.resources.map((res, idx) => renderResource(idx, res))}</div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}
export default ResourceContainer;
