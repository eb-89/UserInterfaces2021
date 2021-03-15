
/**
 * Undo Redo Manager, inspired by the one provided by Lars Oesticher.
 */ 

export default class UndoRedo {
  constructor() {
    this.undostack = [];
    this.redostack = [];
  }

/**
 * Executes the execute function in the function object.
 */ 
  doit = (funcobj) => {
    funcobj.execute.fun(...funcobj.execute.args);
    this.undostack.push(funcobj);
    this.redostack = []
  }

/**
 * Executes the unexecute function in the function object.
 * This function is supposed to be the inverse of the execute-function, but does not have to be.
 */ 
  undoit = () => {
    if (this.undostack.length) {
      let funcobj = this.undostack.pop();
      funcobj.unexecute.fun(...funcobj.unexecute.args);
      this.redostack.push(funcobj);
    }
  }

/**
 * Executes the execute function in the function object again.
 */ 
  redoit = () => {
    if (this.redostack.length) {
      let funcobj = this.redostack.pop();
      funcobj.execute.fun(...funcobj.execute.args);
      this.undostack.push(funcobj);
    }
  }

/**
 * Returns booleans to determine whether the undo/redo stacks are empty.
 */ 
  isUndo() {
    return this.undostack.length ? true : false
  }
  isRedo() {
    return this.redostack.length ? true : false
  }
}

