"use client";

import React, { useState } from 'react';
import { ColorPicker, ColorPickerProps, ConfigProvider, GetProp, Popconfirm, QRCode, Space, Table, Tag, message } from 'antd';
import { useAddNewUrlMutation, useCreateTagMutation, useDeleteUrlMutation, useGetLogosQuery, useGetTagsQuery, useGetUserUrlsQuery, useUpdateUrlMutation } from '@/lib/api/urlApiSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Chip, Select, SelectItem, Image } from "@nextui-org/react";
import { MdOutlineContentCopy } from 'react-icons/md';
import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { FaQrcode, FaStore } from "react-icons/fa";
import { RxDownload } from "react-icons/rx";





const tagSchema = z.object({
  tag_name: z.string()
})

type tagType = z.infer<typeof tagSchema>
enum url_type {
  store,
  product,
  misc
}
const urlSchema = z.object({
  original_url: z.string().url(), // Validates that the original_url is a valid URL
  short_url: z.string(),          // No specific validation, just a string for short_url
  url_type: z.nativeEnum(url_type),
  tag_id: z.number()
});

type urlFormType = z.infer<typeof urlSchema>;



const handleCopyToClipboard = (short_url: string) => {
  const fullUrl = `http://localhost:3500/redirect/${short_url}`;
  navigator.clipboard.writeText(fullUrl)
    .then(() => alert('URL copied to clipboard!'))
    .catch((err) => console.error('Failed to copy URL: ', err));
};

