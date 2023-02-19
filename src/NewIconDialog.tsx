import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useIcons } from './IconsContext';

import './NewIconDialog.css';

// Wraps Radix UI's Dialog: https://www.radix-ui.com/docs/primitives/components/dialog
// Custom styling defined in NewIconDialog.css
export default function NewIconDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const { addIcon } = useIcons();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add New Icon</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Choose your icon name and click Add when done.
          </Dialog.Description>
          <form
            onSubmit={event => {
              if (name.length) {
                addIcon(name);
                setOpen(false);
                setName('');
              }
              event.preventDefault();
            }}
          >
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="name">
                Name
              </label>
              <input
                className="Input"
                id="name"
                placeholder="My Icon"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </fieldset>
            <div
              style={{
                display: 'flex',
                marginTop: 25,
                justifyContent: 'flex-end',
              }}
            >
              <button className="Button green" type="submit">
                Add
              </button>
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
