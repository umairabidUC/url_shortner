import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, SelectItem, Select } from "@nextui-org/react";
import { useForm } from "react-hook-form";
export default function editUrlModal({ isOpen, onOpen, onOpenChange }: { isOpen: any, onOpen: any, onOpenChange: any }) {

    const { register, handleSubmit } = useForm();
    const submitForm = (data: any, onClose: () => void) => {
        console.log("PREGEN EDIT FORM DATA: ", data)
        onClose();
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit(data => submitForm(data, onClose))}>
                                <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
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
        </>
    );
}
