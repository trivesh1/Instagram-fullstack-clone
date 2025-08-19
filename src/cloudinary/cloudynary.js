import { useState } from "react"


const cloudynary = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const img = async (file) => {
         const data=new FormData()     
                data.append("file",file)
                data.append("upload_preset",import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
                data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
               const res= await fetch(import.meta.env.VITE_CLOUDINARY_API_URL ,{
                    method:"POST",
                    body:data
                })
                const uploadeddataurl=await res.json()
                setSelectedFile(uploadeddataurl.url)
                
       

    }
    return {setSelectedFile,selectedFile,img}
   

}

export default cloudynary

