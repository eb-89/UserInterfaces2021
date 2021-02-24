
/**
 *  Maintains security Data
 */


export default class SecurityData {
    constructor() {
      this.data = []
      this.insertCallbacks = []
      this.currentCount = 0;
    }

    addItem = (item, onSuccessCallback) => {
      item.id = this.currentCount;
      this.data.push(item)
      onSuccessCallback(item);

      for (let cb of this.insertCallbacks) {
        cb(item);
      }

      this.currentCount++
    }


    // We will probably not need this, but you can register a function to run on insert.
    registerInsertCallback(cb) {
      this.insertCallbacks.push(cb)

      const unregister = () => {
        this.insertCallbacks.splice(this.insertCallbacks.indexOf(cb), 1)
      }

      return {
        unregister: unregister
      }
    }


    removeItem = (item) => {
      this.data.splice(this.data.indexOf(item), 1);
    } 

    getAllItems = () => {
      return this.data
    }
}