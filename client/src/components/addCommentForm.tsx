import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import TipTap from './tipTap/tipTap';
import { useEditor } from '@tiptap/react';

import Image from '@tiptap/extension-image';

import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';

export default function CommentDialog(props: {
  close: () => void;
  submit: (data: FormData) => void;
  open: boolean;
}) {
  const editor = useEditor({
    extensions: [
      Image,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: '',
  });

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.close}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const contentHtml = editor?.getHTML() || '';
            const formData = new FormData(event.currentTarget);
            formData.append('text', contentHtml);
            props.submit(formData);
          },
        }}
      >
        <DialogTitle>Add comment</DialogTitle>
        <DialogContent>
          <TipTap
            content={''}
            editor={editor}
          />
          <TextField
            type='file'
            name='file'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button type='submit'>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
