import axios from "axios";
import Swal from "sweetalert2";

const uploadImage = async (image) => {
  const imageForm = new FormData();
  imageForm.append("image", image);
  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_imgbb_api_key
      }`,
      imageForm
    );
    return data?.data?.display_url || undefined;
  } catch (error) {
    console.log(error, 'image url missing.')
  }
};

export default uploadImage;
