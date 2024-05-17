import { useCallback, Dispatch, SetStateAction, FormEvent } from 'react'
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button"
import { convertFileToUrl } from '@/lib/utils';
import { CrossCircledIcon } from '@radix-ui/react-icons'

type Props = {
    imageUrl?: string
    onFiledChange: (value: string) => void
    setFiles: Dispatch<SetStateAction<File[]>>
}

const ProfilePictureUploader = ({ imageUrl, onFiledChange, setFiles }: Props) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        onFiledChange(convertFileToUrl(acceptedFiles[0]));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
    });

    const removeImage = (event: FormEvent<HTMLFormControlsCollection>) => {
        // console.log("Trying to remove image...");
        event.stopPropagation();
        onFiledChange('')
        setFiles([])

    }


    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {imageUrl ? (
                <div className="flex h-full w-full flex-1 justify-center ">
                    <img
                        src={imageUrl}
                        alt="image"
                        width={250}
                        height={250}
                        className="w-full object-cover object-center"
                    />
                    <Button asChild variant={'ghost'} size={"icon"} onClick={
                        (e) => {
                            e.stopPropagation();
                            onFiledChange('')
                            setFiles([])
                        }
                    }
                    >
                        <CrossCircledIcon />
                    </Button>
                </div>
            ) : (
                <div className="flex-center flex-col py-5 text-grey-500">
                    <img src="/icons/upload.svg" width={77} height={77} alt="file upload" />
                    <h3 className="mb-2 mt-2">Drag photo here</h3>
                    <p className="p-medium-12 mb-4">SVG, PNG, JPG - (upto 2MB)</p>
                    <Button type="button" className="rounded-full">
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ProfilePictureUploader