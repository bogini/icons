import IconPage from './IconPage';
import { useIcons } from './IconsContext';
import './App.css';

function App() {
  const { activeIcon } = useIcons();

  return (
    <div className="app" style={activeIcon ? { backgroundColor: activeIcon.color } : {}}>
      <IconPage />
      <p className="instructions">Right click on an icon for more options.</p>
    </div>
  );
}

export default App;
