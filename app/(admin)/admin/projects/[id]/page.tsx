import React from 'react'

type pageProps = {
    params: {id: string}
}


const page = ( {params: {id}}: pageProps) => {
    console.log(id)
  return (
    <div> {id} </div>
  )
}

export default page