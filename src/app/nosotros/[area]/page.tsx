import AreaPage from "@/pages/Nosotros/AreaPage";
import prisma from "@/utils/prisma";

const page = async({params} : {params :{area: string }}) => {
  
  const area = params.area

  const info = await prisma.area.findUnique({
    where: {
      value: `/${area}`
    }
  })

  return (
      <AreaPage info={info} />
  );
};

export default page