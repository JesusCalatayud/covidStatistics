import React from 'react';
import Chart from "react-google-charts";

const WorldMap = () => {

    return (
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="GeoChart"
                data={[
                    ['Country', 'Popularity'],
                    ['Germany', 200],
                    ['United States', 300],
                    ['Brazil', 400],
                    ['Canada', 500],
                    ['France', 600],
                    ['RU', 700],
                    ['Spain', 1000]
                ]}
                mapsApiKey="YAIzaSyA-spAbFUwiYKjuY6UbeZZVgHspS4AounU"
            />
        </div>

    );
};

export default WorldMap;