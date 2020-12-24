import React from 'react';

// CreateContext
export const globalContext = React.createContext();

// GlobalState
class GlobalStateProvider extends React.Component {
    state = {
        Title:'React Test Title'
    }
    render() { 
        return ( 
            <globalContext.Provider value={this.state}>
                {this.props.children}
            </globalContext.Provider>
         );
    }
};
 export default GlobalStateProvider;


