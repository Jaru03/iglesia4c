import { Building2, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

const TransferInfo = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const accounts = [
    {
      bank: "BBVA",
      account: "ES8001824072680201588283",
      beneficiary: "Comunidad Cristiana Casa de Dios"
    },
    {
      bank: "CaixaBank",
      account: "ES03 2100 1897 4302 0053 8463",
      beneficiary: "Comunidad Cristiana Casa de Dios"
    }
  ]

  const copyToClipboard = async (account: string, bankName: string) => {
    try {
      await navigator.clipboard.writeText(account)
      setCopiedAccount(bankName)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Transferencia Bancaria</h2>
        <p className="text-white/90 text-sm mt-1">Transferencia directa a nuestra cuenta</p>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Instrucciones:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Realiza la transferencia a cualquiera de las cuentas</li>
            <li>• Indica en el concepto: "Donativo Comunidad Cristiana Casa de Dios"</li>
            <li>• Envíanos el comprobante por email</li>
          </ul>
        </div>

        {/* Bank Accounts */}
        <div className="space-y-4">
          {accounts.map((account, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-primary-3 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg text-gray-800">{account.bank}</h4>
                <button
                  onClick={() => copyToClipboard(account.account, account.bank)}
                  className="flex items-center gap-1 text-primary-3 hover:text-primary-2 transition-colors text-sm font-medium"
                >
                  {copiedAccount === account.bank ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Beneficiario</p>
                  <p className="font-medium text-gray-800">{account.beneficiary}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">IBAN</p>
                  <p className="font-mono text-sm text-gray-800 bg-gray-50 px-3 py-1 rounded border select-all">
                    {account.account}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            ¿Has realizado la transferencia?
          </p>
          <p className="text-sm text-gray-800">
            Envía el comprobante a: <span className="font-medium">secretaria@casadedios.es</span>
          </p>
        </div>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="font-medium">Transferencias seguras</span>
          </div>
          <p>Todas las donaciones son confidenciales</p>
        </div>
      </div>
    </div>
  )
}

export default TransferInfo
