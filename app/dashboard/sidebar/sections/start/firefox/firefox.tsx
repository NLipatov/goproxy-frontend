export function Firefox() {
    const steps = [
        {
            title: "Install the FoxyProxy Extension",
            description: "Visit the Mozilla Add-ons store and install the FoxyProxy Standard extension.",
            link: "https://addons.mozilla.org/firefox/addon/foxyproxy-standard"
        },
        {
            title: "Open the FoxyProxy Options",
            description: "Click on the FoxyProxy icon in the Firefox toolbar and select 'Options' to configure the extension."
        },
        {
            title: "Add a New Proxy Configuration",
            description: "In the FoxyProxy Options page, click 'Add' to create a new proxy configuration. Enter the required details, such as the proxy server address, port, and credentials."
        },
        {
            title: "Enable the Proxy",
            description: "Select your newly created proxy configuration from the FoxyProxy menu to start routing your traffic through the proxy."
        }
    ];

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Firefox Proxy Setup</h1>
            <p className="text-gray-300 mb-6">
                Follow these steps to configure your proxy settings in Firefox using FoxyProxy Standard:
            </p>
            <ol className="list-decimal pl-6 space-y-4">
                {steps.map((step, index) => (
                    <li key={index} className="text-gray-400">
                        <h2 className="text-lg font-semibold text-green-500">{step.title}</h2>
                        <p className="text-gray-300">
                            {step.description}
                            {step.link && (
                                <a
                                    href={step.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-500 underline ml-1"
                                >
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
