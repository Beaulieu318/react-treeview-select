import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

export class Node extends Component {
  handleIncrementClick = () => {
    const { increment, id } = this.props;
    increment(id);
  };

  handleCollapseClick = () => {
    const { collapse, id } = this.props;
    collapse(id);
  };

  handleSelectClick = () => {
    const { select, id } = this.props;
    select(id);
  };

  handleAddChildClick = e => {
    e.preventDefault();

    const { addChild, createNode, id } = this.props;
    const childId = createNode().nodeId;
    addChild(id, childId);
  };

  renderChild = childId => {
    const { id } = this.props;
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    );
  };

  render() {
    const { title, isCollapsed = false, isSelected = false, parentId, childIds } = this.props;
    return (
      <div>
        {title} 
        { 
          (childIds.length > 0) ? 
          (
            <button onClick={this.handleCollapseClick}>{  (isCollapsed ? '+' : '-') }</button>
          ) :
          null
        }
        {" "}
        {
          typeof parentId !== "undefined" && (
            <button
              onClick={this.handleSelectClick} 
              style={{ color: "lightgray", textDecoration: "none" }}
            >
              { isSelected ? '/' : 'x'}
            </button>
          )
        }
        <ul>
          {!isCollapsed && childIds.map(this.renderChild)}
          {
            (1 === 0) &&
            (
              <li key="add">
                <button
                  onClick={this.handleAddChildClick}
                >
                  Add child
                </button>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state[ownProps.id];
}

const ConnectedNode = connect(
  mapStateToProps,
  actions
)(Node);
export default ConnectedNode;
