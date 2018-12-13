export const generateTree = (data, headings) => {
  let tree = {
    0: {
      id: 0,
      childIds: [],
      title: 'All',
      isCollapsed: false,
      isSelected: 1,
    },
  }

  for (let itemInt = 0; itemInt < data.length; itemInt++) {
    const nodeId = itemInt + 1

    tree[nodeId] = {
      id: nodeId,
      childIds: [],
      title: data[itemInt].title,
      isCollapsed: false,
      isSelected: 1,
    }

    let lastHeadingId = ''

    for (let headingInt = 0; headingInt < headings.length; headingInt++) {
      const headingId =
        (lastHeadingId ? `${lastHeadingId} ` : '') +
        `${headings[headingInt]} ${data[itemInt][headings[headingInt]]}`

      if (!(headingId in tree)) {
        tree[headingId] = {
          id: headingId,
          childIds: [],
          title: data[itemInt][headings[headingInt]],
          isCollapsed: false,
          isSelected: 1,
        }

        if (headingInt === 0) {
          tree[0].childIds.push(headingId)
        }
      }

      if (headingInt < headings.length - 1) {
        const subHeadingId = `${headingId} ${headings[headingInt + 1]} ${
          data[itemInt][headings[headingInt + 1]]
        }`
        if (!tree[headingId].childIds.includes(subHeadingId)) {
          tree[headingId].childIds.push(subHeadingId)
        }
      } else {
        tree[headingId].childIds.push(nodeId)
      }

      lastHeadingId = headingId
    }
  }

  return tree
}
