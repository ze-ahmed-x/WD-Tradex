import React from 'react'

type pageProps = {
    params: {id:string}
}

const page = ({params: {id}} : pageProps) => {
  return (
    <div> {`can i get the ${id} here??`} </div>
  )
}

export default page