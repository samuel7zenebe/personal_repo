import jsonSvg from '@/public/images/json.svg'
import fileSvg from '@/public/images/file.svg'
import zipSvg from '@/public/images/zip.svg'
import pdfSvg from '@/public/images/pdf-file-svgrepo-com.svg'



import Image from 'next/image';
export default function FileExtension({extension}:{
    extension:string
}){
    switch(extension){
        case "zip":
            return <Image width={20} height={20} src={zipSvg} alt="" />;
              break;
         case "pdf": 
          return <Image width={20} height={20} src={pdfSvg} alt="" />;
          break;
          default: 
          return <Image width={20} height={20} src={fileSvg} alt="" />;
          break;     
        }
}


