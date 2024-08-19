'use client';

import { useGetStatsQuery, useGetUserUrlsQuery } from '@/lib/api/urlApiSlice';
import { Button, Chip } from '@nextui-org/react';
import { ConfigProvider, Table, TableColumnsType } from 'antd';
import React from 'react';
import { FaStore } from 'react-icons/fa';
import { IoIosRefreshCircle } from "react-icons/io";


function Stats() {


  type UrlData = {
    original_url: string;
    short_url: string;
    url_type: "store" | "product" | "misc";
    tag_id: number;
    urlClicksCount: number;
  };

  type Stats = {
    clicks: number;
    user_agent: string;
    ip_address: string;
    access_date: string;
    access_time: string;
    short_url: string;  // Assuming each stat object also has the associated short URL
  };

  const { data: stats, isLoading: statsLoading, refetch } = useGetStatsQuery(JSON.parse(localStorage.getItem("userID") || ""));

  const columns: TableColumnsType<UrlData> = [
    Table.EXPAND_COLUMN,
    {
      title: 'Original Url',
      dataIndex: 'original_url',
      key: 'original_url',
      render: (text: string) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: 'Shortened Url',
      dataIndex: 'short_url',
      key: 'short_url',
    },
    {
      title: "Url Type",
      dataIndex: "url_type",
      key: "url_type",
      render: (_: any, record: UrlData) => (
        <Chip variant="bordered" color={record.url_type == "store" ? "primary" : (record.url_type == "product" ? "warning" : "default")} startContent={<FaStore size={17} />}>{record.url_type == null ? "NULL" : record.url_type.toUpperCase()}</Chip>
      )
    },
    {
      title: "Number Of Clicks", dataIndex: "urlClicksCount", key: "urlClicksCount",
      render: (_, record: UrlData) => (
        <p>{record.urlClicksCount}</p>
      )
    }
  ];
  console.log("STATS: ", stats)

  function renderExpandedRow(record: UrlData) {
    // Find the stats for the specific short_url
    const urlStats = stats.result.find((stat: any) => stat.short_url === record.short_url);

    // Flatten the array of clicks related to this short_url
    const urlClickData = urlStats?.url_click.flat() || [];

    const statsColumns: TableColumnsType<Stats> = [
      {
        title: "User Agent",
        dataIndex: "user_agent",
        key: "user_agent",
        render: (_, record: Stats) => <p>{record.user_agent}</p>,
      },
      {
        title: "IP Address",
        dataIndex: "ip_address",
        key: "ip_address",
        render: (_, record: Stats) => <p>{record.ip_address}</p>,
      },
      {
        title: "Access Date",
        dataIndex: "access_date",
        key: "access_date",
        render: (_, record: Stats) => <p>{record.access_date}</p>,
      },
      {
        title: "Access Time",
        dataIndex: "access_time",
        key: "access_time",
        render: (_, record: Stats) => <p>{record.access_time}</p>,
      }
    ];

    return (
      <Table
        columns={statsColumns}
        dataSource={urlClickData}
        pagination={false}
        loading={statsLoading}
        rowKey="click_id" // Assuming click_id is a unique identifier for each click
      />
    );
  }

  return (
    <div className='flex flex-col justify-center'>
      <Button color='success' className='items-center' onClick={refetch}><IoIosRefreshCircle size={20} />
        Refresh</Button>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBgContainer: 'black',
              colorText: "white",
              borderColor: "white",
              algorithm: true,
            },
          }
        }}
      >
        <Table
          columns={columns}
          dataSource={stats?.result.map((row, index) => ({ ...row, key: row.short_url || index }))}
          loading={statsLoading}
          expandable={{ expandedRowRender: renderExpandedRow }}
        />
      </ConfigProvider>
    </div>
  );
}

export default Stats;
