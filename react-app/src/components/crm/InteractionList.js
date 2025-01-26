import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InteractionList = () => {
    const [interactions, setInteractions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/interactions/')
            .then(response => {
                setInteractions(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the interactions!", error);
            });
    }, []);

    return (
        <div>
            <h1>Interactions</h1>
            <ul>
                {interactions.map(interaction => (
                    <li key={interaction.id}>
                        {interaction.interaction_type} with {interaction.customer.user.username} - {interaction.notes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InteractionList;