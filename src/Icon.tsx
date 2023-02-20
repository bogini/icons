import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon, PinLeftIcon, PinRightIcon, PlusIcon } from '@radix-ui/react-icons';
import ContextMenu from './ContextMenu';
import { IconType, useIcons } from './IconsContext';

import './Icon.css';
import NewIconDialog from './NewIconDialog';

export function IconNew() {
  return (
    <NewIconDialog>
      <div className="icon icon-new">
        <div className="image">
          <PlusIcon height={50} width={50} color="darkgray" />
        </div>
        <div className="name">New Icon</div>
      </div>
    </NewIconDialog>
  );
}

// Uses dnd kit's Sortable: https://docs.dndkit.com/presets/sortable
export default function Icon({ id, name, color }: IconType) {
  const { icons, setIcons, setActiveIcon } = useIcons();
  const iconIndex = icons.findIndex((icon) => icon.id === id);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = () => setActiveIcon(icons[iconIndex]);
  const handleKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ContextMenu
        items={[
          {
            label: 'Delete',
            icon: <TrashIcon />,
            handleSelect: () => {
              icons.splice(iconIndex, 1);
              setIcons(icons);
            },
          },
          {
            label: 'Move to front',
            icon: <PinLeftIcon />,
            handleSelect: () => {
              const [icon] = icons.splice(iconIndex, 1);
              setIcons([icon, ...icons]);
            },
          },
          {
            label: 'Move to back',
            icon: <PinRightIcon />,
            handleSelect: () => {
              const [icon] = icons.splice(iconIndex, 1);
              setIcons([...icons, icon]);
            },
          },
        ]}
      >
        <div className="icon" role="button" tabIndex={iconIndex} onClick={handleClick} onKeyDown={handleKeyDown}>
          <div className="image" style={{ backgroundColor: color }}></div>
          <div className="name">{name}</div>
        </div>
      </ContextMenu>
    </div>
  );
}
