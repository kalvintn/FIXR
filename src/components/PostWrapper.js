// CSS
import './PostWrapper.css';

// React
import React from 'react';

function PostWrapper(props){
    return (
        <div className='post-wrapper'>
            { props.children }
        </div>
    );
}

export default PostWrapper;