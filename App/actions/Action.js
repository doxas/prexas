
import ActionExec from '../actions/ActionExec.js';
import Const      from '../constants/Const.js';

export default class Action {
    constructor(props){
        this.dispatcher = props.dispatcher;
    }
    update(eve){
        let value = ActionExec.update();
        this.dispatcher.dispatch({
            type: Const.TYPE.UPDATE,
            value: value
        });
    }
}

