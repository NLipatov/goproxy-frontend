export function IOS() {
    const steps = [
        {
            title: "Download Potatso from the App Store",
            description: "Install the Potatso app on your iOS device from the App Store.",
            link: "https://apps.apple.com/app/potatso-lite/id1239860606"
        },
        {
            title: "Open the Potatso App",
            description: "Launch the Potatso app on your device. Grant any necessary permissions during the setup process."
        },
        {
            title: "Add a New Proxy Configuration",
            description: "Go to the 'Proxies' section in the Potatso app, tap the '+' button, and choose 'Manual'."
        },
        {
            title: "Enter Proxy Details",
            description: "Fill in the required details, such as the proxy server address, port, and BASIC authentication credentials (username and password)."
        },
        {
            title: "Activate the Proxy",
            description: "Save the configuration and enable the proxy by toggling the switch next to the configuration."
        },
        {
            title: "Test Your Connection",
            description: "Use the built-in tools in Potatso to ensure your proxy configuration is working as expected."
        }
    ];

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">iOS Proxy Setup with Potatso</h1>
            <p className="text-gray-300 mb-6">
                Follow these steps to configure your proxy settings on iOS using the Potatso app:
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
