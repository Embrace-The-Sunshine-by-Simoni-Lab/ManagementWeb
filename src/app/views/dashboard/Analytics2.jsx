import React, { useEffect, useState } from 'react'
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

/*
function getVirtulData(year) {
    year = year || '2017';
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate(+year + 1 + '-01-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
        ]);
    }
    console.log(data);
    return data;
}*/

const Analytics2 = ({ height, color = [] }) => {
    const [summarize_data, useSummarizeData] = useState({});

    function readActivityData(filename) {
        fetch(filename)
            .then((response) => {
                response.json().then((data) => {
                    // return useFileData(data);
                    useSummarizeData(data)
                }).catch((err) => {
                    console.log(err);
                })
            });
    }

    function summarizeData(data) {
        let users = data.users;
        let dates = [];
        for (let i = 0; i < users.length; i++) {
            let activities = users[i]['activity_tracking'];
            for (let j = 0; j < activities.length; j++) {
                let date = activities[j].slice(0, 10);
                dates.push(date);
            }
        }

        let keys = [];
        let map = [];
        for (let i = 0; i < dates.length; i++) {
            let d = dates[i];
            let idx = keys.indexOf(d);
            if (idx === -1) {
                keys.push(d);
                map.push([d, 1]);
            } else {
                map[idx][1] += 1;
            }
        }
        return [keys, map];
    }

    function getVirtulData(year) {
        // console.log(jsonData);
        let pair = summarizeData(summarize_data);
        let keys = pair[0];
        let map = pair[1];
        // console.log(map);
        year = year || '2022';
        let date = +echarts.number.parseDate(year + '-01-01');
        let end = +echarts.number.parseDate(+year + 1 + '-01-01');
        let dayTime = 3600 * 24 * 1000;
        let data = [];
        for (let time = date; time < end; time += dayTime) {
            let time_format = echarts.format.formatTime('yyyy-MM-dd', time);
            let idx = keys.indexOf(time_format);
            if (idx === -1) {
                data.push([
                    time_format, 0
                    // Math.floor(Math.random() * 1000)
                ]);
            } else {
                let num = map[idx][1];
                data.push([
                    time_format,
                    num
                ]);
            }

            // data.push(map);
        }
        console.log(data);
        return data;
    }

    useEffect(() => {
        readActivityData("./generated.json")
    })

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
