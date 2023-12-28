const Home = () => {
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-3 border hidden md:block'>hi</div>
            <div className="min-h-[80vh] col-span-12 md:col-span-6 border">
                items
            </div>
            <div className='col-span-3 border hidden md:block'>hello</div>
        </div>
    )
}

export default Home