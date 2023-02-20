import * as RadixContextMenu from '@radix-ui/react-context-menu';

import './ContextMenu.css';

type ContextMenuItem = {
  label: string;
  icon: React.ReactNode;
  handleSelect: () => unknown;
};

type ContextMenuProps = {
  children: React.ReactNode;
  items: ContextMenuItem[];
};

// Wraps Radix UI's Context Menu: https://www.radix-ui.com/docs/primitives/components/context-menu
// Custom styling defined in ContextMenu.css
export default function ContextMenu({ children, items = [] }: ContextMenuProps) {
  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger>{children}</RadixContextMenu.Trigger>
      <RadixContextMenu.Portal>
        <RadixContextMenu.Content className="context-menu-content">
          {items.map(({ label, icon, handleSelect }, key) => (
            <RadixContextMenu.Item key={key} className="context-menu-item" onSelect={handleSelect}>
              <div className="context-menu-item-icon">{icon}</div>
              {label}
            </RadixContextMenu.Item>
          ))}
        </RadixContextMenu.Content>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  );
}
