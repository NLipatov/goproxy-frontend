export function GoogleChrome() {
    const steps = [
        {
            title: "Install a Proxy Manager Extension",
            description: "Visit the Chrome Web Store and install a proxy manager extension, such as ProxyEmpire Proxy Manager.",
            link: "https://chromewebstore.google.com/detail/proxyempire-proxy-manager"
        },
        {
            title: "Configure Your Proxy Credentials",
            description: "Open the extension's manage tab and enter the credentials provided in the Proxy -> Credentials section of the dashboard."
        }
    ];

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Google Chrome Proxy Setup</h1>
            <p className="text-gray-300 mb-6">
                Follow these steps to configure your proxy settings in Google Chrome:
            </p>
            <ol className="list-decimal pl-6 space-y-4">
                {steps.map((step, index) => (
                    <li key={index} className="text-gray-400">
                        <h2 className="text-lg font-semibold text-green-500">{step.title}</h2>
                        <p className="text-gray-300">
                            {step.description}
                            {step.link && (
                                <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-green-500 underline ml-1">
                                    (Open Link)
                                </a>
                            )}
                        </p>
                    </li>
                ))}
            </ol>
            <div className="mt-6">
                <p className="text-gray-400">
                    Need more help? Visit our <a href="#" className="text-green-500 underline">support page</a> or contact us directly.
                </p>
            </div>
        </div>
    );
}
