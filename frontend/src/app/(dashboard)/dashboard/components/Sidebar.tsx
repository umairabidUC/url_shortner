"use client";

import React, { useState } from 'react';
import {
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { MdQueryStats } from 'react-icons/md';
import { RiLinksFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import UserInfo from './UserInfo'
import { RiQrScan2Line } from "react-icons/ri";
import { IoMdKey } from "react-icons/io";


const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: string,
  href: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    href,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/dashboard', "/dashboard", <DesktopOutlined />),
  getItem('Url Management', '/dashboard/urls', "/urls", <RiLinksFill />),
  getItem('Pre-Generated Urls', '/dashboard/pregen', '/users', <UserOutlined />),
  getItem('Logo', '/dashboard/logo', '/logo', <RiQrScan2Line />),
  getItem('Stats', '/dashboard/stats', '/stats', <MdQueryStats />),
  getItem('Api Keys', '/dashboard/apikey', '/apikey', <IoMdKey />),
];

export default function Sidebar({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorPrimary: 'purple',
              colorPrimaryBg: "black",
              colorBgContainer: "black",
              algorithm: true, // Enable algorithm
            },
          }
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <UserInfo isClosed={collapsed} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => { router.push(key) }} />
        </Sider>
      </ConfigProvider>
      <Layout style={{ background: "black" }}>
        <Header style={{ padding: 0, background: "black" }} />
        <Content style={{ margin: '0 16px', background: "black" }}>

          {children}

        </Content>
      </Layout>
    </Layout>
  );
};

