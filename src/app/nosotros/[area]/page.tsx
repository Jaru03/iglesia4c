'use client'

import { useParams } from "next/navigation";
import AreaPage from "../components/AreaPage";

const Page = () => {

  const area = useParams()?.area

  return (
      <AreaPage area={area} />
  );
};

export default Page