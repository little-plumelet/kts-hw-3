import { useCallback, useState } from 'react';

export const useOpen = (): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, open, close];
};
