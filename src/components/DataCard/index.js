import React, { useState, useEffect } from 'react';

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
                style: 'card text-white bg-primary mb-3',
                number: data && data.total && data.total.today_confirmed.toLocaleString()
            },
            {
                title: 'Total Recovered',
                style: 'card text-white bg-success mb-3',
                number: data && data.total && data.total.today_recovered.toLocaleString()
            },
            {
                title: 'Total Death',
                style: 'card text-white bg-danger mb-3',
                number: data && data.total && data.total.today_deaths.toLocaleString()
            },
            {
                title: 'Active Cases',
                style: 'card text-white bg-warning mb-3',
                number: data && data.total && data.total.today_open_cases.toLocaleString()
            }
        ];

        return setCards([...cardTypes]);
    };

    return (
        <div>
            {cards.length && cards.map((card, index) => {
                return (
                    <div className={card.style} style={{ maxWidth: '18rem' }} key={index}>
                        <div className="card-header">Icon</div>
                        <div className="card-body">
                            <p className="card-text" style={{ fontWeight: 'bold' }}>{card.title}</p>
                            <h5 className="card-title" style={{ fontWeight: 'bold' }}>{card.number}</h5>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default DataCard;