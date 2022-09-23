import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import ReactEcharts from 'echarts-for-react'
// import { useTheme } from '@mui/system'
import * as echarts from 'echarts';
// import * as fs from 'fs';
// import fetch from 'node-fetch';
import axios from 'axios';

const AnalyticsRoot = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Analytics2 = ({ height, color = [] }) => {
    const [summarizeData, UseSummarizeData] = useState({ users: [] });
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                './generated.json',
            );

            UseSummarizeData(result.data);
        };

        fetchData();
    }, []);

    function summarize(data) {
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
        let pair = summarize(summarizeData);
        let keys = pair[0];
        let map = pair[1];
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
                ]);
            } else {
                let num = map[idx][1];
                data.push([
                    time_format,
                    num
                ]);
            }
        }
        console.log(data);
        return data;
    }

    const option = {
        tooltip: {
            position: 'top'
        },
        visualMap: {
            min: 0,
            max: 10,
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
