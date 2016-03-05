
import Event        from 'events';
import EventEmitter from 'eventemitter3'
import Constant     from '../constants/Constant.js';

export default class Store extends Event.EventEmitter {
    constructor(props){
        super(props);
        // property
        this.ready = false;
        this.pages = [];
        this.activePage = 0;

        // method
        this.registTypeHandler = this.registTypeHandler.bind(this);
        this.getActivePage = this.getActivePage.bind(this);
        this.getPageCount = this.getPageCount.bind(this);
        this.getAllPages = this.getAllPages.bind(this);
        this.initialized = this.initialized.bind(this);

        // initialize
        this.dispatcher = props.dispatcher;
        this.dispatcher.register(this.registTypeHandler);
    }
    registTypeHandler(payload){
        if(this.hasOwnProperty(payload.type)){this[payload.type].bind(this)(payload);}
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

    // registers
    initialized(payload){
        this.ready = payload.value;
        this.emit(Constant.EMIT.INITIALIZED, this.ready);
    }
    update(payload){
        this.pages[payload.value - 1] = '# test1\n\n## test2\n\ntest content';
        this.emit(Constant.EMIT.UPDATE, this.getAllPages());
    }
}