export default function Urls() {
  const [messageApi, contextHolder] = message.useMessage();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenTags, onOpen: onOpenTags, onOpenChange: onOpenChangeTags } = useDisclosure();
  const { isOpen: isOpenQR, onOpen: onOpenQR, onOpenChange: onOpenChangeQR } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
  const [selectedLogo, setSelectedLogo] = useState("");







  const submitForm = (data: urlFormType, onClose: () => void) => {
    console.log("DATA FROM FORM: ", data);

    const user_id = JSON.parse(localStorage.getItem("userID") || "")
    addUrl({ ...data, user_id })
    successMessage("Url Created!!!")
    onClose();
    reset();
  };
  const { data, isLoading } = useGetUserUrlsQuery(JSON.parse(localStorage.getItem("userID") || ""));
  const { data: logos } = useGetLogosQuery(JSON.parse(localStorage.getItem("userID") || ""))

  const { register, handleSubmit, reset } = useForm<urlFormType>();
  const { register: registerTags, handleSubmit: handleSubmitTags, reset: resetTags } = useForm<tagType>();
  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit } = useForm<urlFormType>()
  const [editUrl] = useUpdateUrlMutation();
  const [addUrl] = useAddNewUrlMutation();
  const [deleteUrl] = useDeleteUrlMutation();
  console.log("LOGOS: ", logos)
  function doDownload(url: string, fileName: string) {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    successMessage("Download Started!")
  }
  const findLogo = (logo: any) => {
    const foundLogo = logo?.result.find((logo: any) => logo.logo_id == selectedLogo)
    if (foundLogo) return foundLogo.logo_path
  }
  console.log("SELECTED LOGO: ", selectedLogo)
  const downloadSvgQRCode = () => {
    const svg = document.getElementById('myqrcode')?.querySelector<SVGAElement>("svg");
    console.log(svg)
    const svgData = new XMLSerializer().serializeToString(svg!);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    doDownload(url, 'QRCode.svg');
  };

  const submitFormEdit = (data: any, onClose: () => void) => {
    const user_id = JSON.parse(localStorage.getItem("userID") || "")

    if (user_id) {
      editUrl({ ...data, user_id })
      successMessage("Url Edited!!")
      resetEdit()
      onClose()
    } else errorMessage("ERROR: Url editting Failed!")
  }
  const errorMessage = (error: string) => {
    messageApi.open({
      type: "error",
      content: error
    })
  }

  const successMessage = (success: string) => {
    messageApi.open({
      type: "success",
      content: success
    })
  }

  type UrlData = {
    url_id: string
    original_url: string;
    short_url: string;
    status: "active" | "inactive"; // Assuming 0 for inactive, 1 for active
    url_type: "store" | "product" | "misc";
    tag_id: number;
  };

  const columns = [
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
      title: "Status",
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: UrlData) => (
        <Chip variant="shadow" color={record.status === "active" ? "success" : "danger"}>
          {record.status === "active" ? "ACTIVE" : "INACTIVE"}
        </Chip>
      ),
    },
    {
      title: "Tag",
      dataIndex: "tag_id",
      key: "tag_id",
      render: (_: any, record: UrlData) => {
        const tag = tags?.result.find((tag: any) => tag.tag_id == record?.tag_id)
        return <Tag color={tag != undefined ? `#${tag.tag_name.split("#")[1]}` : ""}>{tag != undefined ? tag.tag_name.split("#")[0] : "NULL"}</Tag>
      }
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
      title: 'Action',
      key: 'action',
      render: (_: any, record: UrlData) => (
        <Space size="middle">
          <Button size="sm" color="primary" onClick={() => handleCopyToClipboard(record.short_url)}><MdOutlineContentCopy size="15" /></Button>
          <Button size="sm" onPress={onOpenEdit} color='warning'><FiEdit size="15" /></Button>
          <Modal
            isOpen={isOpenEdit}
            onOpenChange={onOpenChangeEdit}
            placement="top-center"
            backdrop='blur'
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmitEdit(data => submitFormEdit(data, onClose))}>
                    <ModalHeader className="flex flex-col gap-1">New Url</ModalHeader>
                    <ModalBody>
                      <Input
                        autoFocus
                        label="Original Url"
                        placeholder="Enter your Orignial Url"
                        variant="bordered"
                        type='url'
                        defaultValue={record.original_url}
                        errorMessage="Please enter a valid URL"
                        {...registerEdit("original_url")}
                      />
                      <Input
                        label="Shortened Url"
                        placeholder=""
                        type="text"
                        variant="bordered"
                        defaultValue={record.short_url}
                        disabled={true}
                        {...registerEdit("short_url")}
                      />
                      <Select
                        label="Select Url Type"
                        className="max-w-xs"
                        defaultSelectedKeys={record.url_type}
                        {...registerEdit("url_type")}
                      >
                        <SelectItem key="store">
                          Store
                        </SelectItem>
                        <SelectItem key="product">
                          Product
                        </SelectItem>
                        <SelectItem key="misc">
                          Misc
                        </SelectItem>
                      </Select>
                      <Select
                        label="Select Tag"
                        className="max-w-xs"
                        {...registerEdit("tag_id")}
                      >

                        {tags?.result.map((tag: any) => {
                          const name = tag.tag_name.split("#")[0];
                          return <SelectItem key={tag.tag_id as number}>
                            {name}
                          </SelectItem>
                        })}

                      </Select>

                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" type="submit" isLoading={false}>

                        Submit
                      </Button>
                    </ModalFooter>
                  </form>
                </>

              )}
            </ModalContent>
          </Modal >
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteUrl(record.short_url)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="sm" color='danger' title='click to delete'><TiDeleteOutline size="15" /></Button>
          </Popconfirm>
          <Button size="sm" onPress={onOpenQR} color='secondary' title='click to generate qr code'><FaQrcode size={15} /></Button>
          <Modal
            isOpen={isOpenQR}
            onOpenChange={onOpenChangeQR}
            placement="top-center"
            backdrop='blur'
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Generate QR-Code for Url: {record.short_url}</ModalHeader>
                  <ModalBody className='items-center'>
                    <QRCode
                      type='svg'
                      id='myqrcode'
                      value={`http://localhost:3500/redirect/${record.short_url}`}
                      bgColor="#fff"
                      style={{ marginBottom: 16 }}
                      icon={`${findLogo(logos)}`}
                    />
                    <Select
                      label="Select Url Type"
                      className="max-w-xs"
                      onSelectionChange={(val) => setSelectedLogo(val.currentKey!)}
                    >
                      {logos?.result.map((logo: any) => {
                        return <SelectItem key={logo.logo_id}>
                          <Image
                            shadow="sm"
                            radius="lg"
                            width="300px"
                            height={300}
                            className="w-full object-cover h-[140px]"
                            alt={logo.logo_path}
                            src={logo.logo_path}
                          />
                        </SelectItem>
                      })}
                    </Select>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="success"
                      onClick={downloadSvgQRCode}
                    >
                      <RxDownload size={20} /> Download
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </Space>
      ),
    },
  ];

  function handleDeleteUrl(short_url: any) {
    const user_id: string = JSON.parse(localStorage.getItem("userID") || "")
    deleteUrl({ short_url, user_id })
    successMessage("Url Deleted!!")
  }

  type Color = GetProp<ColorPickerProps, 'value'>;
  const [color, setColor] = useState<Color>("")
  const [createTag] = useCreateTagMutation();
  const { data: tags } = useGetTagsQuery(JSON.parse(localStorage.getItem("userID") || ""));

  const submitFormTags = (data: tagType, onClose: () => void) => {
    console.log("TAG NAME: ", data)
    console.log("COLOR: ", color)
    console.log("FULL TAG NAME: ", data.tag_name.concat(color.toString()))
    const user_id = JSON.parse(localStorage.getItem("userID") || "")
    createTag({ user_id, tag_name: data.tag_name.concat(color.toString()) })
    resetTags();
    onClose();

  }

  return (
    <>
      {contextHolder}
      <div className='flex flex-row justify-between'>
        <h1 className='text-white text-2xl'>Your Urls</h1>
        <div className='flex flew-row justify-evenly gap-4'>
          <Button onPress={onOpenTags} color="warning">Create Tag</Button>
          <Modal
            isOpen={isOpenTags}
            onOpenChange={onOpenChangeTags}
            placement="top-center"
            backdrop='blur'
            isDismissable={false}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmitTags(data => submitFormTags(data, onClose))}>
                    <ModalHeader className="flex flex-col gap-1">Create Tag</ModalHeader>
                    <ModalBody>
                      <Input
                        autoFocus
                        label="Tag Name"
                        placeholder="Enter your new Tag Name"
                        variant="bordered"
                        {...registerTags("tag_name")}
                      />
                      <ColorPicker size="small" value={color} showText={(color) => <span>Please Select Tag Color ({color.toHexString()})</span>} onChange={(c) => {
                        setColor(c.toHexString());
                      }} defaultFormat="hex" />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="success" type="submit">
                        Submit
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
          <Button onPress={onOpen} color="success">Add New URL</Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop='blur'
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmit(data => submitForm(data, onClose))}>
                    <ModalHeader className="flex flex-col gap-1">New Url</ModalHeader>
                    <ModalBody>
                      <Input
                        autoFocus
                        label="Original Url"
                        placeholder="Enter your Orignial Url"
                        variant="bordered"
                        type='url'
                        errorMessage="Please enter a valid URL"
                        {...register("original_url")}
                      />
                      <Input
                        label="Shortened Url"
                        placeholder=""
                        type="text"
                        variant="bordered"
                        defaultValue={nanoid(10)}
                        disabled={true}
                        {...register("short_url", { value: nanoid(10) })}
                      />
                      <Select
                        label="Select Url Type"
                        className="max-w-xs"
                        {...register("url_type")}
                      >
                        <SelectItem key="store">
                          Store
                        </SelectItem>
                        <SelectItem key="product">
                          Product
                        </SelectItem>
                        <SelectItem key="misc">
                          Misc
                        </SelectItem>
                      </Select>
                      <Select
                        label="Select Tag"
                        className="max-w-xs"
                        {...register("tag_id")}
                      >

                        {tags?.result.map((tag: any) => {
                          const name = tag.tag_name.split("#")[0];
                          return <SelectItem key={tag.tag_id as number}>
                            {name}
                          </SelectItem>
                        })}

                      </Select>

                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" type="submit" isLoading={false}>

                        Submit
                      </Button>
                    </ModalFooter>
                  </form>
                </>

              )}
            </ModalContent>
          </Modal >
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBgContainer: 'black',
              colorText: "white",
              algorithm: true,
            },
          }
        }}
      >
        <Table columns={columns} dataSource={data?.result} loading={isLoading} />
      </ConfigProvider>
    </>
  );
}
