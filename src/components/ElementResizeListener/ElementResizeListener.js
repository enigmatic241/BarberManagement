import React, { Component } from 'react'

import elementResizeDetectorMaker from 'element-resize-detector'

/*
 * This component renders a div and provides that div's width/height to it's children
 * The width/height updates as the div's size changes.
 *
 * NOTE: children is a FUNCTION not a node, see this article if
 * you haven't seen this pattern before: https://reactjs.org/docs/render-props.html
 */

class ElementResizeListener extends Component {


  state = {
    width: 0,
    height: 0,
  }

  componentDidMount() {
    this.erd = elementResizeDetectorMaker({
      strategy: 'scroll',
    })
    this.erd.listenTo(this.el, this.handleResize)
  }

  componentWillUnmount() {
    this.erd.uninstall(this.el)
  }

  handleRef = element => {
    this.el = element
  }

  handleResize = el => {
    const width = el.offsetWidth
    const height = el.offsetHeight

    this.setState({
      width,
      height,
    })
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <div ref={this.handleRef} {...rest}>
        {children(this.state)}
      </div>
    )
  }
}

export default ElementResizeListener