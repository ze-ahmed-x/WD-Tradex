import Image from "next/image";


type ImageTextProps = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  text: string[];
}
const ImageTextSec = ({ imgSrc, imgAlt, title, text }: ImageTextProps) => {
  return (
    // <div className="flex flex-col sm:flex-row sm:even:flex-row-reverse gap-4 sm:gap-6 md:gap-8 lg:gap-10">
    //   <div className="relative h-40 w-full sm:h-auto sm:w-1/1">
    //     {/* <p>somethin</p> */}
    //     <Image
    //       src={imgSrc}
    //       alt={imgAlt}
    //       fill
    //       style={{
    //         objectFit: 'contain'
    //       }}
    //       className="rounded-md" />
    //   </div>
    //   <div className="flex flex-col sm:gap-2">
    //     <h2 className="h2"> {title} </h2>
    //     <div>
    //       {text.map((para, index) => (
    //         <p className="regularText" key={index}> {para} </p>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col sm:flex-row sm:even:flex-row-reverse gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center">
      <div className="max-h-[480] sm:size-auto">
        {/* <p>somethin</p> */}
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={640}
          height={960}
          className="rounded-md shadow-lg border" />
      </div>
      <div className="flex flex-col sm:gap-2">
        <h2 className="h2"> {title} </h2>
        <div>
          {text.map((para, index) => (
            <p className="regularText" key={index}> {para} </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageTextSec