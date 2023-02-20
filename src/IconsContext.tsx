import { createContext, useCallback, useContext, useReducer } from 'react';
import Chance from 'chance';

import {
  amber,
  blue,
  crimson,
  cyan,
  grass,
  green,
  indigo,
  lime,
  mint,
  orange,
  pink,
  plum,
  purple,
  red,
  sky,
  teal,
  tomato,
  violet,
  yellow,
} from '@radix-ui/colors';

const ICON_COLORS = [
  amber.amber10,
  blue.blue10,
  crimson.crimson10,
  cyan.cyan10,
  grass.grass10,
  green.green10,
  indigo.indigo10,
  lime.lime10,
  mint.mint10,
  orange.orange10,
  pink.pink10,
  plum.plum10,
  purple.purple10,
  red.red10,
  sky.sky10,
  teal.teal10,
  tomato.tomato10,
  violet.violet10,
  yellow.yellow10,
];

const randomColors = (n: number) => chance.pickset(ICON_COLORS, n);

const chance = new Chance();

export type IconType = {
  id: string;
  name: string;
  color: string;
};

type State = {
  activeIcon?: IconType;
  icons: IconType[];
};

type Action =
  | {
      type: 'add';
      payload: {
        name: string;
      };
    }
  | {
      type: 'delete';
      payload: {
        id: string;
      };
    }
  | {
      type: 'setIcons';
      payload: {
        icons: IconType[];
      };
    }
  | {
      type: 'setActiveIcon';
      payload: {
        icon: IconType;
      };
    };

function iconReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        icons: [
          ...state.icons,
          {
            name: action.payload.name,
            id: chance.string({ alpha: true }),
            color: randomColors(1)[0],
          },
        ],
      };
    case 'delete':
      return {
        ...state,
        icons: state.icons.filter((icon: IconType) => icon.id !== action.payload.id),
      };
    case 'setIcons':
      return {
        ...state,
        icons: action.payload.icons,
      };
    case 'setActiveIcon':
      return {
        ...state,
        activeIcon: action.payload.icon,
      };
    default:
      throw new Error('Unsupported action type');
  }
}

const NUMBER_INITIAL_COLORS = Math.floor(3 + Math.random() * 12);

function IconsContextValue() {
  const colors = randomColors(NUMBER_INITIAL_COLORS);
  const [state, dispatch] = useReducer(iconReducer, {
    icons: Array(NUMBER_INITIAL_COLORS)
      .fill(undefined)
      .map((_, i) => {
        const word = chance.word();

        return {
          id: chance.string({ alpha: true }),
          name: word.charAt(0).toUpperCase() + word.slice(1),
          color: colors[i],
        };
      }),
  });

  /*
  // How we would load icons from the server
  useEffect(() => {
    const fetchData = async () => {
      const icons = await fetch(....);
      dispatch({ type: 'setIcons', payload: { icons } });
    };

    fetchData();
  }, []);
  */

  // The following callbacks would handle talking to a server to update state
  const setIcons = useCallback((icons: IconType[]) => dispatch({ type: 'setIcons', payload: { icons } }), []);

  const addIcon = useCallback((name: string) => dispatch({ type: 'add', payload: { name } }), []);

  const setActiveIcon = useCallback((icon: IconType) => {
    document.title = icon.name;
    dispatch({ type: 'setActiveIcon', payload: { icon } });
  }, []);

  return {
    icons: state.icons,
    setIcons,
    addIcon,
    activeIcon: state.activeIcon,
    setActiveIcon,
  };
}

const IconsContext = createContext<ReturnType<typeof IconsContextValue> | undefined>(undefined);

export function useIcons() {
  // Non null assertion since IconsContextValue() is always set
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useContext(IconsContext)!;
}

export const IconsProvider = ({ children }: { children: React.ReactNode }) => {
  return <IconsContext.Provider value={IconsContextValue()}>{children}</IconsContext.Provider>;
};
