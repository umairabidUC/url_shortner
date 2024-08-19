"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useCreateApiKeyMutation, useDeleteApiKeyMutation, useGetApiKeyQuery, useUpdateApiKeyExpiryMutation } from "@/lib/api/urlApiSlice";
import { Button } from "@nextui-org/react";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { Calendar, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { ACTION_REFRESH } from "next/dist/client/components/router-reducer/router-reducer-types";

export default function ApiKey() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenAPI, onOpen: onOpenAPI, onOpenChange: onOpenChangeAPI } = useDisclosure();
    const [expiry, setExpiry] = useState<DateValue | string | null>(null);
    const { data: apiKey, isLoading } = useGetApiKeyQuery(JSON.parse(localStorage.getItem("userID") || ""));
    const [createApiKey] = useCreateApiKeyMutation();
    const { isOpen: isOpenNew, onOpen: onOpenNew, onOpenChange: onOpenChangeNew } = useDisclosure();
    const [deleteApiKey] = useDeleteApiKeyMutation();
    const [updateApiKeyExpiry] = useUpdateApiKeyExpiryMutation();

    // Convert Calendar's date to standard Date format
    const handleCalendarChange = (value: DateValue) => {
        setExpiry(value); // Directly set the DateValue
        // If you need the date in string format (YYYY-MM-DD), convert it when you use it
        const dateString = value.toString(); // Convert DateValue to string format if needed
        console.log(dateString);
    };
    console.log("API KEY: ", apiKey)

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-primary to-secondary">
            <Card className="w-full max-w-md bg-background shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">API Key Management</CardTitle>
                    <CardDescription>Manage your API keys with ease.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-6">
                    </div>
                    {apiKey?.result && (apiKey?.result.status != false) ? (
                        <div className="flex w-auto ">
                            <Card className="bg-primary text-primary-foreground flex">
                                <CardContent className="flex max-w-sm flex-col">
                                    <code className="text-xl max-w-sm break-words font-bold ">
                                        {apiKey.result.api_key}
                                    </code>
                                    <div className="flex gap-2 mt-4">
                                        <Button variant='faded' onPress={onOpen}>
                                            Delete API Key
                                        </Button>
                                        <Button variant='bordered' onPress={onOpenAPI}>
                                            Edit Expiry
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : apiKey?.result ? (
                        <Button size="lg" className="w-full" onClick={onOpenNew}>
                            Generate API Key
                        </Button>
                    ) : ""}
                </CardContent>
            </Card>
            {apiKey?.result.status != false && apiKey?.result ? <p className="text-xl">Expires At : {apiKey.result.expires_at}</p> : ""}
            {/* Delete API Key Modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Delete API Key
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this Key?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color='danger' onPress={() => {
                                    deleteApiKey({ api_key_id: apiKey?.result.api_key_id, user_id: JSON.parse(localStorage.getItem("userID") || "") })
                                    onClose()
                                }
                                }>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Edit API Key Expiry Modal */}
            <Modal
                isOpen={isOpenAPI}
                onOpenChange={onOpenChangeAPI}
                placement="top-center"
                backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Change Expiry
                            </ModalHeader>
                            <ModalBody>
                                <Calendar onChange={handleCalendarChange} value={expiry} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color='success' onPress={() => {
                                    updateApiKeyExpiry({ api_key_id: apiKey?.result.api_key_id, expiry });
                                    onClose();
                                }}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Generate New API Key Modal */}
            <Modal
                isOpen={isOpenNew}
                onOpenChange={onOpenChangeNew}
                placement="top-center"
                backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Generate New API Key
                            </ModalHeader>
                            <ModalBody>
                                <Calendar onChange={handleCalendarChange} value={expiry} minValue={today(getLocalTimeZone())} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color='success' onPress={() => {
                                    createApiKey({ user_id: JSON.parse(localStorage.getItem("userID") || ""), expiry });
                                    onClose();
                                }}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    )
}
