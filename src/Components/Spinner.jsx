import { Watch } from "react-loader-spinner"

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-[80vh]">
            <Watch
                height="80"
                width="80"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default Spinner