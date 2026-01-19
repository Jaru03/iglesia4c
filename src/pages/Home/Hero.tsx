import Button from "@/ui/Button"
import Link from "next/link" 

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#060735]">
      
      {/*(Mejora con div separado para efectos) */}
      <div className="absolute inset-0 z-0">
        
         <div className="absolute inset-0 bg-black/60 z-10"></div>
         
         <div className="w-full h-full bg-[url(../../public/portada.jpg)] bg-cover bg-center bg-no-repeat transform scale-105"></div>
      </div>
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto space-y-6">
        
        <span className="text-[#F4F2F0] tracking-[0.2em] text-sm md:text-lg uppercase font-bold animate-pulse">
          Bienvenidos a casa
        </span>

        <h1 className="text-4xl xs:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
          Comunidad Cristiana <br />
          <span className="text-blue-200">Casa de Dios Madrid</span>
        </h1>

        <p className="text-gray-200 text-lg md:text-xl max-w-2xl font-light">
          Una familia de fe conectando personas y transformando vidas.
        </p>

        {/* BOTONES */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center items-center">
            
          <Button 
            text="📅 Ver Horarios" 
            variant="hero" 
            url="/visitanos" 
            className="shadow-lg shadow-blue-900/50 min-w-[200px]" 
          />

          {/* Botón 2: Donar (USANDO COMPONENTE, NO HARDCODE) */}
          <Button 
            text="❤️ Donar Online"
            variant="primary" 
            url="/donaciones"
            className="min-w-[200px] border-2 border-white/20" 
          />

        </div>
      </div>

      {/* Flechita animada */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/70">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>

    </section>
  )
}

export default Hero