import React from 'react';
import data from './data.json';

const Innlegg = () => {
    console.log(data)
    return <div>
        {data.map(innlegg=>(<div>
            <h3>{innlegg.event}</h3>
            <p>{innlegg.description}</p>
        </div>))}
    </div>;
};

export default Innlegg;
