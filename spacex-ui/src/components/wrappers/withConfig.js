import React from 'react'

const withConfig = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                config: window.$config,
            }
        }
        render() {
            return (
                <WrappedComponent config={this.state.config} {...this.props} />
            )
        }
    }
}

export default withConfig