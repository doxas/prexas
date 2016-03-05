
import ActionExec from './ActionExec.js';
import Constant   from '../constants/Constant.js';

export default class Action {
    constructor(props){
        this.dispatcher = props.dispatcher;
        this.store      = props.store;
        this.exec       = new ActionExec({store: this.store});
    }
    initialized(){
        this.dispatcher.dispatch({
            type: Constant.TYPE.INITIALIZED,
            value: true
        });
    }
    update(eve){
        this.dispatcher.dispatch({
            type: Constant.TYPE.UPDATE,
            value: this.exec.update()
        });
    }
}

