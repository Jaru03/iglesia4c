export interface InfoChurch {
    index: number,
    title: string,
    description: string,
    place: string,
    coords: [number, number],
    horario: Horario[],
    pastors: Pastor[],
    socialLinks: SocialLinks[]
  }
  
  interface Horario {
    dia: string,
    horario: string | string[]
  }
  
  interface Pastor {
    nombre: string,
    img: string
  }
  
  interface SocialLinks {
    name: string,
    url: string,
    icon: string,
    value: string,
  }