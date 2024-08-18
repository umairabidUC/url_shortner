
"use client";
import { useGetStatsQuery } from '@/lib/api/urlApiSlice';
import { Table, TableColumnsType } from 'antd';
import React from 'react'

export default function Stats() {
    const {data : stats, isLoading} = useGetStatsQuery(JSON.parse(localStorage.getItem("userID") || ""))
    type Stats = {
        clicks: number,
        user_agent: string,
        ip_address: string,
        access_date: string,
        access_time: string,
    }
    const columns: TableColumnsType<Stats> = [
        {
            title: "Number Of Clicks",
            dataIndex: "clicks",
            key: "clicks"
        },
        {
            title: "User Agent",
            dataIndex: "user_agent",
            key: "user_agent"
        },
        {
            title: "IP Address",
            dataIndex: "ip_address",
            key: "ip_address"
        },
        {
            title: "Access Date",
            dataIndex: "access_date",
            key: "access_date"
        },
        {
            title: "Access Time",
            dataIndex: "access_time",
            key: "access_time"
        }
      ];
  return <Table columns={columns} dataSource={stats} pagination={false} loading={isLoading}/>
}
