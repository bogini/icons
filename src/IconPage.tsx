import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import Icon, { IconNew } from './Icon';

import './IconPage.css';
import { useIcons } from './IconsContext';
import { type IconType } from './IconsContext';

// Uses dnd kit's Sortable: docs.dndkit.com/presets/sortable
function IconPage() {
  const { icons, setIcons } = useIcons();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id) {
      const oldIndex = icons.findIndex(({ id }: IconType) => id == active.id);
      const newIndex = icons.findIndex(({ id }: IconType) => id == over.id);
      setIcons(arrayMove(icons, oldIndex, newIndex));
    }
  }

  return (
    <div className="icon-page">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={icons} strategy={rectSortingStrategy}>
          {icons.map(icon => (
            <Icon key={icon.id} {...icon} />
          ))}
          <IconNew />
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default IconPage;
