import React    from 'react';
import ReactDOM from 'react-dom';
import Action   from 'actions/Action.js';
import Store    from '../stores/Store.js';
import Const    from '../constants/Const.js';
import Page     from './components/Page.jsx';

export default class App extends React.Component {
    constructor(props){
        super(props);
        dispatcher  = new Flux.Dispatcher;
        this.action = new Action({dispatcher: dispatcher, props: props});
        this.store  = new Store({dispatcher: dispatcher, props: props});
        this.state  = {
            activePage: this.store.getActivePage(),
            pageCount: this.store.getPageCount(),
            pages: this.store.getAllPages()
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.update = this.update.bind(this);
    }
    componentDidMount(){
        this.store.on(Const.EMIT.UPDATE, this.update);
    }
    componentWillUnmount(){
        this.store.removeListener(Const.EMIT.UPDATE, this.update);
    }
    update(){
        eve.preventDefault();
        eve.stopPropagation();
        this.setState({activePage: this.store.getActivePage()});
    }
    styles(){
        return {
            app: {
                width: '100%',
                height: '100%',
                boxShadow: '0px 0px 0px 3px #333 inset'
            }
        };
    }
    render(){
        const styles = this.styles();
        generator(value, key)=>{
            return (
                <Page action={this.action} store={this.store} key={key} content={value} />
            );
        }
        return (
            <div style={styles.app}>
                {this.state.pages.map(generator)}
            </div>
        );
    }
}

