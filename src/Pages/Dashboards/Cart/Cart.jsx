import Spinner from "../../../Components/Spinner";
import useCarts from "../../../Hooks/useCarts"

const Cart = () => {
    const { carts, refetch, isPending } = useCarts();
    console.log(carts)

    if (isPending) return <Spinner />
    return (
        <div>
            carts here
        </div>
    )
}

export default Cart