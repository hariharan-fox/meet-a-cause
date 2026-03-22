type Listener = (error: any) => void;
const listeners: Listener[] = [];

export const errorEmitter = {
  on(event: 'permission-error', listener: Listener) {
    if (event === 'permission-error') {
      listeners.push(listener);
    }
  },
  off(event: 'permission-error', listener: Listener) {
    if (event === 'permission-error') {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  },
  emit(event: 'permission-error', error: any) {
    if (event === 'permission-error') {
      listeners.forEach(l => l(error));
    }
  },
};
