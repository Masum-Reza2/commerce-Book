import Lottie from "lottie-react"
import lottiefile from '../../../assets/LottieAnimations/welcomeback.json'
import { Button } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from "react-router-dom";

const SellerHome = () => {
  return (
    <div>
      <div className='w-full text-center pt-5'>
        <Link to={'/sellerDashboard/addProduct'}>
          <Button variant="contained">
            <AddBoxIcon />
            <span className='ml-2'>Add a Product</span>
          </Button>
        </Link>
      </div>
      <div className='flex  items-center justify-center'>
        <Lottie className='md:w-1/2' animationData={lottiefile} loop={true} />
      </div>
    </div>
  )
}

export default SellerHome