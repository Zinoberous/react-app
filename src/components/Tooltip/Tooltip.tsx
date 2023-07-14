//#region imports

// react
import React, { Component } from 'react';

// this
import ITooltipProps from './ITooltipProps';
import ITooltipState from './ITooltipState';

// components
import { Tooltip } from 'reactstrap';

// helper
import { isNullOrWhitespace, NEWID } from '../../helper/general';

//#endregion

export default class TooltipComponent extends Component<ITooltipProps, ITooltipState> {
  private id: string = NEWID();

  public constructor(props: ITooltipProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  public render(): JSX.Element {
    if (isNullOrWhitespace(this.props.content)) {
      return <>{(this.props as any).children}</>;
    }

    return (
      <>
        <div id={this.id} style={(this.props as any).style}>
          {(this.props as any).children}
        </div>
        <Tooltip
          placement={this.props.placement}
          target={this.id}
          isOpen={this.state.isOpen}
          toggle={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          {this.props.content}
        </Tooltip>
      </>
    );
  }
}
