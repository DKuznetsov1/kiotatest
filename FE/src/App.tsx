import { FC, useEffect, useState } from 'react';
import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { ApiClient, createApiClient } from '@dkuznetsov1/api-client';
import { SampleItem } from '@dkuznetsov1/api-client/dist/models';

const App: FC = () => {
  const [items, setItems] = useState<(SampleItem | undefined)[] | undefined>([]);

  const [singleItem, setSingleItem] = useState<(SampleItem | undefined)>();

  useEffect(() => {
    const authProvider = new AnonymousAuthenticationProvider();
    const adapter = new FetchRequestAdapter(authProvider);
    adapter.baseUrl = import.meta.env.VITE_API_BASE_URL;
    const client = createApiClient(adapter) as ApiClient;  

    client.api.sample.get()
      .then(setItems);
  }, []);

  useEffect(() => {
    const authProvider = new AnonymousAuthenticationProvider();
    const adapter = new FetchRequestAdapter(authProvider);
    adapter.baseUrl = import.meta.env.VITE_API_BASE_URL;
    const client = createApiClient(adapter) as ApiClient;  

    client.api.sample.withDescription.byDesc("Second item").get()
      .then(setSingleItem);
  }, [])
  
  return (
    <div>
      <h1>Sample API Items</h1>
      <ul>
        {items && items.map(item => (
          item && <li key={item.id}>{item.name}: {item.description} ({item.newProp})</li>
        ))}
      </ul>

      <br/>
      <h1>Single Item:</h1>
      {singleItem && <div>{singleItem.id}: {singleItem.name} - {singleItem.description} ({singleItem.newProp})</div>}
    </div>
  );
}

export default App;
