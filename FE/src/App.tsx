import { DummyType } from '@local/dummy-package';
import { useEffect, useState } from 'react';

interface SampleItem {
  id: number;
  name: string;
  description?: string;
}

function App() {
  const [items, setItems] = useState<SampleItem[]>([]);
  // Example usage of DummyType
  const dummyItem: DummyType = { id: 123, name: 'From DummyPackage' };
  useEffect(() => {
    fetch('https://localhost:49229/api/sample')
      .then(res => res.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);
  return (
    <div>
      <h1>Sample API Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}: {item.description}</li>
        ))}
      </ul>
      <h2>DummyType Example</h2>
      <div>{dummyItem.id}: {dummyItem.name}</div>
    </div>
  );
}

export default App;
