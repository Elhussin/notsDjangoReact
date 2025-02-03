import React, { useEffect, useState } from 'react';
import { getinteractions } from '../../Api/crmApi';

const InteractionList = () => {
    const [interactions, setInteractions] = useState([]);

       useEffect(() => {
           const fetchData = async () => {
               try {
                   const data = await getinteractions();
                   console.log('Customers:', data);
                   setInteractions(data);
               } catch (error) {
                   console.error('Error fetching branches:', error);
               }
           };
           fetchData();
       }, []);
    return (
        <div>
            <h1>Interactions</h1>
            <ul>
                {interactions.map(interaction => (
                    <li key={interaction.id}>
                        {interaction.interaction_type} with {interaction.customer} - {interaction.notes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InteractionList;