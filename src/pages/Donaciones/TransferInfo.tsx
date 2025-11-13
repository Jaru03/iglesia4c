const TransferInfo = () => {
  return (
    <div className="w-full max-w-lg shadow-form p-6 rounded-[20px] text-base md:text-base-desktop">
        <h2 className="text-secundary-3 text-center text-xl md:text-xl-desktop">
          Transferencia Bancaria
        </h2>

        <ul className="flex flex-col pt-4 gap-4">
          <li className="flex justify-between"><span className="font-bold">BBVA:</span> ES8001824072680201588283</li>
          <li className="flex justify-between"><span className="font-bold">CaixaBank:</span> ES03 2100 1897 4302 0053 8463</li>
        </ul>
    </div>
  )
}

export default TransferInfo