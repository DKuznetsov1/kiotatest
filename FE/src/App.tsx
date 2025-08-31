import { FC, useEffect, useState } from 'react';
import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { ApiClient, createApiClient } from '@dkuznetsov1/api-client';
import { SampleItem } from '@dkuznetsov1/api-client/dist/models';

const App: FC = () => {
  const [items, setItems] = useState<(SampleItem | undefined)[] | undefined>([]);
  useEffect(() => {
    const authProvider = new AnonymousAuthenticationProvider();
    const adapter = new FetchRequestAdapter(authProvider);
    adapter.baseUrl = 'https://localhost:49229';
    const client = createApiClient(adapter) as ApiClient;  

    client.api.sample.get()
      .then(setItems);
  }, []);
  
  return (
    <div>
      <h1>Sample API Items</h1>
      <ul>
        {items && items.map(item => (
          item && <li key={item.id}>{item.name}: {item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
