import React from 'react'

const withReducer = (key , reducer) =>WrappedComponent => {
  
  class extends React.PureComponent{
    constructor(props){
      super(props)

    }
    render(){
      return <WrappedComponent {...this.props} />
    }
  }
  // return (
   
  // )
}
export default withReducer