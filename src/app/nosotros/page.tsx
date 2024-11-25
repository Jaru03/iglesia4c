import Departaments from "@/pages/Nosotros/Departaments"
import HowItStarted from "@/pages/Nosotros/HowItStarted"
import Ministries from "@/pages/Nosotros/Ministries"

const page = () => {
    return (
        <div className="min-h-screen">
            <HowItStarted/>
            <Ministries/>
            <Departaments/>
        </div>
    )
}

export default page