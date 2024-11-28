import Area from "./Area"

const Ministries = () => {
    const ministries = [
        {

            id: 1,
            title: 'Ministerio de Alabanza',
            value: "alabanza"
        },
        {

            id: 2,
            title: 'Ministerio de Evangelizmo',
            value: "evangelizmo"
        },
    ]

    return (
        <section>
            <div>
                <h3 className="text-xl md:text-xl-desktop text-primary-2 text-center">Ministerios</h3>
                <div className="grid sm:grid-cols-2 p-6 justify-items-center gap-4 max-w-[800px] mx-auto">
                    {
                        ministries.map((ministerio) => (
                            <Area
                                key={ministerio.id}
                                image='/cultomujeres.png'
                                title={ministerio.title}
                                value={ministerio.value}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Ministries
