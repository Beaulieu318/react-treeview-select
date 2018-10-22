import React from 'react'
import { shallow } from 'enzyme'
import ConnectedNode, { Node } from './Node'

function setup(id, childIds, parentId) {
  const actions = {
    collapse: jest.fn(),
    removeChild: jest.fn(),
    deleteNode: jest.fn(),
    createNode: jest.fn(),
    addChild: jest.fn()
  }

  const eventArgs = {
    preventDefault: jest.fn()
  }

  const component = shallow(
    <Node id={id} title={`Node_${id}`} parentId={parentId} childIds={childIds} {...actions} />
  )

  return {
    component: component,
    removeLink: component.findWhere(n => n.type() === 'button' && n.contains('×')),
    addLink: component.findWhere(n => n.type() === 'button' && n.contains('Add child')),
    collapseButton: component.findWhere(n => n.type() === 'button' && (n.contains('+') || n.contains('-'))),
    childNodes: component.find(ConnectedNode),
    actions: actions,
    eventArgs: eventArgs
  }
}

describe('Node component', () => {
  it('should display counter', () => {
    const { component } = setup(23, [])
    expect(component.text()).toMatch(/^Node_23/)
  })

  describe('when using collapse on node', () => {
    it('should collapse if parent has children', () => {
      const { collapseButton, actions } = setup(1, [ 2, 3 ])
      collapseButton.simulate('click')

      expect(actions.collapse).toBeCalledWith(1)
    })

    it('should not have collapse button if parent does not have children', () => {
      const { collapseButton, actions } = setup(1, [ ])

      expect(collapseButton.length).toEqual(0)
    })

    it('should show child nodes if not collapsed', () => {
      const { component, childNodes, collapseButton, actions } = setup(1, [ 1,2 ])
      expect(childNodes.length).toEqual(2)
    })

  })

  it('should not render remove link', () => {
    const { removeLink } = setup(1, [])
    expect(removeLink.length).toEqual(0)
  })

  it('should call createNode action on Add child click', () => {
    const { addLink, actions, eventArgs } = setup(2, [])
    actions.createNode.mockReturnValue({ nodeId: 3 })
    addLink.simulate('click', eventArgs)

    expect(actions.createNode).toBeCalled()
  })

  it('should call addChild action on Add child click', () => {
    const { addLink, actions, eventArgs } = setup(2, [])
    actions.createNode.mockReturnValue({ nodeId: 3 })

    addLink.simulate('click', eventArgs)

    expect(actions.addChild).toBeCalledWith(2, 3)
  })

  describe('when given childIds', () => {
    it('should render child nodes', () => {
      const { childNodes } = setup(1, [ 2, 3 ])
      expect(childNodes.length).toEqual(2)
    })
  })

  describe('when given parentId', () => {
    it('should call removeChild action on remove link click', () => {
      const { removeLink, actions, eventArgs } = setup(2, [], 1)
      removeLink.simulate('click', eventArgs)

      expect(actions.removeChild).toBeCalledWith(1, 2)
    })

    it('should call deleteNode action on remove link click', () => {
      const { removeLink, actions, eventArgs } = setup(2, [], 1)
      removeLink.simulate('click', eventArgs)

      expect(actions.deleteNode).toBeCalledWith(2)
    })
  })
})
