import React from "react";
import { Chart } from "react-google-charts";


export function Graph(props) {
    const orderBy = props.isStatByStay ? `Stays in ${props.city}` : "City"
    let data = [
        [`${orderBy}`, "Orders",],
    ]
    props.statistics.forEach(dataElement => { return data.push(dataElement) })

    const options = {
        chart: {
            title: `Orders By ${orderBy}`,
            subtitle: "",
        },
        colors: ["#ff385c"],
        legend: { position: 'left' },
    }

    const chartEvents = [
        {
            eventName: "select",
            callback({ chartWrapper }) {
                // const dataTable = chartWrapper.getDataTable()
                let statisticsIdx = ("Selected ", chartWrapper.getChart().getSelection()[0]?.row)
                if (!props.isStatByStay) {
                    let cityName = props.statistics[statisticsIdx][0]
                    props.setStatistics(cityName)
                }
            }
        }
    ]
    return (
        <Chart
            chartType="Bar"
            width={"100%"}
            height={"400px"}
            data={data}
            options={options}
            chartEvents={chartEvents}

        />
    );
}