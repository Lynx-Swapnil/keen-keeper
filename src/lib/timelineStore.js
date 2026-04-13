const store = globalThis.__keenKeeperTimelineStore || {
  entries: [],
  listeners: new Set(),
};

globalThis.__keenKeeperTimelineStore = store;

const notifyListeners = () => {
  store.listeners.forEach((listener) => listener(store.entries));
};

export const getTimelineEntries = () => [...store.entries];

export const addTimelineEntry = (entry) => {
  store.entries = [entry, ...store.entries];
  notifyListeners();
};

export const subscribeTimelineEntries = (listener) => {
  store.listeners.add(listener);

  return () => {
    store.listeners.delete(listener);
  };
};