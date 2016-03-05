
import React      from 'react';
import ReactDOM   from 'react-dom';
import Flux       from 'flux';
import Store      from './stores/Store.js';
import Action     from './actions/Action.js';
import Constant   from './constants/Constant.js';

import Page       from './components/Page';
import Curtain    from './components/Curtain';

export default class App extends React.Component {
    constructor(props){
        super(props);
        var dispatcher = new Flux.Dispatcher();
        this.store     = new Store({dispatcher: dispatcher, props: props});
        this.action    = new Action({dispatcher: dispatcher, store: this.store, props: props});

        // state
        this.state     = {
            initialized: false,
            visible: false,
            activePage: this.store.getActivePage(),
            pageCount: this.store.getPageCount(),
            pages: this.store.getAllPages()
        };

        // method
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.initialized = this.initialized.bind(this);
        this.update = this.update.bind(this);

        // event
        this.onClick = this.onClick.bind(this);
    }
    componentDidMount(){
        this.store.on(Constant.EMIT.INITIALIZED, this.initialized);
        this.store.on(Constant.EMIT.UPDATE, this.update);

        this.action.initialized();
    }
    componentWillUnmount(){
        this.store.removeListener(Constant.EMIT.INITIALIZED, this.initialized);
        this.store.removeListener(Constant.EMIT.UPDATE, this.update);
    }
    initialized(){
        setTimeout((()=>{this.setState({initialized: true, visible: true});}).bind(this), 2000);
    }
    update(){
        this.setState({activePage: this.store.getActivePage()});
    }
    onClick(eve){
        eve.preventDefault();
        eve.stopPropagation();
        this.action.update(eve);
    }
    styles(){
        return {
            app: {
                backgroundColor: 'crimson',
                width: '100%',
                height: '100%',
                boxShadow: '0px 0px 0px 20px #333 inset'
            }
        };
    }
    render(){
        const styles = this.styles();
        var generator = ((value, key)=>{
            return (
                <Page content={value} store={this.store} action={this.action} key={Date.now() + ':' + key} />
            );
        }).bind(this);
        return (
            <div style={styles.app} onClick={this.onClick}>
                {this.state.pages.map(generator)}
                <Curtain visible={!this.state.visible} timerange={0.5} />
            </div>
        );
    }
}

