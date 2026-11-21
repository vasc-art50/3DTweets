export const markdownTablePlugin = {
  name: 'markdown-tables',
  element: [
    {
      filter: ['table'],
      visit(node, context) {
        const parent = context.parent(node);
        if (
          parent?.type === 'element' &&
          parent.properties?.className?.includes('article-table-wrapper')
        ) return;

        context.replaceNode(node, {
          type: 'element',
          tagName: 'div',
          properties: { className: ['article-table-wrapper'], tabIndex: 0 },
          children: [node],
        });
      },
    },
  ],
};
