const videoIdPattern = /^[A-Za-z0-9_-]{11}$/;

const startSeconds = (value) => {
  if (/^\d+$/.test(value)) {
    const seconds = Number(value);
    return Number.isSafeInteger(seconds) ? seconds : undefined;
  }

  const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(value);
  if (!match || !match[0]) return undefined;
  const seconds = Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
  return Number.isSafeInteger(seconds) ? seconds : undefined;
};

const youtubeVideo = (href) => {
  let url;
  try {
    url = new URL(href);
  } catch {
    return;
  }

  if (url.protocol !== 'https:' || url.username || url.password || url.port) return;

  let id;
  if (url.hostname === 'youtu.be') {
    id = /^\/([^/]+)\/?$/.exec(url.pathname)?.[1];
  } else if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
    id = url.pathname === '/watch'
      ? url.searchParams.get('v')
      : /^\/(?:shorts|embed)\/([^/]+)\/?$/.exec(url.pathname)?.[1];
  }
  if (!id || !videoIdPattern.test(id)) return;

  const timestamp = url.searchParams.get('start') ?? url.searchParams.get('t');
  const seconds = timestamp === null ? undefined : startSeconds(timestamp);
  if (timestamp !== null && seconds === undefined) return;

  const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  embed.searchParams.set('rel', '0');
  embed.searchParams.set('modestbranding', '1');
  embed.searchParams.set('playsinline', '1');
  if (seconds !== undefined) embed.searchParams.set('start', String(seconds));
  return { id, embed: embed.href };
};

const linkText = (node) => {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element' || !['a', 'em', 'strong', 'code'].includes(node.tagName)) return;
  const parts = node.children.map(linkText);
  return parts.some((part) => part === undefined) ? undefined : parts.join('');
};

export const markdownVideoPlugin = {
  name: 'markdown-videos',
  element: [
    {
      filter: ['p'],
      visit(node, context) {
        let parent = context.parent(node);
        while (parent) {
          if (parent.type === 'element' && ['li', 'ul', 'ol'].includes(parent.tagName)) return;
          parent = context.parent(parent);
        }

        const children = node.children.filter(
          (child) => child.type !== 'text' || child.value.trim(),
        );
        if (children.length !== 1 || children[0].type !== 'element' || children[0].tagName !== 'a') return;

        const link = children[0];
        const href = link.properties?.href;
        if (typeof href !== 'string') return;
        const video = youtubeVideo(href);
        const text = linkText(link)?.trim();
        if (!video || !text) return;

        const caption = text === href ? undefined : text;
        const name = caption ?? video.id;
        const label = (lang, prefix) => ({
          type: 'element',
          tagName: 'span',
          properties: { className: ['aw-video__label'], lang },
          children: [{ type: 'text', value: `${prefix}: ${name}` }],
        });

        const figureChildren = [{
          type: 'element',
          tagName: 'div',
          properties: { className: ['aw-video__frame'] },
          children: [{
            type: 'element',
            tagName: 'a',
            properties: {
              className: ['aw-video__play'],
              href,
              dataYoutubeEmbed: video.embed,
            },
            children: [
              {
                type: 'element',
                tagName: 'img',
                properties: {
                  className: ['aw-video__thumbnail'],
                  src: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
                  alt: '',
                  loading: 'lazy',
                  decoding: 'async',
                },
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['aw-video__icon'], ariaHidden: 'true' },
                children: [],
              },
              label('en', 'Play YouTube video'),
              label('cs', 'Přehrát video z YouTube'),
            ],
          }],
        }];
        if (caption) {
          figureChildren.push({
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: [{ type: 'text', value: caption }],
          });
        }

        context.replaceNode(node, {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['aw-markdown-figure', 'aw-video'] },
          children: figureChildren,
        });
      },
    },
  ],
};
