import React from 'react';

export default function Queue(props) {
    let queueList = props.people.map((homie, i) => {
        return <p key={i}>{homie}</p>
    })
    return (
        <div className='Queue'>
            <h2>Current Queue</h2>
            {queueList}
        </div>
    )
}