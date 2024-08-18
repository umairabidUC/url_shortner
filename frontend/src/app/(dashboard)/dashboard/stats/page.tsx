'use client';

import { useGetStatsQuery, useGetUserUrlsQuery } from '@/lib/api/urlApiSlice';
import { Chip } from '@nextui-org/react';
import { ConfigProvider, Table, TableColumnsType } from 'antd';
import React from 'react';
import { FaStore } from 'react-icons/fa';

function Stats() {

  type UrlData = {
    original_url: string;
    short_url: string;
    url_type: "store" | "product" | "misc";
    tag_id: number;
  };

  type Stats = {
    clicks: number;
    user_agent: string;
    ip_address: string;
    access_date: string;
    access_time: string;
    short_url: string;  // Assuming each stat object also has the associated short URL
  };

  const { data: urls, isLoading: urlsLoading } = useGetUserUrlsQuery(JSON.parse(localStorage.getItem("userID") || ""));
  const { data: stats, isLoading: statsLoading } = useGetStatsQuery(JSON.parse(localStorage.getItem("userID") || ""));

  const columns: TableColumnsType<UrlData> = [
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
  ];
  console.log("STATS: ", stats)

  function renderExpandedRow(record: UrlData) {
    const urlStats = stats

    const statsColumns: TableColumnsType<Stats> = [
      { title: "Number Of Clicks", dataIndex: "clicks", key: "clicks" },
      { title: "User Agent", dataIndex: "user_agent", key: "user_agent" },
      { title: "IP Address", dataIndex: "ip_address", key: "ip_address" },
      { title: "Access Date", dataIndex: "access_date", key: "access_date" },
      { title: "Access Time", dataIndex: "access_time", key: "access_time" }
    ];

    return (
      <Table
        columns={statsColumns}
        dataSource={urlStats}
        pagination={false}
        loading={statsLoading}
      />
    );
  }

  return (
    <div>
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
          dataSource={urls?.result}
          loading={urlsLoading}
          expandable={{ expandedRowRender: renderExpandedRow }}
        />
      </ConfigProvider>
    </div>
  );
}

export default Stats;
