'use client'

import AreaPage from "@/pages/Nosotros/AreaPage";
import { useParams } from "next/navigation";

const Page = () => {

  const area = useParams()?.area

  return (
      <AreaPage area={area} />
  );
};

export default Page