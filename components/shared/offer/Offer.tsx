import { offerInfo } from "@/lib/Constants"
import OfferCard from "./OfferCard"

const Offer = () => {
  return (
    <div className="custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8">
        <div className='flex flex-col items-center sm:gap-2'>
            <h2 className='h2 text-center'> {offerInfo.title} </h2>
            <p className='subText'>{offerInfo.sub_text}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-8">
            { offerInfo.cards.map( offer => (
                <OfferCard key={offer.title} imageSrc= {offer.image.imageSrc} imageAlt= { offer.image.alt}
                buttonLabel= { offer.buttonInfo.lebal} route= { offer.buttonInfo.route} title= {offer.title}
                description= { offer.description}
                />

            ))}

        </div>
    </div>
  )
}

export default Offer