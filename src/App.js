import './App.css';
import DataCard from './components/DataCard';

function App() {
  return (
    <div className="App">
      <div style={{width: '100%', height: '5vh', backgroundColor: 'beige'}}>
        Covid Statistics
      </div>
      <DataCard />
    </div>
  );
}

export default App;
