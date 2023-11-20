interface StorageType {
  loadState: (props: string) => any;
  saveState: (props: {}, name: string) => any;
}

function useLocalstorage(): StorageType {
  const loadState = (keyName: string) => {
    try {
      const serialState = localStorage.getItem(keyName);
      if (serialState === null) {
        return undefined;
      }
      return JSON.parse(serialState);
    } catch (err) {
      return undefined;
    }
  };

  const saveState = (state: {}, keyName: string) => {
    try {
      const serialState = JSON.stringify(state);
      localStorage.setItem(keyName, serialState);
    } catch (err) {
      console.log(err);
    }
  };

  return { loadState, saveState };
}

export default useLocalstorage;
