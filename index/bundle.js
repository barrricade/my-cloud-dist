import React, {Component} from 'react'

export default class Bundle extends React.Component {

    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null,
        load: null
    }

    componentDidMount() {
        this.state.load = this.props.load
        this.load(this.props)
    }
    static getDerivedStateFromProps(nextProps,prevState) {
        if (nextProps.load !== prevState.load) {
            nextProps.load((mod) => {
                return {
                    mod: mod.default ? mod.default : mod
                }
            })
        }
        return null
    }
    // componentDidUpdate(prevProps, prevState, snapshot){
    //     if(this.props.load){
    //     // 做一些需要this.props的事
    //         this.load(prevProps)
    //     }
    //    }
    load(props) {
        this.setState({
            mod: null
        })
        props.load((mod) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        if (!this.state.mod)
            return false
        return this.props.children(this.state.mod)
    }
}