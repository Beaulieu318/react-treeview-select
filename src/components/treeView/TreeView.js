import React from 'react'
import { TreeProvider } from './TreeProvider'
import { Node } from './Node'
import { generateTree } from './generateTree'

export const TreeView = ({ data, headings }) => {
  if (data) {
    const tree = generateTree(data, headings)

    return (
      <TreeProvider {...{ tree }}>
        <Node id={0} />
      </TreeProvider>
    )
  }

  return null
}
