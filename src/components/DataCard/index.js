import React, { useState, useEffect } from 'react';
import WorldMap from '../WorldMap';

const DataCard = () => {

    useEffect(() => {
        fetchData();
    }, [])

    const [cards, setCards] = useState([])

    const fetchData = async () => {
        const data = await fetch('https://api.covid19tracking.narrativa.com/api/2021-01-03')
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));

        const cardTypes = [
            {
                title: 'Coronavirus Cases',
                style: 'card text-white bg-primary',
                number: data && data.total && data.total.today_confirmed.toLocaleString()
            },
            {
                title: 'Total Recovered',
                style: 'card text-white bg-success',
                number: data && data.total && data.total.today_recovered.toLocaleString()
            },
            {
                title: 'Total Death',
                style: 'card text-white bg-danger',
                number: data && data.total && data.total.today_deaths.toLocaleString()
            },
            {
                title: 'Active Cases',
                style: 'card text-white bg-warning',
                number: data && data.total && data.total.today_open_cases.toLocaleString()
            }
        ];

        return setCards([...cardTypes]);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', height: '100vh' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', placeItems: 'end', gap: '20px' }}>
                {cards.length && cards.map((card, index) => {
                    return (
                        <div className={card.style} style={{ maxWidth: '18rem', height: '200px', width: '200px', justifySelf: index === 1 || index === 3 ? 'start' : 'end', alignSelf: index === 2 || index === 3 ? 'start' : 'end' }} key={index}>
                            <div className="card-header">Icon</div>
                            <div className="card-body">
                                <p className="card-text" style={{ fontWeight: 'bold' }}>{card.title}</p>
                                <h5 className="card-title" style={{ fontWeight: 'bold' }}>{card.number}</h5>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <WorldMap />
            </div>
        </div>

    );
};

export default DataCard;