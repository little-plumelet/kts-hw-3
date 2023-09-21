import { useEffect, useRef } from 'react';
import { ILocalStore } from 'store/local/LocalStoreInterface';

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const store = useRef<null | T>(null);

  if (store.current === null) {
    store.current = creator();
  }

  useEffect(() => {
    return () => store.current?.destroy();
  }, []);

  return store.current;
};
