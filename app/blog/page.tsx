import React from 'react'

const blog = {
    title: 'some title',
    segments: [
        {
            heading: "intro",
            text: "some text"
        },
        {
            heading: "some heading",
            text: "some text",
            segments: [
                {
                    heading: "dig deeper",
                    text: "some text",
                },
                {
                    heading: "dig more deeper",
                    segments: [
                        {
                            heading: "going more deep",
                            text: "gonna intorduce list as well"
                        },
                        {
                            heading: "list",
                            list: [
                                { text: "list fist item" },
                                {
                                    heading: "list second item",
                                    segments: [
                                        {
                                            text: "i guess its enough depth"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]

        }
    ]
}


type segmentItem = {
    heading?: string,
    text?: string,
    segments?: segmentItem[],
    list?:segmentItem[],
} 

const writeSegment = ( segments: segmentItem[] ) => {
    return (
        <>
        {segments.map ((seg, index) => (
            <div key={index} className='ml-3'>
                { seg.heading && <p className='font-semibold'> { seg.heading } </p> }
                { seg.text && <p> { seg.text } </p> }
                { seg.segments && writeSegment(seg.segments) }
                { seg.list && writelist(seg.list) }
            </div>
        )) }
       </>
)
}

const writelist = ( list: segmentItem[] ) => {
    return (
        <ul className='list-disc ml-4'>

        {list.map ((seg, index) => (
            <li key={index}>
                { seg.heading && <p className='font-semibold'> { seg.heading } </p> }
                { seg.text && <p> { seg.text } </p> }
                { seg.segments && writeSegment(seg.segments) }
                { seg.list && writelist(seg.list) }
            </li>
        )) }
        </ul>
)
}




const page = () => {
    
    
    return (
        <section className='custom_container'>
            {/* <p>heading</p>
            <p>some text here</p>
            <p>sub heading</p>
            <div className='ml-3'>
                <ul>
                    <li>some sub text here</li>
                    <li>sub sub heading</li>
                    <div className='ml-3'>
                        <ul>
                            <li>
                                sub sub sub text
                            </li>
                            <li> sub sub sub text</li>
                        </ul>
                    </div>
                </ul>
            </div> */}
            {writeSegment(blog.segments)}
        </section>
    )
}

export default page