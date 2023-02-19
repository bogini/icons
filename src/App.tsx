import IconPage from './IconPage';
import { IconsProvider, useIcons } from './IconsContext';
import './App.css';

function App() {
  const { activeIcon } = useIcons();

  return (
    <div
      className="app"
      style={activeIcon ? { backgroundColor: activeIcon.color } : {}}
    >
      <IconPage />
    </div>
  );
}

export default App;
