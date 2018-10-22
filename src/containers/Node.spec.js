import React from "react";
import { shallow } from "enzyme";
import ConnectedNode, { Node } from "./Node";

function setup(id, childIds, parentId) {
  const actions = {
    collapse: jest.fn()
  };

  const eventArgs = {
    preventDefault: jest.fn()
  };

  const component = shallow(
    <Node
      id={id}
      title={`Node_${id}`}
      parentId={parentId}
      childIds={childIds}
      {...actions}
    />
  );

  return {
    component: component,
    collapseButton: component.findWhere(
      n => n.type() === "button" && (n.contains("+") || n.contains("-"))
    ),
    childNodes: component.find(ConnectedNode),
    actions: actions,
    eventArgs: eventArgs
  };
}

describe("Node component", () => {
  it("should display counter", () => {
    const { component } = setup(23, []);
    expect(component.text()).toMatch(/^Node_23/);
  });

  describe("when using collapse on node", () => {
    it("should collapse if parent has children", () => {
      const { collapseButton, actions } = setup(1, [2, 3]);
      collapseButton.simulate("click");

      expect(actions.collapse).toBeCalledWith(1);
    });

    it("should not have collapse button if parent does not have children", () => {
      const { collapseButton, actions } = setup(1, []);

      expect(collapseButton.length).toEqual(0);
    });

    it("should show child nodes if not collapsed", () => {
      const { component, childNodes, collapseButton, actions } = setup(1, [
        1,
        2
      ]);
      expect(childNodes.length).toEqual(2);
    });
  });
});
