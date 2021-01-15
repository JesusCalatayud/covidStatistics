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
];

const DataCard = () => {

    useEffect(() => {
        if (!cards.length) {
            fetchData();
        };
    });

    const [cards, setCards] = useState([]);
    const [filter, setFilter] = useState([filterOptions[0]]);
    const [countryData, setCountryData] = useState([]);

    const updateFilter = (selectedCard) => {
        const updatedFilter = filterOptions.filter(option => option.name === selectedCard)
        setFilter(updatedFilter)
    };

    const fetchData = async () => {
        const data = await fetch("https://covid-193.p.rapidapi.com/statistics", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "062c452a30msh2c1b18844690b18p1a3587jsn26c7ed67f37d",
                "x-rapidapi-host": "covid-193.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch(error => console.log(error));
        createCards(data);

    };

    const createCards = (data) => {
        const cardData = data.response.filter(el => el.continent === 'All')
        const cardTypes = [
            {
                title: 'Coronavirus Cases',
                style: 'card text-white bg-primary',
                number: cardData[0] && cardData[0].cases && cardData[0].cases.total && cardData[0].cases.total.toLocaleString()
            },
            {
                title: 'Total Recovered',
                style: 'card text-white bg-success',
                number: cardData[0] && cardData[0].cases && cardData[0].cases.recovered && cardData[0].cases.recovered.toLocaleString()
            },
            {
                title: 'Total Death',
                style: 'card text-white bg-danger',
                number: cardData[0] && cardData[0].deaths && cardData[0].deaths.total && cardData[0].deaths.total.toLocaleString()
            },
            {
                title: 'Active Cases',
                style: 'card text-white',
                number: cardData[0] && cardData[0].cases && cardData[0].cases.active && cardData[0].cases.active.toLocaleString()
            }
        ];

        setCards([...cardTypes]);
        setCountryData([data]);
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
            <div style={{ display: 'grid', gridTemplateRows: '25vh 70vh', justifyItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {cards.length && cards.map((card, index) => {
                        return (
                            <div onClick={() => updateFilter(card.title)} className={card.style} style={{ backgroundColor: 'orange', opacity: card.title === filter[0].name ? '1' : '0.6', maxWidth: '18rem', width: '12rem', justifySelf: index === 1 || index === 3 ? 'start' : 'end', alignSelf: index === 2 || index === 3 ? 'start' : 'end', cursor: 'pointer' }} key={index}>
                                <div className="card-header">{card.title}</div>
                                <div className="card-body" >
                                    <h5 className="card-title" style={{ fontWeight: 'bold' }}>{card.number}</h5>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <WorldMap filter={filter} countryData={countryData} />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TableMUI filter={filter} countryData={countryData} />
            </div>
        </div>

    );
};

export default DataCard;