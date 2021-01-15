import React, { useState, useEffect } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import countries from './world_countries.json';

const styles = {
    tooltip: {
        container: {
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '10px',
            fontSize: '0.8rem',
            boxShadow: '0px 1px 5px -1px rgba(0,0,0,0.28)'
        },

        title: {
            fontWeight: 'bold',
            margin: '0',
            paddingBottom: '3px'
        },

        text: {
            margin: '0',
            paddingLeft: '0.5rem'
        }
    }
};

const WorldMap = ({ filter, countryData }) => {

    const [dataToRender, setDataToRender] = useState([]);

    useEffect(() => {

        const filterData = () => {
            const data = countryData[0].response.map(el => {
                const countriesData = countries.features.filter(country => country.properties.name === el.country)
                if (countriesData.length) {
                    return (
                        {
                            id: countriesData[0].id,
                            value: filter[0].name === 'Coronavirus Cases' ? el.cases.total :
                                filter[0].name === 'Total Recovered' ? el.cases.recovered :
                                    filter[0].name === 'Total Death' ? el.deaths.total :
                                        el.cases.active,
                            name: filter[0].name
                        }
                    );
                } else {
                    return undefined;
                }
            });
            const filteredData = data.filter(el => typeof (el) !== 'undefined');
            setDataToRender([...filteredData]);
        }

        if (countryData.length) {
            filterData()
        }

    }, [filter, countryData]);

    const tooltipFormatter = (e) => {
        if (e && e.feature && e.feature.value) {
            return (
                <div style={styles.tooltip.container}>
                    <p style={styles.tooltip.title}>{e && e.feature && e.feature.data && e.feature.data.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ height: '1rem', width: '1rem', borderRadius: '1rem', backgroundColor: e && e.feature && e.feature.color }}></div>
                        <p style={styles.tooltip.text}>{e && e.feature && e.feature.label}: <strong>{e && e.feature && e.feature.value && e.feature.value.toLocaleString()} </strong>
                        </p>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        };
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {dataToRender.length ?
                <ResponsiveChoropleth
                    data={[...dataToRender]}
                    features={countries.features}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    colors={filter[0].mapColor}
                    domain={[0, 1000000]}
                    unknownColor="#666666"
                    label="properties.name"
                    valueFormat=".2s"
                    projectionTranslation={[0.5, 0.5]}
                    projectionRotation={[0, 0, 0]}
                    enableGraticule={false}
                    graticuleLineColor="#dddddd"
                    borderWidth={0.5}
                    borderColor="#152538"
                    tooltip={(e) => tooltipFormatter(e)}
                    legends={[
                        {
                            anchor: 'bottom-left',
                            direction: 'column',
                            justify: true,
                            translateX: 20,
                            translateY: -100,
                            itemsSpacing: 0,
                            itemWidth: 94,
                            itemHeight: 18,
                            itemDirection: 'left-to-right',
                            itemTextColor: '#444444',
                            itemOpacity: 0.85,
                            symbolSize: 18,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000000',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
                :
                'Loading data...'
            }
        </div>
    );
};

export default WorldMap;