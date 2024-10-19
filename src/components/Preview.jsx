class Preview extends React.Component {

    componentDidMount () {
      MathJax.Hub.Queue(["Typeset",MathJax.Hub, ReactDOM.findDOMNode(this)]);
    }
  
    componentDidUpdate () {
      MathJax.Hub.Queue(["Typeset",MathJax.Hub, ReactDOM.findDOMNode(this)]);
    }
  
    render () {
      var tex= this.props.name
  
      if(!!tex) {
        texDisplay = "$$" + tex + "$$"
      }
      return (
        <>
        <div>The Tex!</div>
        <div>{texDisplay}</div>
        </>
      )
    }
  }