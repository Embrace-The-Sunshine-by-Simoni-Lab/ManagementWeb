import React from 'react'
import { styled } from '@mui/system'
import ReactEcharts from 'echarts-for-react'
// import { useTheme } from '@mui/system'
import * as echarts from 'echarts';
// import * as fs from 'fs';
import fetch from 'node-fetch';

const AnalyticsRoot = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

function readActivityData(filename) {
    fetch(filename)
        .then(response => response.json())
        .then(data => { summarizeData(data) })
        .catch(error => { console.log(error); })
}

function summarizeData(data) {
    console.log(data);
}

function getVirtulData(year) {
    readActivityData("generated.json");
    year = year || '2022';
    let date = +echarts.number.parseDate(year + '-01-01');
    let end = +echarts.number.parseDate(+year + 1 + '-01-01');
    let dayTime = 3600 * 24 * 1000;
    let data = [];
    for (let time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 1000)
        ]);
    }
    return data;
}

const Analytics2 = ({ height, color = [] }) => {

    // const theme = useTheme()

    const option = {
        /*
        grid: {
            top: '10%',
            bottom: '10%',
            left: '5%',
            right: '5%',
        },
        legend: {
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: theme.palette.text.secondary,
                fontSize: 14,
                fontFamily: 'roboto',
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                // show: false
                lineStyle: {
                    color: theme.palette.text.secondary,
                    opacity: 0.15,
                },
            },
            axisLabel: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        series: [
            {
                data: [30, 40, 20, 50, 40, 80, 90],
                type: 'line',
                stack: 'This month',
                name: 'This month',
                smooth: true,
                symbolSize: 4,
                lineStyle: {
                    width: 4,
                },
            },
            {
                data: [20, 50, 15, 50, 30, 70, 95],
                type: 'line',
                stack: 'Last month',
                name: 'Last month',
                smooth: true,
                symbolSize: 4,
                lineStyle: {
                    width: 4,
                },
            },
        ],*/
        tooltip: {
            position: 'top'
        },
        visualMap: {
            min: 0,
            max: 1000,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            top: 'top'
        },
        calendar: [
            {
                top:100,
                range: '2022',
                cellSize: ['auto', 20]
            },
            {
                top: 360,
                range: '2023',
                cellSize: ['auto', 20]
            },
        ],
        series: [
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 0,
                data: getVirtulData('2022')
            },
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 1,
                data: getVirtulData('2023')
            },
        ]
    }
    return (
        <AnalyticsRoot>
            <ReactEcharts
                style={{ height: height }}
                option={{
                    ...option,
                    color: [...color],
                }}
            />
        </AnalyticsRoot>
    )
}

export default Analytics2
