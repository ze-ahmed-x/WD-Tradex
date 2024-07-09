'use client'
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { saveProfilePictureUrl } from '@/lib/database/actions/user.action';
import { useUploadThing } from '@/lib/uploadthing';
import { convertFileToUrl } from '@/lib/utils';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useDropzone } from "@uploadthing/react";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Pencil2Icon } from '@radix-ui/react-icons'


const ProfileHeader = () => {
    const { toast } = useToast()
    const { data: session, update } = useSession();
    const [imageUrl, setImageUrl] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [revealImage, setImageReveal] = useState(false);
    const loader = revealImage ? "none" : "inline-block";
    const [savingImage, setSavingImage] = useState(false)
    const { startUpload, } = useUploadThing("imageUploader")
    const uploadProfileImage = async () => {
        if (files.length > 0) {
            setSavingImage(true);
            const uploadImage = await startUpload(files)
            if (!uploadImage) {
                setSavingImage(false)
                toast({
                    variant: "destructive",
                    title: "Oh uh ! Image uploading failed",
                    description: "Please unsure the image is under 2MB",
                })
            }
            else {
                const UpdateUser = await saveProfilePictureUrl(String(session?.user.id), uploadImage[0].url)
                if (UpdateUser === "success") {

                    // updte session variable
                    if (session?.user) {
                        update({
                            ...session,
                            user: { ...session.user, photoUrl: uploadImage[0].url }
                        });
                        // update();
                    }
                    toast({
                        title: "Image uploaded successfully",
                        description: "Your profile picture will change automatically in a moment."
                    })
                    setSavingImage(false)
                    setFiles([]);
                    setImageUrl('');

                }
                else if (UpdateUser === "userNotFound") {
                    toast({
                        variant: "destructive",
                        title: "Oh uh ! User not found",
                        description: "If you are log in than why cant we find you... try re log in"
                    })
                }
                else {
                    toast({
                        variant: "destructive",
                        title: "Oh uh ! Somthing is wrong",
                        description: "Pleas ensure your file size is under 2 MB"
                    })
                }

            }
        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setImageUrl(convertFileToUrl(acceptedFiles[0]));
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
    });
    return (
        <div>
            {session && session?.user ? (
                <div className="flex flex-row justify-between content-start">
                
                <div className='flex flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
                    <div className='flex flex-col gap-3'>
                        <div className='relative'>
                            <Image className='rounded-md shadow-md'
                                src={imageUrl ? imageUrl : session?.user?.photoUrl ? session.user.photoUrl : "/images/profile.webp"} alt='profile picture' height={180} width={120}
                                onLoadingComplete={() => setImageReveal(true)} />
                            {imageUrl && (
                                <Button className='absolute top-0 right-0 h-6 w-6' asChild variant={'ghost'} size={"icon"} onClick={
                                    (e) => {
                                        e.stopPropagation();
                                        setImageUrl('')
                                        setFiles([])
                                    }
                                }
                                >
                                    <CrossCircledIcon />
                                </Button>
                            )}
                            <span
                                style={{
                                    display: loader,
                                    position: "absolute",
                                    top: 0,
                                }}
                            >
                                Loading...
                            </span>

                        </div>
                        {
                            imageUrl ? (
                                <Button
                                    disabled={savingImage}
                                    className='w-[120px]'
                                    onClick={uploadProfileImage}
                                    variant='secondary'>{savingImage? 'Saving...' : 'Save Pic'}</Button>
                            ) :
                                (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />

                                        <Button className='w-[120px]' variant='secondary'>Upload Pic</Button>
                                    </div>
                                )
                        }
                        <p className='text-center text-xs'>(Up to 2 MB)</p>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <h3 className='h3'>{session.user.firstName[0].toUpperCase().concat(session.user.firstName.slice(1))} {session.user.lastName[0].toUpperCase().concat(session.user.lastName.slice(1))}</h3>
                        <h4 className='regularText font-semibold'>{session.user.profession}</h4>
                        <h4 className='regularText font-semibold'>Yrs of Exp: <span className='font-normal'>{session.user.yearsOfExperience}</span></h4>
                        <h4 className='regularText font-semibold'>Contact: <span className='font-normal'>{session.user.mobile}</span></h4>
                        <h4 className='regularText font-semibold'>Email: <span className='font-normal'>{session.user.email}</span></h4>
                    </div>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/user/profile/edit">
                    <span className='flex flex-row gap-2 items-center'><Pencil2Icon /> <p>Edit</p></span>
                    </Link>
                </Button>
                </div>
            ) : (
                <div>
                    <h4 className='h4 text-center'>
                        Hmm... Something is wrong here... Try to logout or log in again...
                    </h4>
                </div>
            )}
        </div>
    )
}

export default ProfileHeader