export const dataJSON = [
  {
    id: 0,
    title: 'Field 1',
    farm: 'Farm 1',
    year: '2018',
    history: [
      {
        year: '2018',
        crop: 'Wheat',
        grower: 'Grower 2',
        farmer: 'Farmer 1'
      },
      {
        year: '2017',
        crop: 'Barley',
        grower: 'Grower 1',
        farmer: 'Farmer 1'
      },
    ]
  },
  {
    id: 1,
    title: 'Field 2',
    farm: 'Farm 2',
    year: '2018',
    history: [
      {
        year: '2018',
        crop: 'Wheat',
        grower: 'Grower 1',
        farmer: 'Farmer 2'
      },
    ]
  },
  {
    id: 2,
    title: 'Field 3',
    farm: 'Farm 2',
    year: '2018',
    history: [
      {
        year: '2018',
        crop: 'Wheat',
        grower: 'Grower 1',
        farmer: 'Farmer 2'
      },
    ]
  }
]


export function transformJSONToTree(data, headings) {
  // This should transform the fields json into a tree structure

  let tree = {
    0: {
      id: 0,
      childIds: [ ],
      title: 'All',
      isCollapsed: false,
      isSelected: 1,
    }
  };

  for (let itemInt = 0; itemInt < data.length; itemInt++) {

    const nodeId = itemInt + 1;

    tree[nodeId] = {
      id: nodeId,
      childIds: [ ],
      title: data[itemInt].title,
      isCollapsed: false,
      isSelected: 1
    }

    let lastHeadingId = '';

    for (let headingInt = 0; headingInt < headings.length; headingInt++) {

      const headingId = (lastHeadingId ? `${lastHeadingId} `: '') + `${headings[headingInt]} ${data[itemInt][headings[headingInt]]}`
      
      if (!(headingId in tree)) {
        tree[headingId] = {
          id: headingId,
          childIds: [ ],
          title: data[itemInt][headings[headingInt]],
          isCollapsed: false,
          isSelected: 1,
        }

        if (headingInt === 0) {
          tree[0].childIds.push(headingId)
        }
      }

      if (headingInt < headings.length - 1) {
        const subHeadingId = `${headingId} ${headings[headingInt+1]} ${data[itemInt][headings[headingInt+1]]}`
        if (!tree[headingId].childIds.includes(subHeadingId)) {
          tree[headingId].childIds.push(subHeadingId)
        }
      } else {
        tree[headingId].childIds.push(nodeId)
      }

      lastHeadingId = headingId;

    }

  }

  console.log(tree)

  return tree

}


export default function generateTree() {
  let tree = {
    0: {
      id: 0,
      childIds: [],
      title: `Node_${0}`,
      isCollapsed: false
    }
  };

  for (let i = 1; i < 1000; i++) {
    let parentId = Math.floor(Math.pow(Math.random(), 2) * i);
    tree[i] = {
      id: i,
      childIds: [],
      title: `Node_${i}`,
      isCollapsed: false
    };
    tree[parentId].childIds.push(i);
  }

  return tree;
}
