import { usePaymentProviders } from "./paymentProviders/usePaymentsProviders";
import { useCryptoCloudBilling } from "./paymentProviders/useCryptoCloudBilling";
import { Button } from "~/sharedComponent/Button";

export function PaymentSelection() {
    const { selectedType, setSelectedType, getPaymentOptions } = usePaymentProviders();
    const { createInvoice, loading } = useCryptoCloudBilling();

    return (
        <div className="p-6 bg-zinc-900 text-white rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

            <div className="flex gap-4 justify-center">
                <Button onClick={() => setSelectedType("crypto")} label="Pay with Crypto" />
                <Button onClick={() => setSelectedType("fiat")} label="Pay with Fiat" />
            </div>

            {selectedType && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">
                        Available {selectedType === "crypto" ? "Crypto" : "Fiat"} Providers:
                    </h3>

                    {getPaymentOptions(selectedType).map((provider) => (
                        <div key={provider.id} className="p-4 bg-zinc-800 rounded-lg flex items-center justify-between">
                            <span>{provider.name}</span>
                            <Button onClick={() => createInvoice(1, "USD")} label="Select" />
                        </div>
                    ))}
                </div>
            )}

            {loading && <p className="text-gray-400 mt-4">Processing payment...</p>}
        </div>
    );
}
