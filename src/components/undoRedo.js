
/**
 * Undo Redo Manager, inspired by the one provided by Lars Oesticher.
 */ 

export default class UndoRedo {
  constructor() {
    this.undostack = [];
    this.redostack = [];
  }

  doit = (funcobj) => {
    funcobj.execute.fun(...funcobj.execute.args);
    this.undostack.push(funcobj);
    this.redostack = []
  }

  undoit = () => {
    if (this.undostack.length) {
      let funcobj = this.undostack.pop();
      funcobj.unexecute.fun(...funcobj.unexecute.args);
      this.redostack.push(funcobj);
    }
  }

  redoit = () => {
    if (this.redostack.length) {
      let funcobj = this.redostack.pop();
      funcobj.execute.fun(...funcobj.execute.args);
      this.undostack.push(funcobj);
    }
  }

  isUndo() {
    return this.undostack.length ? true : false
  }
  isRedo() {
    return this.redostack.length ? true : false
  }
}

