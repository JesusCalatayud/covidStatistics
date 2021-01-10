import React, { useState, useEffect } from 'react';
import WorldMap from '../WorldMap';
import TableMUI from '../TableMUI';

const filterOptions = [
    {
        name: 'Coronavirus Cases',
        mapColor: 'blues'
    },

    {
        name: 'Total Recovered',
        mapColor: 'greens'
    },

    {
        name: 'Total Death',
        mapColor: 'reds'
    },

    {
        name: 'Active Cases',
        mapColor: 'oranges'
    }
]

const DataCard = () => {

    useEffect(() => {
        if (!cards.length) {
            fetchData();
        }
    })

    const [cards, setCards] = useState([])
    const [filter, setFilter] = useState([filterOptions[0]])

    const updateFilter = (selectedCard) => {
        const updatedFilter = filterOptions.filter(option => option.name === selectedCard)
        setFilter(updatedFilter)
    }

    const fetchData = async () => {
        const data = await fetch('https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats')
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch(error => console.log(error));

        const cardTypes = [
            {
                title: 'Coronavirus Cases',
                style: 'card text-white bg-primary',
                number: data && data.data.total_cases && data.data.total_cases.toLocaleString()
            },
            {
                title: 'Total Recovered',
                style: 'card text-white bg-success',
                number: data && data.data.recovery_cases && data.data.recovery_cases.toLocaleString()
            },
            {
                title: 'Total Death',
                style: 'card text-white bg-danger',
                number: data && data.data.death_cases && data.data.death_cases.toLocaleString()
            },
            {
                title: 'Active Cases',
                style: 'card text-white bg-warning',
                number: data && data.data.currently_infected && data.data.currently_infected.toLocaleString()
            }
        ];

        return setCards([...cardTypes]);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'grid', gridTemplateRows: '30vh 70vh' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {cards.length && cards.map((card, index) => {
                        return (
                            <div onClick={() => updateFilter(card.title)} className={card.style} style={{ maxWidth: '18rem', width: '12rem', justifySelf: index === 1 || index === 3 ? 'start' : 'end', alignSelf: index === 2 || index === 3 ? 'start' : 'end', cursor: 'pointer' }} key={index}>
                                <div className="card-header">{card.title}</div>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontWeight: 'bold' }}>{card.number}</h5>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <WorldMap filter={filter} />
                </div>
            </div>
            <div style={{ backgroundColor: 'beige', width: '100%', boxSizing: 'border-box' }}>
                <TableMUI filter={filter} />
            </div>
        </div>

    );
};

export default DataCard;