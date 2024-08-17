"use client";

import React, { useState } from 'react';
import { ConfigProvider, Space, Table } from 'antd';
import { useCreateTagMutation, useDeleteUrlMutation, useGenerateUrlsMutation, useGetPreGenQuery, useGetTagsQuery, useUpdatePreGenUrlMutation, } from '@/lib/api/urlApiSlice';
import { nanoid } from '@reduxjs/toolkit';
import { Button, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { FaStore } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import * as z from "zod"

enum url_type {
  store,
  product,
  misc
}

const pregenEditUrlSchema = z.object({
  original_url: z.string().url(), // Validates that the original_url is a valid URL
  url_type: z.nativeEnum(url_type)
});

type preGenUrlType = z.infer<typeof pregenEditUrlSchema>;






export default function PreGen() {
  const { data, isLoading } = useGetPreGenQuery(JSON.parse(localStorage.getItem("userID") || ""));

  const [deleteUrl] = useDeleteUrlMutation();
  const [preGenerateUrl] = useGenerateUrlsMutation()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updatePreGenUrl] = useUpdatePreGenUrlMutation();
  const { register, handleSubmit, reset } = useForm<preGenUrlType>();
  const submitForm = (data: preGenUrlType, onClose: () => void, short_url: any) => {
    console.log("PREGEN EDIT FORM DATA: ", data)
    console.log("URL TO EDIT: ", short_url)
    const user_id = JSON.parse(localStorage.getItem("userID") || "")
    updatePreGenUrl({ original_url: data.original_url, short_url, user_id, url_type: data.url_type })
    reset();
    onClose();
  }


  type UrlData = {
    short_url: string;
    status: "active" | "inactive"; // Assuming 0 for inactive, 1 for active
    url_type: "store" | "product" | "misc" | null;
  };

  const columns = [
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
          <Button size="sm" color='warning' onPress={onOpen}><FiEdit size="15" /></Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop='blur'
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmit(data => submitForm(data, onClose, record.short_url))}>
                    <ModalHeader className="flex flex-col gap-1">Edit Url{record.status}</ModalHeader>
                    <ModalBody>
                      <Input
                        autoFocus
                        label="Original Url"
                        placeholder="Enter your Original Url"
                        variant="bordered"
                        {...register("original_url")}
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
          <Button size="sm" color='danger' title='click to delete' onClick={() => handleDeleteUrl(record.short_url)}><TiDeleteOutline size="15" /></Button>
        </Space>
      ),
    },
  ];

  function handleDeleteUrl(short_url: any) {
    console.log("SHORT URL TO BE DELETED: ", short_url)
    const user_id: string = JSON.parse(localStorage.getItem("userID") || "")
    deleteUrl({ short_url, user_id })
  }

  async function generateUrl() {
    const user_id = JSON.parse(localStorage.getItem("userID") || "")
    preGenerateUrl({ short_url: nanoid(10), user_id })
  }

  return (
    <>
      <div className='flex flex-row justify-between'>
        <h1 className='text-white text-2xl'>Your PreGenerated Urls</h1>
        <Button onPress={generateUrl} color="success">Generate URL</Button>
      </div>
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
        <Table columns={columns} dataSource={data?.result} loading={isLoading} />
      </ConfigProvider>
    </>
  );
}
