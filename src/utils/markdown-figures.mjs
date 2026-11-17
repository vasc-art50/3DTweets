const createFigure = (content, sourceImage) => {
  const imageProperties = { ...(sourceImage.properties ?? {}) };
  const title = imageProperties.title;
  delete imageProperties.title;

  const image = { ...sourceImage, properties: imageProperties };
  const figureContent =
    content === sourceImage
      ? image
      : {
          ...content,
          children: content.children.map((child) =>
            child === sourceImage ? image : child,
          ),
        };
  const children = [figureContent];

  if (typeof title === 'string' && title.trim()) {
    children.push({
      type: 'element',
      tagName: 'figcaption',
      properties: {},
      children: [{ type: 'text', value: title }],
    });
  }

  return {
    type: 'element',
    tagName: 'figure',
    properties: { className: ['aw-markdown-figure'] },
    children,
  };
};

export const markdownFigurePlugin = {
  name: 'markdown-figures',
  element: [
    {
      filter: ['p'],
      visit(node, context) {
        const getImage = (child) => {
          if (child.type !== 'element') return undefined;
          if (child.tagName === 'img') return { image: child, content: child };
          if (child.tagName !== 'a') return undefined;

          const children = child.children.filter(
            (item) => item.type !== 'text' || item.value.trim(),
          );
          if (
            children.length === 1 &&
            children[0].type === 'element' &&
            children[0].tagName === 'img'
          ) {
            return { image: children[0], content: child };
          }
        };

        const replacements = [];
        let inlineChildren = [];
        const flushParagraph = () => {
          let start = 0;
          let end = inlineChildren.length;

          while (
            start < end &&
            inlineChildren[start].type === 'text' &&
            !inlineChildren[start].value.trim()
          ) {
            start += 1;
          }
          while (
            end > start &&
            inlineChildren[end - 1].type === 'text' &&
            !inlineChildren[end - 1].value.trim()
          ) {
            end -= 1;
          }

          const paragraphChildren = inlineChildren.slice(start, end);
          if (paragraphChildren.length > 0) {
            const first = paragraphChildren[0];
            const lastIndex = paragraphChildren.length - 1;
            if (first.type === 'text') {
              paragraphChildren[0] = { ...first, value: first.value.trimStart() };
            }
            if (paragraphChildren[lastIndex].type === 'text') {
              paragraphChildren[lastIndex] = {
                ...paragraphChildren[lastIndex],
                value: paragraphChildren[lastIndex].value.trimEnd(),
              };
            }
            replacements.push({ ...node, children: paragraphChildren });
          }
          inlineChildren = [];
        };

        for (const child of node.children) {
          const candidate = getImage(child);
          if (!candidate) {
            inlineChildren.push(child);
            continue;
          }

          flushParagraph();
          replacements.push(createFigure(candidate.content, candidate.image));
        }

        if (replacements.length) {
          flushParagraph();
          context.replaceNode(node, replacements);
        }
      },
    },
    {
      filter: ['img'],
      visit(image, context) {
        let parent = context.parent(image);
        while (parent) {
          if (parent.type === 'element' && parent.tagName === 'p') return;
          parent = context.parent(parent);
        }

        const directParent = context.parent(image);
        const linkChildren =
          directParent?.type === 'element' && directParent.tagName === 'a'
            ? directParent.children.filter(
                (child) => child.type !== 'text' || child.value.trim(),
              )
            : [];
        const target =
          linkChildren.length === 1 && linkChildren[0] === image
            ? directParent
            : image;
        context.replaceNode(target, createFigure(target, image));
      },
    },
  ],
};
