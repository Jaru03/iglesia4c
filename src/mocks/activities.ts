import dayjs from "dayjs";
import { EventInterface } from "@/types/EvenType";

export const events: EventInterface[] = [
    {
      title: "Retiro de Matrimonios",
      start: dayjs('2025-11-14T10:00:00').toDate(),
      end: dayjs('2025-11-16T12:00:00').toDate(),
      index: 1,
      img: '/retiroMatrimonios.jpeg',
      description: "Un fin de semana diseñado para fortalecer la relación de pareja a la luz de la Palabra de Dios. Un tiempo para reconectar, compartir experiencias, restaurar heridas y renovar el compromiso mutuo. Disfruta de talleres, momentos de oración y espacios para crecer juntos emocional y espiritualmente.",
      place: "Casa de Dios, Plaza Castilla, Calle de Vinca 12",
    },
    {
      title: "Inscripciones Para el Estudio Biblico",
      start: dayjs('2025-11-16T10:00:00').toDate(),
      end: dayjs('2025-11-16T12:00:00').toDate(),
      index: 2,
      img: '/estudioBiblico.jpeg',
      description: "Abrimos un nuevo ciclo de formación bíblica. Este estudio está diseñado para profundizar en la Escritura, fortalecer la fe y aprender herramientas prácticas para vivir la Palabra en el día a día. Anímate a ser parte de este tiempo de crecimiento espiritual y enseñanza sólida.",
      place: "Casa de Dios, Plaza Castilla, Calle de Vinca 12",
    },
    {
      title: "Festival de la Esperanza",
      start: dayjs('2025-11-22T17:30:00').toDate(),
      end: dayjs('2025-11-22T20:30:00').toDate(),
      index: 3,
      img: '/festivalEsperanza.jpeg',
      description: "Un encuentro especialmente diseñado para mujeres que desean renovar su fe, recibir inspiración y compartir un tiempo de crecimiento espiritual. Este evento reúne a invitadas especiales que, a través de música, testimonios y talleres, compartirán mensajes que edifican y llenan el alma. \nCon la participación de mujeres que inspiran con su vida y su ministerio, esta jornada ofrece un espacio seguro y cercano para reflexionar, sanar y reconectar con la esperanza que solo Dios puede dar.\n Una cita única para celebrar la fortaleza, sensibilidad y propósito de cada mujer.",
      place: "Iglesia Betel, C. de Antonia Rodríguez Sacristán, 8, Madrid",
    },
    {
      title: "Culto Misionero",
      start: dayjs('2025-11-21T20:30:00').toDate(),
      end: dayjs('2025-11-21T22:00:00').toDate(),
      index: 4,
      img: '/invitadoJoanBel.jpeg',
      description: "Una reunión especial dedicada a la obra misionera. Conoceremos testimonios, desafíos actuales y el impacto del evangelio en distintas naciones. Un llamado a orar, apoyar y participar en la misión de Dios. Ven a ser parte de este tiempo de visión y compromiso espiritual.",
      place: "Casa de Dios, Plaza Castilla, Calle de Vinca 12",
    },
    {
      title: "Confraternidad de Jóvenes: Prohibido Apagarse",
      start: dayjs('2025-11-29T18:00:00').toDate(),
      end: dayjs('2025-11-29T20:00:00').toDate(),
      index: 5,
      img: '/confraJovenes.jpeg',
      description: "Una reunión vibrante para jóvenes que desean encender su fe y mantenerla firme en medio de los desafíos del mundo moderno. Habrá dinámicas, alabanzas, palabra inspiradora y un ambiente donde cada joven puede sentirse acompañado y motivado a seguir a Jesús sin retroceder.",
      place: "Casa de Dios, Plaza Castilla, Calle de Vinca 12",
    },
    {
      title: "Taller La Amenaza de la Pornografía y cómo prevenirla. Prevención de Abuso Sexual Infantil",
      start: dayjs('2025-11-22T10:00:00').toDate(),
      end: dayjs('2025-11-22T14:00:00').toDate(),
      index: 6,
      img: '/tallerAmenazaPornografia.jpeg',
      description: "Un taller formativo y de alta relevancia para padres, líderes y educadores. Abordaremos cómo la pornografía afecta la mente, la conducta y la familia, y aprenderemos estrategias para prevenir el abuso sexual infantil. Una jornada de información práctica, concientización y herramientas de protección para nuestras familias y nuestra comunidad.",
      place: "Casa de Dios, Plaza Castilla, Calle de Vinca 12",
    },
  ]