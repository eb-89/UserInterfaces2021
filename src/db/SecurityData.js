

export default class SecurityData {
    constructor() {
      this.data = []
      this.updateCallbacks = []
    }

    addItem = (item, onSuccessCallback) => {
      this.data.push(item)
      onSuccessCallback(item);

      for (cb of this.updateCallbacks) {
        cb(item);
      }

    }

    // Simplified PubSub
    registerInsertCallback(cb) {
      this.updateCallbacks.push(cb)

      const unsubscribe = () => {
        console.log(this.updateCallbacks)
        this.updateCallbacks.splice(this.updateCallbacks.indexOf(cb), 1)
        console.log(this.updateCallbacks)
      }

      return {
        unsubscribe: unsubscribe
      }
    }


    removeItem = (item) => {
      this.data.splice(this.data.indexOf(item), 1);
    } 

    getAllItems = () => {
      return this.data
    }


}