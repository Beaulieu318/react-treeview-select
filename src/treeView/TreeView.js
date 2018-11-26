import React from 'react'
import { TreeProvider } from './TreeProvider'
import { Node } from './Node'

export const TreeView = ({ tree }) => {
  return tree ? (
    <TreeProvider {...{ tree }}>
      <Node id={0} />
    </TreeProvider>
  ) : null
}
