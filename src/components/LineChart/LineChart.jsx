"use client"
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        pv: 1398,
        amt: 2210,
    },
    {
        pv: 4800,
        amt: 2181,
    },
    {
        pv: 3800,
        amt: 2500,
    },
];

export default class LineChart extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="100%" className="h-[10rem]">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="amt" stroke="#fff" fill="#fff" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
