import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";

export const Editor = () => {
  const editor = useCreateBlockNote({});

  return <BlockNoteView className="ml-20 mt-20" editor={editor} />;
};
