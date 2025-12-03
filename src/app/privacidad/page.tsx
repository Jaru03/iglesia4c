import React from "react";

const page = () => {
  return (
    <section>
      <div className="bg-[url(../../public/privacidad.png)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        <h2 className="text-white text-3xl md:text-3xl-desktop z-[5] text-center">
          Política de Privacidad
        </h2>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <h3 className="text-primary-2 text-xl text-center md:text-xl-desktop pb-4">
          Política de Privacidad
        </h3>
        <p>
          COMUNIDAD CRISTIANA CASA DE DIOS le informa que el tratamiento de los
          datos personales de contacto se realiza con la finalidad de gestión,
          desarrollo, seguimiento y cumplimiento de las relaciones existentes
          con COMUNIDAD CRISTIANA CASA DE DIOS, envío de información general y
          comercial, gestión de agenda de contactos profesionales, siendo
          conservados mientras exista un interés general mutuo para ello.
        </p>
        <p className="mt-2">
          La base jurídica que legitima el tratamiento es la existencia de una
          relación precontractual o contractual vigente con COMUNIDAD CRISTIANA CASA DE DIOS o, en su caso, el consentimiento del interesado. Sus
          datos no se cederán a terceros salvo obligación legal o cuando sea
          necesario para el cumplimiento de los fines antes expuestos.
        </p>
        <p className="mt-2">
          Podrá ejercer sus derechos de acceso, rectificación, supresión,
          oposición, así como los demás derechos previstos en la normativa de
          protección de datos ante COMUNIDAD CRISTIANA CASA DE DIOS, Calle Vinca
          12, 28026, Madrid, o mediante correo electrónico a
          secretaria@casadedios.es.
        </p>
        <p className="mt-2">
          Si considera que el tratamiento no se ajusta a la normativa vigente,
          podrá presentar una reclamación ante la Agencia Española de Protección
          de Datos en www.aepd.es.
        </p>
      </div>
    </section>
  );
};

export default page;
