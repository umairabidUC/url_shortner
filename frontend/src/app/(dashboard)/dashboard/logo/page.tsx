"use client";
import { useAddLogoMutation, useGetLogosQuery } from '@/lib/api/urlApiSlice';
import { Button, Card, CardBody, CardFooter, Image, Spacer } from '@nextui-org/react';
import { CldUploadWidget } from 'next-cloudinary';

export default function Logo() {
    const [addLogo] = useAddLogoMutation();
    const { data: logos } = useGetLogosQuery(JSON.parse(localStorage.getItem("userID") || ""));

    return (
        <div className="py-10">
            <div className='flex flex-row justify-between items-center'>
                <CldUploadWidget uploadPreset="url_shortner_logos"
                    onSuccessAction={(result) => {
                        const user_id = JSON.parse(localStorage.getItem("userID") || "");
                        if (user_id && result?.info?.secure_url) {
                            addLogo({ user_id, logo_path: result?.info?.secure_url });
                        }
                    }}
                >
                    {({ open }) => (
                        <Button color="success" onPress={() => open()}>
                            Upload an Image
                        </Button>
                    )}
                </CldUploadWidget>
            </div>

            <Spacer y={2} />

            <div className="flex flex-wrap justify-center gap-4">
                {logos?.result.map((logo: any) => (
                    <div key={logo.logo_id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                        <Card shadow="md" isHoverable isPressable>
                            <CardBody className="p-0">
                                <Image
                                    width="100%"
                                    height="auto"
                                    src={logo.logo_path}
                                    alt="Uploaded logo"
                                    className="rounded-t-lg"
                                />
                            </CardBody>
                            <CardFooter className="text-small justify-center">
                                <p color="gray">Logo ID: {logo.logo_id}</p>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
