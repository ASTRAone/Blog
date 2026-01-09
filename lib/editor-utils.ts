import { Editor } from "@tiptap/react";

export function duplicateContent(editor: Editor) {
  const { from, to } = editor.state.selection;
  const node = editor.state.selection.$anchor.parent;

  if (node.type.name === "image") {
    const attrs = { ...node.attrs };
    const imageNode = editor.schema.nodes.image.create(attrs);

    editor
      .chain()
      .insertContentAt(to, imageNode)
      .setTextSelection(to + 1)
      .run();
  } else {
    if (from !== to) {
      const selectedContent = editor.state.doc.textBetween(from, to, " ");
      editor
        .chain()
        .insertContentAt(to, selectedContent)
        .setTextSelection(to + selectedContent.length)
        .run();
    } else {
      const nodeType = node.type;
      const attrs = node.attrs;
      const duplicatedNode = nodeType.create(attrs);

      editor
        .chain()
        .insertContentAt(to, duplicatedNode)
        .setTextSelection(to + 1)
        .run();
    }
  }
}
