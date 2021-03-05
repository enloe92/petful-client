import React from 'react';

export default function PetSquare(props) {
    return (
        <div className='PetSquare'>
            <img src={props.pet.imageURL} alt='' height='300px' />
            <p>Name: {`${props.pet.name}`}</p>
            <p>Age: {`${props.pet.age}`}</p>
            <p>Breed: {`${props.pet.breed}`}</p>
            <p>Description: {`${props.pet.description}`}</p>
            <p>Story: {`${props.pet.story}`}</p>
            <button
                onClick={() => props.adoptButtonClicked(props.type)}
                disabled={!props.adoptable}>Adopt</button>
        </div>
    )
}