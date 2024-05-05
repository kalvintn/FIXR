// CSS
import './Main.css';

// React
import React from 'react';

function Main(props){
    return (
        <main>
            { props.children }
        </main>
    );
}

export default Main;