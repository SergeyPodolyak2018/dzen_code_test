import './tipTap.scss';

import { EditorContent } from '@tiptap/react';
import { MouseEvent, useRef, useState } from 'react';
import { AddImagePopUp } from '../addImagePopUp/addImagePopUp';

export default (props: { content: string; editor: any }) => {
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const ref = useRef(null);

  const showPromt = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setShowPrompt(true);
  };

  const addImage = (url: string) => {
    if (url) {
      props.editor?.chain().focus().setImage({ src: url }).run();
      setShowPrompt(false);
    }
  };

  if (!props.editor) {
    return null;
  }

  return (
    <div
      ref={ref}
      className='tiptapmainContainer'
    >
      <div className='control-group'>
        {showPrompt && (
          <AddImagePopUp
            add={addImage}
            close={() => {
              setShowPrompt(false);
            }}
          />
        )}
        <div className='button-group'>
          <button
            type='button'
            onClick={showPromt}
          >
            Add image from URL
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().toggleBold().run()}
            disabled={!props.editor.can().chain().focus().toggleBold().run()}
            className={props.editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().toggleItalic().run()}
            disabled={!props.editor.can().chain().focus().toggleItalic().run()}
            className={props.editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().toggleStrike().run()}
            disabled={!props.editor.can().chain().focus().toggleStrike().run()}
            className={props.editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().toggleCode().run()}
            disabled={!props.editor.can().chain().focus().toggleCode().run()}
            className={props.editor.isActive('code') ? 'is-active' : ''}
          >
            Code
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().unsetAllMarks().run()}
          >
            Clear marks
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().clearNodes().run()}
          >
            Clear nodes
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().setParagraph().run()}
            className={props.editor.isActive('paragraph') ? 'is-active' : ''}
          >
            Paragraph
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              props.editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
          >
            H1
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              props.editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            H2
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              props.editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
          >
            H3
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              props.editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
            }
          >
            H4
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              props.editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
            }
          >
            H5
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              props.editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
            }
          >
            H6
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().toggleBulletList().run()
            }
            className={props.editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet list
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().toggleOrderedList().run()
            }
            className={props.editor.isActive('orderedList') ? 'is-active' : ''}
          >
            Ordered list
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().toggleCodeBlock().run()}
            className={props.editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            Code block
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().toggleBlockquote().run()
            }
            className={props.editor.isActive('blockquote') ? 'is-active' : ''}
          >
            Blockquote
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().setHorizontalRule().run()
            }
          >
            Horizontal rule
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().setHardBreak().run()}
          >
            Hard break
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().undo().run()}
            disabled={!props.editor.can().chain().focus().undo().run()}
          >
            Undo
          </button>
          <button
            type='button'
            onClick={() => props.editor.chain().focus().redo().run()}
            disabled={!props.editor.can().chain().focus().redo().run()}
          >
            Redo
          </button>
          <button
            type='button'
            onClick={() =>
              props.editor.chain().focus().setColor('#958DF1').run()
            }
            className={
              props.editor.isActive('textStyle', { color: '#958DF1' })
                ? 'is-active'
                : ''
            }
          >
            Purple
          </button>
        </div>
      </div>
      <EditorContent editor={props.editor} />
    </div>
  );
};
