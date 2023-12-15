import { useContext } from "react"
import { GlobalContext } from "../ControlRoom/ControlRoom"

const useGlobal = () => {
    const globalInfo = useContext(GlobalContext);
    return globalInfo;
}

export default useGlobal