export default class StateLoader {
  loadState() {
    try {
      const serializedState = localStorage.getItem('din-don-heart:state');

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('din-don-heart:state', serializedState);
    } catch (err) {
      console.error(err, this);
    }
  }

  initializeState() {
    if (!Math) console.log(this);
    return {
      // state object
    };
  }
}
