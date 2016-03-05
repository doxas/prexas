// import =====================================================================
import Event        from 'events';
import EventEmitter from 'eventemitter3'
import Const        from '../constants/Const.js';

export default class Store extends Event.EventEmitter {
    constructor(props){
        super(props);
        this.pages = [];
        this.activePage = 0;
        this.dispatcher = props.dispatcher;
        this.dispatcher.register((payload)=>{
            this.pages[payload.value - 1] = 'hello react';
            if(payload.type === Const.TYPE.UPDATE){
                this.emit(Const.EMIT.UPDATE);
            }
        });
    }
    getActivePage(){
        return this.activePage;
    }
    getPageCount(){
        return this.pages.length;
    }
    getAllPages(){
        return this.pages;
    }
}

