import Area from "./Area"

const Departaments = () => {

    const departaments = [
        {

            id: 1,
            title: 'Departamento de Mujeres',
            value: "mujeres"
        },
        {

            id: 2,
            title: 'Departamento de Niños',
            value: "ninos"
        },
        {

            id: 3,
            title: 'Departamento de Jóvenes',
            value: "jovenes"
        },
        {

            id: 4,
            title: 'Departamento de Matrimonios',
            value: "matrimonios"
        },
    ]

    return (
        <section>
            <div className="p-6">
                <h3 className="text-primary-2 text-xl md:text-xl-desktop pb-6 text-center">Departamentos</h3>

                <div className="grid sm:grid-cols-2 justify-items-center sm:grid-rows-2 md:grid-cols-3 gap-4 max-w-[1000px] mx-auto">
                    {
                        departaments.map((departament) => (
                            <Area
                                key={departament.id}
                                image='/cultomujeres.png'
                                title={departament.title}
                                value={departament.value}
                                className={departament.id === departaments.at(-1)?.id ? 'md:col-[1/4]' : ''}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Departaments