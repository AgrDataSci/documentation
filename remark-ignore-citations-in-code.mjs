export default function remarkIgnoreCitationsInCode() {
  return (tree) => {
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;

      if ((node.type === 'code' || node.type === 'inlineCode') && typeof node.value === 'string') {
        node.value = node.value.replaceAll('@', '&#64;');
      }

      const children = node.children;
      if (Array.isArray(children)) children.forEach(walk);
    };
    walk(tree);
  };
}
