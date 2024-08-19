"use client";
import { useAddLogoMutation, useDeleteLogoMutation, useGetLogosQuery } from '@/lib/api/urlApiSlice';
import { Button, Spacer, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { IoCloudUploadOutline } from "react-icons/io5";


export default function Logo() {
    const [addLogo] = useAddLogoMutation();
    const [deleteLogo] = useDeleteLogoMutation();
    const { data: logos, isLoading } = useGetLogosQuery(JSON.parse(localStorage.getItem("userID") || ""));
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [selectedLogoID, setSelectedLogoID] = useState(null)

    const handleDelete = async (onClose: () => void) => {
        if (selectedLogo) {
            console.log(selectedLogo)
            console.log(selectedLogoID)
            const user_id = JSON.parse(localStorage.getItem("userID") || "")
            await deleteLogo({ user_id, logo_path: selectedLogo, logo_id: selectedLogoID })
            onClose();
            // await deleteLogo(selectedLogo.logo_id);
            // setIsModalVisible(false);
        }
    };
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <div className='flex flex-row justify-center items-center'>
            <CldUploadWidget uploadPreset="url_shortner_logos"
                onSuccessAction={(result) => {
                    const user_id = JSON.parse(localStorage.getItem("userID") || "");
                    if (user_id && result?.info?.secure_url) {
                        addLogo({ user_id, logo_path: result?.info?.secure_url });
                        console.log("ORIGINAL LOGO PATH: ", result?.info?.secure_url)
                    }
                }}
            >
                {({ open }) => (
                    <Button color="success" onPress={() => open()}>
                        <IoCloudUploadOutline size={20} />
                        Upload an Image
                    </Button>
                )}
            </CldUploadWidget>
        </div>

        <Spacer y={2} />

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {logos?.result.map((logo: any) => (

                <div className="relative overflow-hidden rounded-lg group">
                    <img
                        src={`${logo.logo_path}`}
                        alt="Image 1"
                        width={400}
                        height={300}
                        className="object-cover w-full h-60"
                        style={{ aspectRatio: "400/300", objectFit: "cover" }}
                    />
                    <div className="absolute top-2 right-2 z-10">
                        <Button variant="ghost" className="bg-background/80 hover:bg-background" onPress={() => {
                            setSelectedLogo(logo.logo_path)
                            setSelectedLogoID(logo.logo_id)
                            onOpen()
                        }}>
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                    <div className="p-4 bg-background">
                        <h3 className="text-lg text-white font-semibold md:text-xl">{logo.logo_id}</h3>
                    </div>
                </div>
            ))}
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
                                Delete Logo ID: {selectedLogo}
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this logo?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='default' onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button onPress={() => handleDelete(onClose)} color='danger' isLoading={isLoading}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    </>
}

function XIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
