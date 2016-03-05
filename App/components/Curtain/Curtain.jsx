
import React    from 'react';
import ReactDOM from 'react-dom';

// props ======================================================================
//  visible(bool)   : last visibility
//  timeRange(float): animation time range(second)
// ============================================================================

export default class Curtain extends React.Component {
    constructor(props){
        super(props);
        // props
        this.timeRange = this.props.timerange;

        // state
        const style = this.props.visible ? {
            display: 'block',
            opacity: 1.0
        } : {
            display: 'block',
            opacity: 0.0
        };
        this.state = {
            style: style
        };

        // method
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        if(this.props.visible){
            setTimeout((()=>{
                this.setState({style: {display: 'block', opacity: 1.0}});
            }).bind(this), 50);
        }else{
            setTimeout((()=>{
                this.setState({style: {display: 'none', opacity: 0.0}});
            }).bind(this), this.timeRange * 1000);
        }
    }
    styles(){
        return {
            curtain: {
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: '0px',
                left: '0px',
                zIndex: '9999',
                display: this.state.style.display,
                opacity: this.state.style.opacity,
                transition: 'opacity ' + this.timeRange + 's ease-in',
            }
        };
    }
    render(){
        const styles = this.styles();
        return (
            <div style={styles.curtain}/>
        );
    }
}

