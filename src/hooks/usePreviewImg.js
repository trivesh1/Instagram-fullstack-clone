import cloudynary from '@/cloudinary/cloudynary';
import  { useState } from 'react'

const usePreviewImg = () => {
    // const [selectedFile, setSelectedFile] = useState(null)
    const maxSize = 2 * 1024 * 1024;
    const {setSelectedFile,selectedFile,img}=cloudynary();
    const handleImagechange = async(e) => {
        const file = e.target.files[0]
      
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxSize) {
                alert("file Size must be less than 2MB")
                setSelectedFile(null)
                return
            }
            else{
                
                img(file)








            //     const data=new FormData()     
            //     data.append("file",file)
            //     data.append("upload_preset","insta-profile")
            //     data.append("cloud_name","dp2yg4pmx")
            //    const res= await fetch( "https://api.cloudinary.com/v1_1/dp2yg4pmx/image/upload",{
            //         method:"POST",
            //         body:data
            //     })
            //     const uploadeddataurl=await res.json()
            //     setSelectedFile(uploadeddataurl.url)
               
              
                       // const reder = new FileReader();
            // reder.onloadend = () => {
            //     setSelectedFile(reder.result)
            // }
            // reder.readAsDataURL(file)
        }

        }
        else {
            alert("Please select an image file");
            setSelectedFile(null)
        }
    }
    return { selectedFile, handleImagechange, setSelectedFile }
}

export default usePreviewImg